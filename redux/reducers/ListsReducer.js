import types from '../types';

const initialState = [];

export default (state = initialState, { type, data }) => {
  switch (type) {
    case types.SET_LISTS:
      return data;
    default:
      return state;
  }
};
