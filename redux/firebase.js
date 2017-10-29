import firebaseGen from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';

import { fbConfig } from './keys';

require('firebase/firestore');

export const firebase = firebaseGen.initializeApp(fbConfig);
export const firestore = firebase.firestore();
export const rsf = new ReduxSagaFirebase(firebase, firestore);
export const auth = rsf.auth;
export { fs } from './firestore';
