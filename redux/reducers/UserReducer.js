import types from '../types';

const initialState = null;

export default (state = initialState, { type, user }) => {
  switch (type) {
    case types.SET_USER:
      return user || null;
    default:
      return state;
  }
};
