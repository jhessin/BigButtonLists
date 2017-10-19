import { combineReducers } from 'redux';

import lists from './ListsReducer';
import items from './ItemsReducer';

const reducers = combineReducers({
  lists,      // An array of lists with a .name property
  items,      // An array of items with .name and .checked properties
});

export default reducers;
