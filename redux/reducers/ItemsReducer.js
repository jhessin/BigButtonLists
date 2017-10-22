import types from '../types';
import { swap } from './ListsReducer';

const items = [];

const initialState = {
  data: null,
  selection: null
};

const defaultItem = {
  name: '',
  checked: false
};

function getList(index) {
  if (index && items[index]) {
    return items[index];
  }

  items[index] = [];
  return items[index];
}

export default (state = initialState, action) => {
  const newState = { ...state };
  let index;

  switch (action.type) {
    case types.LIST_SELECT:
      index = Number(action.index);
      if (state.selection) {
        items[state.selection] = state.data;
      }
      newState.selection = index;
      newState.data = getList(index);
      return newState;

    case types.ITEM_ADD:
      if (newState.data) {
        newState.data = [...state.data, {
          name: action.name,
          checked: false
        }];
      }
      return newState;

    case types.ITEM_REMOVE:
      index = Number(action.index);
      newState.data.splice(index, 1);
      return newState;

    case types.ITEM_MODIFY:
      index = Number(action.index);
      newState.data = [...state.data];
      newState.data[index] = {
        name: action.name,
        checked: action.checked
      };
      return newState;

    case types.ITEM_UP:
      index = Number(action.index);
      return swap(state.data, index, index + 1);

    case types.ITEM_DOWN:
      index = Number(action.index);
      return swap(state.data, index, index + 1);

    default:
      return state;
  }
};
