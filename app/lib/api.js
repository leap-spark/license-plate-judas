import * as firebase from 'firebase';

import Storage from './storage';


function handleError(error) {
    alert(error);
}

export default class API {

    static async signInUser(email, password) {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            // TODO: Handle this error when implementing centralized error handler
            handleError(error.message);
            console.error(error);
        }
    }


    static async registerUser(email, password) {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
        } catch (error) {
            handleError(error);
            console.error(error);
        }
    }


    static async signOutUser() {
        return await Promise.all([
            Storage.delete('Token'),
            firebase.auth().signOut()
        ]).catch((error) => {
            // TODO: Do something useful with this error
            handleError(error);
            console.error(error);
        });
    }


    static async getReportsForPlate(plate) {
        try {
            const ids = await API.getListOfReportIds(plate);

            if (!ids) {
                return [];
            }

            return await API.getReports(ids);
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


    static async getReports(ids, limitToLast = 50) {
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

        return reports;
    }


    static async getUserData() {
        const userID = await firebase.auth().currentUser.uid;

        if (!userID) {
            // TODO: Do something here to handle the "error"
            return;
        }

        let userData = await firebase.database().ref(`/users_meta/${userID}`).once('value');

        return userData.val();
    }
}
