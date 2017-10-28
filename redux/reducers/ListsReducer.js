import types from '../types';

const initialState = [];

export function swap(arr, x, y) {
  const newArr = [...arr];

  newArr[x] = arr[y];
  newArr[y] = arr[x];

  return newArr;
}

export default (state = initialState, { type, data }) => {
  switch (type) {
    case types.SET_LISTS:
      console.log(JSON.stringify(data));
      return state;
    default:
      return state;
  }
};
