import * as firebase from 'firebase';


export default class API {

    static async getReportsForPlate(plate) {
        let ids = [];
        let reports = [];

        try {
            ids = await firebase.database().ref(`/offenders_meta/${plate}/associated_reports`).once('value');
            reports = await firebase.LPJ.getReports(ids.val());
        } catch (error) {
            throw new Error(error);
        }

        return reports;
    }


    static async getReports(ids, limitToLast = 50) {
        ids = Object.keys(ids);

        if (!ids.length) {
            throw new Error('Argument `id` must be a non-empty array of strings');
        }

        let reports = [];

        // This was 500ms faster than filtering the data on server
        // See: https://stackoverflow.com/questions/35931526/speed-up-fetching-posts-for-my-social-network-app-by-using-query-instead-of-obse/35932786#35932786
        await Promise.all(
            ids.map(id => {
                return firebase.database().ref(`/reports/${id}`).limitToLast(limitToLast).once('value', (snapshot) => reports.push(snapshot.val()));
            })
        ).catch(error => console.error(error));

        return reports;
    }


    static async getUserData() {
        const userID = await firebase.auth().currentUser.uid;

        if (!userID) {
            throw new Error('User is either not logged in or could not be retrieved from database');
        }

        let userData = await firebase.database().ref(`/users_meta/${userID}`).once('value');

        return userData.val();
    }
}
