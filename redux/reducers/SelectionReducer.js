import type from '../types';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case type.LIST_SELECT:
      return action.index;
    default:
      return state;
  }
};
