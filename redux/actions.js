import types from './types';

export const AuthListen = (nav, inScreen, outScreen) => {
  return {
    type: types.AUTH_LISTEN,
    nav,
    inScreen,
    outScreen
  };
};
export const AuthCreate = (email, pass) => {
  return {
    type: types.AUTH_CREATE,
    email,
    pass
  };
};
export const AuthLogin = (uname, pass) => {
  return {
    type: types.AUTH_LOGIN,
    uname,
    pass
  };
};
export const AuthLogout = () => {
  return {
    type: types.AUTH_LOGOUT
  };
};
export const AddList = (name = '') => {
  return {
    type: types.LIST_ADD,
    name
  };
};
export const RemoveList = index => {
  return {
    type: types.LIST_REMOVE,
    index
  };
};
export const UpdateList = (index, name) => {
  return {
    type: types.LIST_MODIFY,
    index,
    name
  };
};
export const ListUp = index => {
  return {
    type: types.LIST_UP,
    index
  };
};
export const ListDown = index => {
  return {
    type: types.LIST_DOWN,
    index
  };
};
export const SelectList = index => {
  return {
    type: types.LIST_SELECT,
    index
  };
};
export const AddItem = (name = '') => {
  return {
    type: types.ITEM_ADD,
    name
  };
};
export const RemoveItem = index => {
  return {
    type: types.ITEM_REMOVE,
    index
  };
};
export const UpdateItem = (index, name, checked) => {
  return {
    type: types.ITEM_MODIFY,
    index,
    name,
    checked
  };
};
export const ItemUp = index => {
  return {
    type: types.ITEM_UP,
    index
  };
};
export const ItemDown = index => {
  return {
    type: types.ITEM_DOWN,
    index
  };
};
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
