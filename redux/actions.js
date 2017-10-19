import types from './types';

export const SelectList = (index) => {
  return {
    type: types.LIST_SELECT,
    index
  };
};
