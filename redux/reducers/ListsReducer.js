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
  let temp = 0;

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

      temp = newState[action.index - 1];
      newState[action.index - 1] = newState[action.index];
      newState[action.index] = temp;

      return newState;
    case type.LIST_DOWN:

      temp = newState[action.index];
      newState[action.index] = newState[action.index + 1];
      newState[action.index + 1] = temp;

      return newState;
    default:
      return state;
  }
};
