import { combineReducers } from 'redux';

import lists from './ListsReducer';
import items from './ItemsReducer';
import selection from './SelectionReducer';

const reducers = combineReducers({
  lists,      // An array of lists with a .name property
  items,      // An array of items with .name and .checked properties
  selection   // The index of a selected list or null
});

export default reducers;
