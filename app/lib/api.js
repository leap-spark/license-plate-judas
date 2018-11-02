import uuid from 'uuid/v4';
import * as firebase from 'firebase';

import Storage from './storage';
import Sin from './sin';


export default class API {

    static async signInUser(email, password) {
        return await firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            new Sin(`${email} Logged In`, 1);
        }).catch((error) => {
            new Sin(error, 0);
        });
    }


    static async registerUser(email, password) {
        return await firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            new Sin(`${email} Registered`, 1);
        }).catch((error) => {
            new Sin(error, 0);
        });
    }


    static async signOutUser() {
        return await Promise.all([
            new Sin('User Logged Out', 1),
            Storage.delete('Token'),
            firebase.auth().signOut()
        ]).catch((error) => {
            new Sin(error, 1);
        });
    }


    static async getCurrentUserID() {
        return await firebase.auth().currentUser.uid;
    }


    static async getReportsForPlate(plate) {
        try {
            const ids = await API.getListOfReportIds(plate);

            if (!ids) {
                return [];
            }

            return await API.getReportsByIds(ids);
        } catch (error) {
            new Sin(error, 1);
        }
    }


    static async getListOfReportIds(plate) {
        try {
            const ids = await firebase.database().ref(`/offenders_meta/${plate}/associated_reports`).once('value');

            if (!ids) {
                return false;
            }

            return ids.val();
        } catch (error) {
            new Sin(error, 1);
        }
    }


    static async getReportsByIds(ids, limitToLast = 50) {
        ids = Object.keys(ids);

        if (!ids.length) {
            return;
        }

        let reports = [];

        // This was 500ms faster than filtering the data on server
        // See: https://stackoverflow.com/questions/35931526/speed-up-fetching-posts-for-my-social-network-app-by-using-query-instead-of-obse/35932786#35932786
        await Promise.all(
            ids.map(id => {
                return firebase.database().ref(`/reports/${id}`).limitToLast(limitToLast).once('value', (snapshot) => reports.push(snapshot.val()));
            })
        ).catch((error) => {
            new Sin(error, 1);
        });

        return reports.map((report) => {
            report.uid = uuid();
            return report;
        });
    }


    static async getUserData() {
        const userID = await firebase.auth().currentUser.uid;

        if (!userID) {
            new Sin('No data found for user ' + userID, 1);
            return;
        }

        let userData = await firebase.database().ref(`/users_meta/${userID}`).once('value').catch((error) => {
            new Sin(error, 1);
        });

        return userData.val();
    }


    static async postArrayOfUpdates(updates) {
        return await firebase.database().ref().update(updates).catch((error) => {
            new Sin(error, 1);
        });
    }


    static async getNextRefKey(tree) {
        return await firebase.database().ref(tree).push().key;
    }
}
