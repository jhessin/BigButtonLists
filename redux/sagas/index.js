import firebase from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';
import { delay } from 'redux-saga';
import { all, put, takeEvery } from 'redux-saga/effects';

import { watchLists } from './listSagas';

export * from './firebaseInit';

export const rootSaga = function* () {
  try {
    yield all([
      watchLists()
    ]);
  } catch (e) {
    console.error(e.message);
  }
};
