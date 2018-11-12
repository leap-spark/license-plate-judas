import * as firebase from 'firebase';
import {
    API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID
} from 'react-native-dotenv';

import { ErrorHandler } from '../lib';

const firebaseConfig: object = {
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
    ErrorHandler.LogException(error);
}

export default firebase;
