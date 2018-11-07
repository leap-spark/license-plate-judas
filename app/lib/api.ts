import uuid from 'uuid/v4';
import * as firebase from 'firebase';

import Storage from './storage';
import Sin from './sin';


export default class API {


    public static async signInUser(email: string, password: string): Promise<any> {
        return await firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            new Sin(`${email} Logged In`, 1, 'info');
        }).catch((error) => {
            new Sin(error, 0);
        });
    }


    public static async registerUser(email: string, password: string): Promise<any> {
        return await firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            new Sin(`${email} Registered`, 1, 'info');
        }).catch((error) => {
            new Sin(error, 0);
        });
    }


    public static async signOutUser(): Promise<any> {
        return await Promise.all([
            new Sin('User Logged Out', 1, 'info'),
            Storage.delete('Token'),
            firebase.auth().signOut()
        ]).catch((error) => {
            new Sin(error, 1);
        });
    }


    public static async getCurrentUserID(): Promise<any> {
        return await firebase.auth().currentUser.uid;
    }


    public static async getReportsForPlate(plate: string): Promise<object[]> {
        try {
            const ids: string[] = await API.getListOfReportIds(plate);

            if (!ids) {
                return null;
            }

            return await API.getReportsByIds(ids);
        } catch (error) {
            new Sin(error, 1);

            return null;
        }
    }


    public static async getListOfReportIds(plate: string): Promise<any> {
        try {
            const ids: any = await firebase.database().ref(`/offenders_meta/${plate}/associated_reports`).once('value');

            if (!ids) {
                return false;
            }

            return ids.val();
        } catch (error) {
            new Sin(error, 1);
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
                return firebase.database().ref(`/reports/${id}`).limitToLast(limitToLast).once('value', (snapshot) => reports.push(snapshot.val()));
            })
        ).catch((error) => {
            new Sin(error, 1);
        });

        return reports.map((report) => {
            (report as any).uid = uuid();
            return report;
        });
    }


    public static async getUserData(): Promise<any> {
        const userID: string = await firebase.auth().currentUser.uid;

        if (!userID) {
            new Sin('No data found for user ' + userID, 1);
            return null;
        }

        let userData: any = await firebase.database().ref(`/users_meta/${userID}`).once('value').catch((error) => {
            new Sin(error, 1);
        });

        return userData.val();
    }


    public static async postArrayOfUpdates(updates): Promise<any> {
        return await firebase.database().ref().update(updates).catch((error) => {
            new Sin(error, 1);
        });
    }


    public static async getNextRefKey(tree): Promise<any> {
        return await firebase.database().ref(tree).push().key;
    }
}
