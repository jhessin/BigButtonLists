import types from './types';

export const AddList = (dispatch, name = '') => {
  dispatch({
    dispatch,
    type: types.LIST_ADD,
    name
  });
};

export const RemoveList = (dispatch, index) => {
  dispatch({
    dispatch,
    type: types.LIST_REMOVE,
    index
  });
};

export const UpdateList = (dispatch, index, name) => {
  dispatch({
    dispatch,
    type: types.LIST_MODIFY,
    index,
    name
  });
};

export const ListUp = (dispatch, index) => {
  dispatch({
    dispatch,
    type: types.LIST_UP,
    index
  });
};

export const ListDown = (dispatch, index) => {
  dispatch({
    dispatch,
    type: types.LIST_DOWN,
    index
  });
};

export const SelectList = (dispatch, index) => {
  dispatch({
    dispatch,
    type: types.LIST_SELECT,
    index
  });
};

export const AddItem = (dispatch, name = '') => {
  dispatch({
    dispatch,
    type: types.ITEM_ADD,
    name
  });
};

export const RemoveItem = (dispatch, index) => {
  dispatch({
    dispatch,
    type: types.ITEM_REMOVE,
    index
  });
};

export const UpdateItem = (dispatch, index, name, checked) => {
  dispatch({
    dispatch,
    type: types.ITEM_MODIFY,
    index,
    name,
    checked
  });
};

export const ItemUp = (dispatch, index) => {
  dispatch({
    dispatch,
    type: types.ITEM_UP,
    index
  });
};

export const ItemDown = (dispatch, index) => {
  dispatch({
    dispatch,
    type: types.ITEM_DOWN,
    index
  });
};
