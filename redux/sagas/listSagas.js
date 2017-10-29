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

export const setListener = function* ({ user }) {
  try {
    let unsubscribe;
    if (user) {
      const { uid } = user;
      state.ref = firestore.collection(`users/${uid}/lists`);
      yield unsubscribe = state.ref
        .onSnapshot(snap => {
          store.dispatch(actions.SetLists(snap));
        });
      // yield call(
      //   fs.setDocument,
      //   `users/${uid}`,
      //   {
      //     username: user.displayName
      //   }
      // );
    } else if (unsubscribe) {
      unsubscribe();
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const listAdd = function* ({ name = '' }) {
  try {
    const uid = yield select(getUID);
    const data = {
      name,
      id: 0,
      items: []
    };
    state.ref.add(data)
      .then(doc => {
        data.id = doc.id;
        doc.set(data);
      });
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
    const uid = yield select(getUID);
    const list = lists[index];
    const { id } = list;
    state.ref.doc(id).get().then(doc => {
      if (doc.exists) {
        const data = doc.data();
        data.id = id;
        data.name = name;
        state.ref.doc(id).set(data);
      }
    });
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
