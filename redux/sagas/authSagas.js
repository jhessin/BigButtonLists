import { take, takeEvery, put, call } from 'redux-saga/effects';

import { auth, fs } from '../firebase';
import store from '../index';
import types from '../types';
import * as actions from '../actions';

export const watchLogin = function* () {
  try {
    yield takeEvery(types.AUTH_CREATE, authCreate);
    yield takeEvery(types.AUTH_LOGIN, authLogin);
    yield takeEvery(types.AUTH_LOGOUT, authLogout);
  } catch (e) {
    console.log(e.message);
  }
};

export const authCreate = function* ({ email, pass }) {
  try {
    yield auth.createUserWithEmailAndPassword(email, pass)
      .then(user => {
        store.dispatch(actions.SetUser(user));
      });
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
