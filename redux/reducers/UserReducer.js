import types from '../types';

const initialState = { id: 0 };

export default (state = initialState, { type, user }) => {
  switch (type) {
    case types.SET_USER:
      return user || state;
    default:
      return state;
  }
};
