import types from './types';

export const SetUser = user => {
  return {
    type: types.SET_USER,
    user
  };
};
export const SetLists = data => {
  return {
    type: types.SET_LISTS,
    data
  };
};
export const SetItems = data => {
  return {
    type: types.SET_ITEMS,
    data
  };
};
