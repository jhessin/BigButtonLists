import types from '../types';

const initialState = [
  { name: 'list1' },
  { name: 'list2' },
  { name: 'list3' },
  { name: 'list4' },
  { name: 'list5' },
  { name: 'list6' },
];

function swap(arr, x, y) {
  const newArr = Array.from(arr);

  newArr[x] = arr[y];
  newArr[y] = arr[x];

  return newArr;
}

export default (state = initialState, action) => {
  const newState = [...state];

  // For some reason action.index is a String?
  const index = Number(action.index);

  switch (action.type) {

    case types.LIST_ADD:
      return [...state, {
        name: action.name
      }];

    case types.LIST_REMOVE:
      newState.splice(index, 1);
      return newState;

    case types.LIST_MODIFY:
      newState[index] = {
        name: action.name
      };
      return newState;

    case types.LIST_UP:
      return swap(state, index - 1, index);

    case types.LIST_DOWN:
      return swap(state, index, index + 1);

    default:
      return state;
  }
};
