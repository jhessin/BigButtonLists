import firebase from 'firebase';

import { fbConfig } from './keys';

require('firebase/firestore');

export default firebase.initializeApp(fbConfig);
export const firestore = firebase.firestore();
