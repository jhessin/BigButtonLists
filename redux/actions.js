import types from './types';

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
