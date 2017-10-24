import firebase from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';

import { fbConfig } from './keys';

require('firebase/firestore');

export const firebaseApp = firebase.initializeApp(fbConfig);
export const rsf = new ReduxSagaFirebase(firebaseApp, firebase.firestore());
export const auth = rsf.auth;
export const fs = rsf.firestore;
