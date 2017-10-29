import types from '../types';
import { swap } from './ListsReducer';

const initialState = [];

export default (state = initialState, { type, data }) => {
  switch (type) {
    case types.SET_ITEMS:
      return (data && data.items) || data || state;
    default:
      return state;
  }
};
