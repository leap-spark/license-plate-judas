import uuid from 'uuid/v4';
import * as firebase from 'firebase';

import Storage from './storage';
import ErrorHandler from './errorHandler';


export default class API {

    public static async signInUser(email: string, password: string): Promise<any> {
        return await firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            return ErrorHandler.LogMessage(`${email} Logged In`);
        }).catch((error) => {
            return ErrorHandler.UI(error);
        });
    }


    public static async registerUser(email: string, password: string): Promise<any> {
        return await firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            return ErrorHandler.LogMessage(`${email} Registered`);
        }).catch((error) => {
            return ErrorHandler.LogException(error);
        });
    }


    public static async signOutUser(): Promise<any> {
        return await Promise.all([
            ErrorHandler.LogMessage('User Logged Out'),
            Storage.delete('Token'),
            firebase.auth().signOut()
        ]).catch((error) => {
            return ErrorHandler.LogException(error);
        });
    }


    public static async getCurrentUserID(): Promise<any> {
        return await firebase.auth().currentUser.uid;
    }


    public static async getReportsForPlate(plate: string): Promise<object[] | null> {
        try {
            const ids: string[] = await API.getListOfReportIds(plate);

            if (!ids) {
                return null;
            }

            return await API.getReportsByIds(ids);
        } catch (error) {
            return ErrorHandler.LogException(error);
        }
    }


    public static async getListOfReportIds(plate: string): Promise<any> {
        try {
            const ids: any = await firebase.database()
                .ref(`/offenders_meta/${plate}/associated_reports`)
                .once('value');

            if (!ids) {
                return false;
            }

            return ids.val();
        } catch (error) {
            return ErrorHandler.LogException(error);
        }
    }


    public static async getReportsByIds(ids: object, limitToLast: number = 50): Promise<object[]> {
        let idsArray: string[] = Object.keys(ids);

        if (!idsArray.length) {
            return null;
        }

        let reports: object[] = [];

        // This was 500ms faster than filtering the data on server
        // See: https://stackoverflow.com/questions/35931526/speed-up-fetching-posts-for-my-social-network-app-by-using-query-instead-of-obse/35932786#35932786
        await Promise.all(
            idsArray.map(id => {
                return firebase.database()
                    .ref(`/reports/${id}`)
                    .limitToLast(limitToLast)
                    .once('value', (snapshot) => reports.push(snapshot.val()));
            })
        ).catch((error) => {
            return ErrorHandler.LogException(error);
        });

        return reports.map((report) => {
            (report as any).uid = uuid();
            return report;
        });
    }


    public static async getUserData(): Promise<any> {
        const userID: string = await firebase.auth().currentUser.uid;

        if (!userID) {
            return ErrorHandler.LogMessage(`No data found for user ${userID}`);
        }

        let userData: any = await firebase.database()
            .ref(`/users_meta/${userID}`)
            .once('value')
            .catch((error) => ErrorHandler.LogException(error));

        return userData.val();
    }


    public static async postArrayOfUpdates(updates): Promise<any> {
        return await firebase.database()
            .ref()
            .update(updates)
            .catch((error) => ErrorHandler.LogException(error));
    }


    public static async getNextRefKey(tree): Promise<any> {
        return await firebase.database().ref(tree).push().key;
    }
}
