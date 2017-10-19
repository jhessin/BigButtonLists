import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

export types from './types';

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

export default store;
