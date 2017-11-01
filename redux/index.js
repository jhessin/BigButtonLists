import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';

export types from './types';
export * as actions from './actions';

const store = createStore(
  reducers
);

export default store;
