/*eslint-disable no-shadow, no-param-reassign*/
import { select, all, put, take, takeEvery, call } from 'redux-saga/effects';

import types from '../types';
import * as actions from '../actions';
import { firestore } from '../firebase';
import store from '../index';
import { getUID, getLists, getItems } from './selectors';

const state = {
  length: () => store.getState().items.length,
  lists: () => store.getState().lists,
  items: () => store.getState().items,
  load: snap => {
    const items = [];
    snap.forEach(doc => {
      const data = doc && doc.data();
      data.id = doc.id;
      data.index = items.length;
      items.push(data);
    });
    return items;
  },
  get: () => console.error('_itemSagas.state.get() called before loaded.'),
  set: () => console.error('_itemSagas.state.set() called before loaded.'),
};

export const watchItems = function* () {
  try {
    yield takeEvery(types.LIST_SELECT, setListener);
    yield takeEvery(types.ITEM_ADD, itemAdd);
    yield takeEvery(types.ITEM_REMOVE, itemRemove);
    yield takeEvery(types.ITEM_MODIFY, itemModify);
    yield takeEvery(types.ITEM_UP, itemUp);
    yield takeEvery(types.ITEM_DOWN, itemDown);
  } catch (e) {
    console.log(e.message);
  }
};

export const setListener = function* ({ index }) {
  try {
    state.uid = yield select(getUID);
    const { uid } = state;
    const lists = state.lists();
    const list = lists[index];
    const { id } = list;
    if (uid && id && index !== null) {
      state.ref = firestore.collection(`users/${uid}/lists/${id}/items`);
      state.get = ({ id, index }) => {
        if (id) {
          return state.ref.doc(id).get();
        }
        if (index !== undefined) {
          return state.ref.where('index', '==', index).get();
        }
        return state.ref.orderBy('index');
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
        const { index, id } = data;
        if (index === undefined) {
          data.index = state.length();
        }
        if (id) {
          state.ref.doc(data.id).set(data);
        } else {
          state.ref.add(data);
        }
      };
      if (state.unsubscribe) {
        state.unsubscribe();
        delete state.unsubscribe;
      }
      state.unsubscribe = state.ref.orderBy('index')
        .onSnapshot(snap => {
          store.dispatch(
            actions.SetItems(
              state.load(snap)
            )
          );
        });
    } else if (state.unsubscribe) {
      state.unsubscribe();
      delete state.unsubscribe;
      store.dispatch(actions.SetItems([]));
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const itemAdd = function* ({ name = '', checked = false }) {
  try {
    yield state.set({ name, checked });
  } catch (e) {
    console.log(e.message);
  }
};

export const itemRemove = function* ({ index }) {
  try {
    yield state.delete({ index });
  } catch (e) {
    console.log(e.message);
  }
};

export const itemModify = function* ({ id, index, name, checked }) {
  try {
    yield state.set({ id, index, name, checked });
  } catch (e) {
    console.log(e.message);
  }
};

export const itemUp = function* ({ index }) {
  try {
    index = Number(index);
    const items = yield select(getItems);
    const src = items[index];
    const dest = items[index - 1];

    src.index = index - 1;
    dest.index = index;

    yield state.set(src);
    yield state.set(dest);
  } catch (e) {
    console.log(e.message);
  }
};

export const itemDown = function* ({ index }) {
  try {
    index = Number(index);
    const items = yield select(getItems);
    const src = items[index];
    const dest = items[index + 1];

    src.index = index + 1;
    dest.index = index;

    yield state.set(src);
    yield state.set(dest);
  } catch (e) {
    console.log(e.message);
  }
};
