import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA871kJG58zQ0LU0OJQMF8Dnus5PBRql_M",
    authDomain: "license-plate-judas.firebaseapp.com",
    databaseURL: "https://license-plate-judas.firebaseio.com",
    projectId: "license-plate-judas",
    storageBucket: "license-plate-judas.appspot.com",
    messagingSenderId: "1008062418582"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
