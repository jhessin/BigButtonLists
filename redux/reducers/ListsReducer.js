import type from '../types';

const initialState = [
  { name: 'list1' },
  { name: 'list2' },
  { name: 'list3' },
  { name: 'list4' },
  { name: 'list5' },
  { name: 'list6' },
];

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
      newState[action.index - 1] = state[action.index];
      newState[action.index] = state[action.index - 1];

      return newState;
    case type.LIST_DOWN:
      newState[action.index] = state[action.index + 1];
      newState[action.index + 1] = state[action.index];

      return newState;
    default:
      return state;
  }
};
