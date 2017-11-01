import { firestore } from './firebase';
import store, { types, actions } from '../redux';

/* eslint-disable no-param-reassign */

const db = {
  // Getters
  lists: () => store.getState().lists,
  items: () => store.getState().items,
  listsLength: () => db.lists().length,
  itemsLength: () => db.items().length,

  // Generic helpers
  docToData: doc => {
    if (doc.exists) {
      const data = doc.data();
      data.id = doc.id;
      return data;
    }
    return null;
  },
  snapToArray: snap => {
    const list = [];
    snap.forEach(doc => {
      const data = db.docToData(doc);
      data.index = list.length;
      list.push(data);
    });
    return list;
  },
  getFromRef: async({ ref, id, index }) => {
    if (!ref) {
      return null;
    }
    if (id) {
      const doc = await ref.doc(id).get();
      return db.docToData(doc);
    }
    if (index !== undefined) {
      const snap = await ref.where(
        'index', '==', index).get();
      return db.docToData(snap.docs[0]);
    }
    const snap = await ref.orderBy('index').get();
    return db.snapToArray(snap);
  },
  setFromRef: ({ ref, id, ...data }) => {
    if (id) {
      ref.doc(id).update({ id, ...data });
    } else {
      ref.add(data);
    }
  },
  delete: async({ ref, id, index }) => {
    if (!ref) {
      return;
    }
    if (id) {
      return ref.doc(id).delete();
    }
    if (index !== undefined) {
      const snap = await ref.where('index', '==', index).get();
      snap.forEach(
        doc => doc.ref.delete()
      );
    }
  },
  up: ({ save, dataArray, index }) => {
    index = Number(index);
    const src = dataArray[index];
    const dest = dataArray[index - 1];

    src.index = index - 1;
    dest.index = index;

    save(src);
    save(dest);
  },
  down: ({ save, dataArray, index }) => {
    index = Number(index);
    const src = dataArray[index];
    const dest = dataArray[index + 1];

    src.index = index + 1;
    dest.index = index;

    save(src);
    save(dest);
  },

  // Useable wrapper methods for lists
  listen: (user) => {
    // Get and Check required variables
    if (user) {
      db.uid = user.uid;
      const { uid } = user;

      // save the listsRef for later.
      db.listsRef = firestore.collection(`users/${uid}/lists`);

      // Unsubscribe from previous listeners
      if (db.listUnsubscribe) {
        db.listUnsubscribe();
        delete db.listUnsubscribe;
      }

      // listen to the lists on the server and post them to redux
      db.listUnsubscribe = db.listsRef.orderBy('index')
        .onSnapshot(snap => {
          store.dispatch(
            actions.SetLists(
              db.snapToArray(snap)
            )
          );
        });
    } else if (db.listUnsubscribe) {
      delete db.uid;
      db.listUnsubscribe();
      db.select();
      store.dispatch(
        actions.SetLists([])
      );
      delete db.listUnsubscribe;
    }
  },
  getList: async({ id, index }) =>
    await db.getFromRef({
      ref: db.listsRef,
      id,
      index
    }),
  setList: ({ id, index, name = '' }) => {
    if (index === undefined) {
      index = db.listsLength();
    }
    db.setFromRef({ ref: db.listsRef, id, index, name });
  },
  deleteList: ({ id, index }) => db.delete({
    ref: db.listsRef,
    id,
    index
  }),
  upList: (index) => db.up({
    save: db.setList,
    dataArray: db.lists(),
    index
  }),
  downList: (index) => db.down({
    save: db.setList,
    dataArray: db.lists(),
    index
  }),

  // Useable wrapper methods for items
  select: (index) => {
    // Get and Check required variables
    try {
      const { id } = db.lists()[index];
      if (id && db.listsLength > index) {
        db.selectedList = { id, index };
        // save itemsRef for later.
        db.itemsRef = db.listsRef.collection(
          `${id}/items`);

        // Unsubscribe from previous listeners
        if (db.itemUnsubscribe) {
          db.itemUnsubscribe();
          delete db.itemUnsubscribe;
        }

        // listen to the items on the server and post them to redux
        db.itemUnsubscribe = db.itemsRef.orderBy('index')
          .onSnapshot(snap => {
            store.dispatch(
              actions.SetItems(
                db.snapToArray(snap)
              )
            );
          }
        );
      }
    } catch (e) {
        if (db.itemUnsubscribe) {
          db.itemUnsubscribe();
          delete db.listUnsubscribe;
      }
      store.dispatch(
        actions.SetItems([])
      );
    }
  },
  getItem: async({ id, index }) =>
    await db.getFromRef({
      ref: db.itemsRef,
      id,
      index
    }),
  setItem: ({ id, index, name = '', checked = false }) => {
    if (index === undefined) {
      index = db.itemsLength();
    }
    db.setFromRef({ ref: db.itemsRef, id, index, name, checked });
  },
  deleteItem: ({ id, index }) => db.delete({
    ref: db.itemsRef,
    id,
    index
  }),
  upItem: (index) => db.up({
    save: db.setItem,
    dataArray: db.items(),
    index
  }),
  downItem: (index) => db.down({
    save: db.setItem,
    dataArray: db.items(),
    index
  }),
};

export default db;
/* NOTE
  listsRef - A reference to the lists
  itemsRef - A reference to the items selected
  selectedList - the { id, index } of the selected list.
*/
