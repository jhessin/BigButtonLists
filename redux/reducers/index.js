import { combineReducers } from 'redux';

import lists from './ListsReducer';
import items from './ItemsReducer';
import user from './UserReducer';

const reducers = combineReducers({
  lists,      // An array of lists with a .name property
  items,      // An object with two properties:
              // data: an array of arrays of items with
              // .name and .checked properties
              // selection: an integer indicating the selected list or null.
  user
});

export default reducers;
