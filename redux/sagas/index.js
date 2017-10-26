import firebase from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';
import { delay } from 'redux-saga';
import { all, put, takeEvery } from 'redux-saga/effects';

import { watchLogin } from './authSagas';
import { watchLists } from './listSagas';

export const rootSaga = function* () {
  try {
    yield all([
      watchLogin(),
      watchLists(),
    ]);
  } catch (e) {
    console.log(JSON.stringify(e));
  }
};
