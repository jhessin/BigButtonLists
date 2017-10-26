import { all, put, takeEvery } from 'redux-saga/effects';

import types from '../types';
import { fs } from './firebaseInit';

export const watchLists = function* () {
  try {
    yield takeEvery(types.LIST_ADD, listAdd);
    yield takeEvery(types.LIST_REMOVE, listRemove);
    yield takeEvery(types.LIST_MODIFY, listModify);
    yield takeEvery(types.LIST_UP, listUp);
    yield takeEvery(types.LIST_DOWN, ListDown);
  } catch (e) {
    console.log(JSON.stringify(e));
  }
};

export const listAdd = function* (action) {
  yield console.log(`List: ${action.name} added!`);
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
