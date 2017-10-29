import types from '../types';

const initialState = [];

function snapToState(snap) {
  const lists = [];
  snap.forEach(doc => {
    const data = doc && doc.data();
    lists.push(data);
  });
  return lists;
}

export default (state = initialState, { type, data }) => {
  switch (type) {
    case types.SET_LISTS:
      return snapToState(data);
    default:
      return state;
  }
};
