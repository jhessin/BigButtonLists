import { combineReducers } from 'redux';

import lists from './ListsReducer';
import items from './ItemsReducer';
import selection from './SelectionReducer';

const reducers = combineReducers({
  lists,
  items,
  selection
});

export default reducers;
