import firebase from './firebase';
import db from './db';
import store, { types, actions } from '../redux';

const auth = firebase.auth();

export function listen({ nav, inScreen = 'Lists', outScreen = 'Main' }) {
  auth.onAuthStateChanged(user => {
    if (user) {
      store.dispatch(actions.SetUser(user));
      db.listen();
      nav(inScreen);
    } else {
      nav(outScreen);
    }
  });
}

export function create({ email, pass }) {
  try {
    auth.createUserWithEmailAndPassword(email, pass);
  } catch (e) {
    console.log(e.message);
  }
}

export function login({ email, pass }) {
  try {
    auth.signInWithEmailAndPassword(email, pass);
  } catch (e) {
    console.log(e.message);
  }
}

export function signOut() {
  try {
    auth.signOut();
  } catch (e) {
    console.log(e.message);
  }
}
