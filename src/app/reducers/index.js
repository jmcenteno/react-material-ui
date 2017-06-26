import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import app from './app';
import categories from './categories';
import productList from './productList';
import productDetails from './productDetails';
import reviews from './reviews';
import cart from './cart';

export default combineReducers({
  routing: routerReducer,
  app,
  categories,
  productList,
  productDetails,
  reviews,
  cart
});
