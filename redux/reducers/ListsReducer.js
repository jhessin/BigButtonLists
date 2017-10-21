import types from '../types';

const initialState = [];

export function swap(arr, x, y) {
  const newArr = [...arr];

  newArr[x] = arr[y];
  newArr[y] = arr[x];

  return newArr;
}

export default (state = initialState, action) => {
  const { dispatch } = action;

  switch (action.type) {

    case types.LIST_ADD:
      return listAdd(state, action);

    case types.LIST_REMOVE:
      return listRemove(state, action);

    case types.LIST_MODIFY:
      return listModify(state, action);

    case types.LIST_UP:
      return listUp(state, action);

    case types.LIST_DOWN:
      return listDown(state, action);

    default:
      return state;
  }
};

function listAdd(state, action) {
  const { name } = action;

  return [...state, {
    name
  }];
}

function listRemove(state, action) {
  const index = Number(action.index);
  const newState = [...state];
  newState.splice(index, 1);
  return newState;
}

function listModify(state, action) {
  const newState = [...state];
  const index = Number(action.index);
  const { name } = action;
  newState[index] = {
    name
  };
  return newState;
}

function listUp(state, action) {
  const index = Number(action.index);
  return swap(state, index - 1, index);
}

function listDown(state, action) {
  const index = Number(action.index);
  return swap(state, index, index + 1);
}
