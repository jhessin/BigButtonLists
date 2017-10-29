import { take, takeEvery, put, call } from 'redux-saga/effects';

import { auth, fs } from '../firebase';
import types from '../types';
import * as actions from '../actions';

export const watchLogin = function* () {
  try {
    yield takeEvery(types.AUTH_LISTEN, authListen);
    yield takeEvery(types.AUTH_CREATE, authCreate);
    yield takeEvery(types.AUTH_LOGIN, authLogin);
    yield takeEvery(types.AUTH_LOGOUT, authLogout);
  } catch (e) {
    console.log(e.message);
  }
};

export const authListen = function* ({ nav, inScreen, outScreen }) {
  try {
    const channel = yield call(auth.channel);
    /* eslint-disable no-constant-condition */
    while (true) {
      const { error, user } = yield take(channel);
      if (user) nav(inScreen);
      else if (error) console.log(JSON.stringify(error));
      else nav(outScreen);
      yield put({ type: types.SET_USER, user });
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const authCreate = function* ({ email, pass }) {
  try {
    const user = yield call(auth.createUserWithEmailAndPassword, email, pass);
    yield put({ type: types.SET_USER, user });
  } catch (e) {
    console.log(e.message);
  }
};

export const authLogin = function* ({ uname, pass }) {
  try {
    yield auth.signOut();
    yield auth.signInWithEmailAndPassword(uname, pass);
  } catch (e) {
    console.log(e.message);
  }
};

export const authLogout = function* () {
  try {
    yield auth.signOut();
  } catch (e) {
    console.log(e.message);
  }
};
