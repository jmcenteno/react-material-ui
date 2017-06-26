import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducers';

let store;
const isProduction = process.env.NODE_ENV === 'production';
const middleware = [thunk];

if (!isProduction) {
  middleware.push(logger);
}

function isStoreInitialized() {

  if (!store) {
    return false;
  }

  return true;

}

export function configureStore() {

  store = createStore(rootReducer, applyMiddleware(...middleware));

  return store;

}

export function dispatch(action) {

  if (!isStoreInitialized()) {
    return null;
  }

  return store.dispatch(action);

}

export function getState() {

  if (!isStoreInitialized()) {
    return null;
  }

  return store.getState();

}
