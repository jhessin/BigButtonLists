import { select, all, put, take, takeEvery, call } from 'redux-saga/effects';

import types from '../types';
import * as actions from '../actions';
import { firestore } from '../firebase';
import store from '../index';
import { getUID, getLists } from './selectors';

const state = {
  length: () => store.getState().lists.length,
  lists: () => store.getState().lists,
  load: snap => {
    const lists = [];
    snap.forEach(doc => {
      const data = doc.data();
      data.id = doc.id;
      data.index = lists.length;
      lists.push(data);
    });
    return lists;
  },
  get: () => console.error('_listSagas.state.get() called before loaded.'),
  set: () => console.error('_listSagas.state.set() called before loaded.'),
};

export const watchLists = function* () {
  try {
    yield takeEvery(types.LIST_ADD, listAdd);
    yield takeEvery(types.LIST_REMOVE, listRemove);
    yield takeEvery(types.LIST_MODIFY, listModify);
    yield takeEvery(types.LIST_UP, listUp);
    yield takeEvery(types.LIST_DOWN, ListDown);
    yield takeEvery(types.SET_USER, setListener);
  } catch (e) {
    console.log(e.message);
  }
};

export const setListener = function* ({ user }) {
  try {
    if (user) {
      const { uid } = user;
      state.ref = firestore.collection(`users/${uid}/lists`);
      state.get = ({ id, index }) => {
        if (id) {
          return state.ref.doc(id).get();
        }
        if (index !== undefined) {
          return state.ref.where('index', '==', index).get();
        }
        return state.ref.orderBy('index').get();
      };
      state.delete = ({ id, index }) => {
        if (id) {
          return state.ref.doc(id).delete();
        }
        if (index !== undefined) {
          return state.ref.where('index', '==', index).get()
            .then(snap => {
              snap.forEach(doc => {
                doc.ref.delete();
              });
            });
        }
        return state.ref.delete();
      };
      state.set = data => {
        if (data.index === undefined) {
          /*eslint-disable no-param-reassign*/
          data.index = state.length();
        }
        if (data.id) {
          state.ref.doc(data.id).set(data);
        } else {
          state.ref.add(data);
        }
      };
      if (state.unsubscribe) {
        state.unsubscribe();
        delete state.unsubscribe;
      }
      yield state.unsubscribe = state.ref.orderBy('index')
        .onSnapshot(snap => {
          store.dispatch(
            actions.SetLists(
              state.load(snap)
            )
          );
        });
    } else if (state.unsubscribe) {
      state.unsubscribe();
      delete state.unsubscribe;
      store.dispatch(actions.SetLists([]));
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const listAdd = function* ({ name = '' }) {
  try {
    yield state.set({ name });
  } catch (e) {
    console.log(e.message);
  }
};

export const listRemove = function* ({ index }) {
  try {
    yield state.delete({ index });
  } catch (e) {
    console.log(e.message);
  }
};

export const listModify = function* ({ id, index, name }) {
  try {
    yield state.set({ id, index, name });
  } catch (e) {
    console.log(e.message);
  }
};

export const listUp = function* ({ index }) {
  try {
    index = Number(index);
    const src = state.lists()[index];
    const dest = state.lists()[index - 1];
    src.index = index - 1;
    dest.index = index;
    yield state.set(src);
    yield state.set(dest);
  } catch (e) {
    console.log(e.message);
  }
};

export const ListDown = function* ({ index }) {
  try {
    index = Number(index);
    const src = state.lists()[index];
    const dest = state.lists()[index + 1];
    src.index = index + 1;
    dest.index = index;
    yield state.set(src);
    yield state.set(dest);
  } catch (e) {
    console.log(e.message);
  }
};
