import { delay } from 'redux-saga';
import { all, put, takeEvery } from 'redux-saga/effects';

export const rootSaga = function* () {
  try {
    yield all([
      helloSaga()
    ]);
  } catch (e) {
    console.error(e.message);
  }
};

export const helloSaga = function* () {
  yield console.log('Hello Sagas!');
};

export default rootSaga;
