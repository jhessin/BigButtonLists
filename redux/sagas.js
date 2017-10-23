import firebase from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';
import { delay } from 'redux-saga';
import { all, put, takeEvery } from 'redux-saga/effects';

import { fbConfig } from '../keys';
import types from './types';

require('firebase/firestore');

const firebaseApp = firebase.initializeApp(fbConfig);
const rsf = new ReduxSagaFirebase(firebaseApp, firebase.firestore());
const auth = rsf.auth;
const fs = rsf.firestore;

export const rootSaga = function* () {
  try {
    yield all([
      watchLists()
    ]);
  } catch (e) {
    console.error(e.message);
  }
};

export const listAdded = function* (action) {
  yield console.log(`List: ${action.name} added!`);
};

export const listRemoved = function* (action) {
  yield console.log(`List at index: ${action.index} removed!`);
};

export const listModified = function* (action) {
  yield console.log(`List at index: ${action.index} renamed to: ${action.name}`);
};

export const listUp = function* (action) {
  yield console.log(`List at index: ${action.index} moved up`);
};

export const ListDown = function* (action) {
  yield console.log(`List at index: ${action.index} moved down`);
};

export const watchLists = function* () {
  try {
    yield takeEvery(types.LIST_ADD, listAdded);
    yield takeEvery(types.LIST_REMOVE, listRemoved);
    yield takeEvery(types.LIST_MODIFY, listModified);
    yield takeEvery(types.LIST_UP, listUp);
    yield takeEvery(types.LIST_DOWN, ListDown);
  } catch (e) {
    console.error(e.message);
  }
};

// export default rootSaga;
