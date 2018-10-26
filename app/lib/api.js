import uuid from 'uuid/v4';
import * as firebase from 'firebase';

import Storage from './storage';


function handleError(error) {
    alert(error);
}

export default class API {

    static async signInUser(email, password) {
        return await firebase.auth().signInWithEmailAndPassword(email, password).catch(handleError);
    }


    static async registerUser(email, password) {
        return await firebase.auth().createUserWithEmailAndPassword(email, password).catch(handleError);
    }


    static async signOutUser() {
        return await Promise.all([
            Storage.delete('Token'),
            firebase.auth().signOut()
        ]).catch(handleError);
    }


    static async getReportsForPlate(plate) {
        try {
            const ids = await API.getListOfReportIds(plate);

            if (!ids) {
                return [];
            }

            return await API.getReportsByIds(ids);
        } catch (error) {
            // TODO: Do something useful with this error
            console.error(error);
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
            console.error(error);
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
            // TODO: Do something useful with this error
            console.error(error);
        });

        return reports.map((report) => {
            report.uid = uuid();
            return report;
        });
    }


    static async getUserData() {
        const userID = await firebase.auth().currentUser.uid;

        if (!userID) {
            // TODO: Do something here to handle the "error"
            return;
        }

        let userData = await firebase.database().ref(`/users_meta/${userID}`).once('value').catch(handleError);

        return userData.val();
    }
}
