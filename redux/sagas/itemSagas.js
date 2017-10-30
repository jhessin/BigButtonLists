import { select, all, put, take, takeEvery, call } from 'redux-saga/effects';

import types from '../types';
import * as actions from '../actions';
import { firestore } from '../firebase';
import store from '../index';
import { getUID, getLists, getItems } from './selectors';

const state = {};

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
    const lists = yield select(getLists);
    const list = lists[index];
    const { id } = list;
    if (uid && id && index !== null) {
      //collection('users').doc(uid).collection('lists')
      state.ref = firestore.collection(`users/${uid}/lists/${id}/items`);
      state.get = () => state.ref.orderBy('index');
      state.set = function* (data) {
        /*eslint-disable no-shadow*/
        const { index } = data;
        const lists = yield select(getLists);
        if (index !== undefined) {
          const { id } = lists[index];
          if (id) {
            state.ref.doc(id).set(data);
          } else {
            state.ref.add(data);
          }
        } else {
          /*eslint-disable no-param-reassign*/
          data.index = lists.length;
          state.ref.add(data);
        }
      };
      if (state.unsubscribe) {
        state.unsubscribe();
        delete state.unsubscribe;
      }
      state.unsubscribe = state.ref
        .onSnapshot(snap => {
          store.dispatch(actions.SetItems(snap && snap.data()));
        });
      // yield call(
      //   fs.setDocument,
      //   `users/${uid}`,
      //   {
      //     username: user.displayName
      //   }
      // );
    } else if (state.unsubscribe) {
      state.unsubscribe();
      delete state.unsubscribe;
      store.dispatch(actions.SetItems([]));
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const itemAdd = function* ({ name = '' }) {
  try {
    yield state.get()
      .then(doc => {
        const data = doc && doc.data();
        data.items = data.items || [];
        data.items.push({ name, checked: false });
        state.set(data);
      });
  } catch (e) {
    console.log(e.message);
  }
};

function saveItems(list) {
  state.get().then(snap => {
    snap.forEach(doc => {
      const data = doc.exists ? doc.data() : {};
      const { id, index } = doc;
      if (index) {
        state.set(list[index]);
      } // TODO:---------TODO TODO TODO
    });
  });
}

export const itemRemove = function* ({ index }) {
  try {
    const list = yield select(getItems);
    list.splice(index, 1);
    saveItems(list);
    // yield call(
    //   fs.deleteDocument,
    //   `users/${uid}/lists/${id}`
    // );
  } catch (e) {
    console.log(e.message);
  }
};

export const itemModify = function* ({ index, name, checked }) {
  try {
    const list = yield select(getItems);
    list[index] = {
      name,
      checked
    };
    saveItems(list);
    // yield call(
    //   fs.setDocument,
    //   `users/${uid}/lists/${id}`,
    //   {
    //     id,
    //     name
    //   }
    // );
  } catch (e) {
    console.log(e.message);
  }
};

function swap(list, index1, index2) {
  const newList = [...list];

  newList[index1] = list[index2];
  newList[index2] = list[index1];

  return newList;
}

export const itemUp = function* ({ index }) {
  try {
    const list = yield select(getItems);
    saveItems(swap(list, index, index - 1));
  } catch (e) {
    console.log(e.message);
  }
};

export const itemDown = function* ({ index }) {
  try {
    const list = yield select(getItems);
    saveItems(swap(list, index, Number(index) + 1));
  } catch (e) {
    console.log(e.message);
  }
};
