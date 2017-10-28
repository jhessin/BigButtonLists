import { select, all, put, take, takeEvery, call } from 'redux-saga/effects';

import types from '../types';
import * as actions from '../actions';
import { rsf, fs } from './firebaseInit';
import { getUID } from './selectors';

export const watchLists = function* () {
  try {
    console.log(rsf);
    yield takeEvery(types.LIST_ADD, listAdd);
    yield takeEvery(types.LIST_REMOVE, listRemove);
    yield takeEvery(types.LIST_MODIFY, listModify);
    yield takeEvery(types.LIST_UP, listUp);
    yield takeEvery(types.LIST_DOWN, ListDown);

    let uid = yield select(getUID);
    while (!uid) {
      uid = yield select(getUID);
    }
    const listChannel = fs.channel(`users/${uid}/lists`);

    /* eslint-disable no-constant-condition */
    while (true) {
      const lists = yield take(listChannel);
      yield put(actions.SetLists(lists));
    }
  } catch (e) {
    console.log(JSON.stringify(e));
  }
};

export const listAdd = function* ({ name = '' }) {
  try {
    const uid = yield select(getUID);
    const doc = yield call(
      fs.addDocument,
      `users/${uid}/lists`,
      {
        name,
        items: []
      }
    );
    yield console.log(`List: ${name} added!`);
  } catch (e) {
    console.log(e.message);
  }
};

export const listRemove = function* (action) {
  yield console.log(`List at index: ${action.index} removed!`);
};

export const listModify = function* (action) {
  yield console.log(`List at index: ${action.index} renamed to: ${action.name}`);
};

export const listUp = function* (action) {
  yield console.log(`List at index: ${action.index} moved up`);
};

export const ListDown = function* (action) {
  yield console.log(`List at index: ${action.index} moved down`);
};
