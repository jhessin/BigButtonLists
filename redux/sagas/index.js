import firebase from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';
import { delay } from 'redux-saga';
import { all, put, takeEvery } from 'redux-saga/effects';

import { watchLogin } from './authSagas';
import { watchLists } from './listSagas';
import { watchItems } from './itemSagas';

export const rootSaga = function* () {
  try {
    yield all([
      watchLogin(),
      watchLists(),
      watchItems(),
    ]);
  } catch (e) {
    console.log(e.message);
  }
};
