import { firestore, rsf } from './firebase';

function stringToDocRef(ref) {
  if (typeof ref === 'string') {
    return firestore.doc(ref);
  }
  return ref;
}

function stringToColRef(ref) {
  if (typeof ref === 'string') {
    return firestore.collection(ref);
  }
  return ref;
}

const addDocument = function* (collectionRef, data) {
  const ref = stringToColRef(collectionRef);
  yield ref.add(data);
};

const deleteDocument = function* (documentRef) {
  const ref = stringToDocRef(documentRef);
  yield ref.delete();
};

const getCollection = function* (collectionRef) {
  const ref = stringToColRef(collectionRef);
  yield ref.get();
};

const getDocument = function* (documentRef) {
  const ref = stringToDocRef(documentRef);
  yield ref.get();
};

const setDocument = function* (documentRef, data, options) {
  const ref = stringToDocRef(documentRef);
  yield ref.set(data, options);
};

const syncCollection = function* (pathOrRef, actionCreator, transform) {
  yield console.log('syncCollection not yet implemented');
};

const syncDocument = function* (pathOrRef, actionCreator, transform) {
  yield console.log('syncDocument not yet implemented');
};

const updateDocument = function* (documentRef, ...args) {
  yield console.log('updateDocument not yet implemented');
};

export const fs = {
  channel: (pathOrRef, type) => {
    console.log('fs.channel not yet implemented.');
  },
  addDocument,
  deleteDocument,
  getCollection,
  getDocument,
  setDocument,
  syncCollection,
  syncDocument,
  updateDocument,
};
