import { createStore, applyMiddleware, combineReducers } from 'redux';
import CatchPromise from 'redux-catch-promise';

import reducers from './reducers';

const thunkMiddleware = CatchPromise();

export default function createClientStore(initialState) {
  const store = createStore(
    combineReducers(reducers),
    initialState,
    applyMiddleware(thunkMiddleware),
  );

  return store;
}
