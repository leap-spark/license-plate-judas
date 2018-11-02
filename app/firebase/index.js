import * as firebase from 'firebase';
import {
    API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID
} from 'react-native-dotenv';

import { Sin } from '../lib';


const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID
};

try {
    firebase.initializeApp(firebaseConfig);
} catch (error) {
    new Sin(error, 2, 'fatal');
}

export default firebase;
