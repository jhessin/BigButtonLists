import { all, put, takeEvery } from 'redux-saga/effects';

import types from '../types';
import * as fb from './firebaseInit';

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
