import types from '../types';
import { swap } from './ListsReducer';

const initialState = {
  data: [],
  selection: null
};

export default (state = initialState, action) => {
  const { dispatch } = action;

  switch (action.type) {
    case types.LIST_SELECT:
      return listSelect(state, action);

    case types.LIST_ADD:
      return listAdd(state, action);

    case types.ITEM_ADD:
      return itemAdd(state, action);

    case types.LIST_REMOVE:
      return listRemove(state, action);

    case types.ITEM_REMOVE:
      return itemRemove(state, action);

    case types.ITEM_MODIFY:
      return itemModify(state, action);

    case types.LIST_UP:
      return listUp(state, action);

    case types.ITEM_UP:
      return itemUp(state, action);

    case types.LIST_DOWN:
      return listDown(state, action);

    case types.ITEM_DOWN:
      return itemDown(state, action);

    default:
      return state;
  }
};

function listSelect(state, action) {
  const index = Number(action.index);
  const newState = { ...state };
  newState.selection = index;
  return newState;
}

function listAdd(state, action) {
  const newState = { ...state };
  const index = Number(action.index);
  newState.data[index] = [];
  return newState;
}

function itemAdd(state, action) {
  const { selection, data } = state;
  const { name } = action;
  const newState = { ...state };
  newState.data[selection] = [...data, {
    name,
    checked: false
  }];
  return newState;
}

function listRemove(state, action) {
  const index = Number(action.index);
  const newState = { ...state };
  newState.data.splice(index, 1);
  return newState;
}

function itemRemove(state, action) {
  if (state.selection === null) {
    return state;
  }

  const index = Number(action.index);
  const { selection } = state;
  const newState = { ...state };
  newState.data[selection].splice(index, 1);
  return newState;
}

function itemModify(state, action) {
  if (state.selection === null) {
    return state;
  }

  const index = Number(action.index);
  const { selection } = state;
  const { name, checked } = action;
  const newState = { ...state };
  newState.data[selection][index] = {
    name,
    checked
  };
  return newState;
}

function listUp(state, action) {
  const index = Number(action.index);
  return swap(state.data, index - 1, index);
}

function itemUp(state, action) {
  if (state.selection === null) {
    return state;
  }

  const { selection } = state;
  const index = Number(action.index);
  return swap(state.data[selection], index - 1, index);
}

function listDown(state, action) {
  const index = Number(action.index);
  return swap(state.data, index, index + 1);
}

function itemDown(state, action) {
  if (state.selection === null) {
    return state;
  }

  const { selection } = state;
  const index = Number(action.index);
  return swap(state.data[selection], index, index + 1);
}
