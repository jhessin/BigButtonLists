import type from '../types';

const initialState = [];

export default (state = initialState, action) => {
  const newState = [...state];

  switch (action.type) {
    case type.LIST_ADD:
      return [...state, {
        name: action.name
      }];
    case type.LIST_REMOVE:
      newState.splice(action.index, 1);
      return newState;
    case type.LIST_MODIFY:
      newState[action.index] = {
        name: action.name
      };
      return newState;
    case type.LIST_UP:
      return state.slice(0, action.index - 1)
        .concat([state[action.index]])
        .concat([state[action.index - 1]])
        .concat(state.slice(action.index + 1));
    case type.LIST_DOWN:
      return state.slice(0, action.index)
        .concat([state[action.index + 1]])
        .concat([state[action.index]])
        .concat(state.slice(action.index + 2));
    default:
      return state;
  }
};
