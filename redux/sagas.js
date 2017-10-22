import { delay } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';

export const helloSaga = function* () {
  yield console.log('Hello Sagas!');
};
