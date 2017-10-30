import { select, all, put, take, takeEvery, call } from 'redux-saga/effects';

import types from '../types';
import * as actions from '../actions';
import { firestore } from '../firebase';
import store from '../index';
import { getUID, getLists } from './selectors';

const state = {};

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

function load(snap) {
  const lists = [];
  snap.forEach(doc => {
    const data = doc && doc.data();
    data.id = doc.id;
    lists.push(data);
  });
  return lists;
}

function save(index, name = '', id = 0, /*items = []*/) {
  const data = { name, index };

  if (id) {
    state.ref.doc(id).set(data);
    // items.forEach(item => {
    //   const itemId = item.id;
    //   if (itemId) {
    //     state.ref.doc(`${id}/items/${itemId}`)
    //       .set(item);
    //   } else {
    //     state.ref.collection(`${id}/items`)
    //       .add(item);
    //   }
    // });
  } else if (index) {
    state.ref.add(data);
  } else {
    // TODO
  }
}

export const setListener = function* ({ user }) {
  try {
    if (user) {
      const { uid } = user;
      state.ref = firestore.collection(`users/${uid}/lists`);
      if (state.unsubscribe) {
        state.unsubscribe();
        delete state.unsubscribe;
      }
      yield state.unsubscribe = state.ref
        .onSnapshot(snap => {
          store.dispatch(
            actions.SetLists(
              load(snap)
            )
          );
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
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const listAdd = function* ({ name = '' }) {
  try {
    yield save(name);
  } catch (e) {
    console.log(e.message);
  }
};

export const listRemove = function* ({ index }) {
  try {
    const lists = yield select(getLists);
    const uid = yield select(getUID);
    const { id } = lists[index];
    state.ref.doc(id).delete();
    // yield call(
    //   fs.deleteDocument,
    //   `users/${uid}/lists/${id}`
    // );
  } catch (e) {
    console.log(e.message);
  }
};

export const listModify = function* ({ index, name }) {
  try {
    const lists = yield select(getLists);
    const list = lists[index];
    const { id } = list;
    save(name, id);
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

export const listUp = function* ({ index }) {
  try {
    const lists = yield select(getLists);
    const uid = yield select(getUID);
    const origin = { ...lists[index] };
    if (index >= 0) {
      const dest = { ...lists[index - 1] };
      origin.id = dest.id;
      dest.id = lists[index].id;

      state.ref.doc(origin.id).set(origin);
      // yield call(
      //   fs.setDocument,
      //   `users/${uid}/lists/${origin.id}`,
      //   origin
      // );
      state.ref.doc(dest.id).set(dest);
      // yield call(
      //   fs.setDocument,
      //   `users/${uid}/lists/${dest.id}`,
      //   dest
      // );
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const ListDown = function* ({ index }) {
  try {
    const lists = yield select(getLists);
    const uid = yield select(getUID);
    const origin = { ...lists[index] };
    if (index >= 0) {
      const dest = { ...lists[Number(index) + 1] };
      origin.id = dest.id;
      dest.id = lists[index].id;

      state.ref.doc(origin.id).set(origin);
      // yield call(
      //   fs.setDocument,
      //   `users/${uid}/lists/${origin.id}`,
      //   origin
      // );
      state.ref.doc(dest.id).set(dest);
      // yield call(
      //   fs.setDocument,
      //   `users/${uid}/lists/${dest.id}`,
      //   dest
      // );
    }
  } catch (e) {
    console.log(e.message);
  }
};
