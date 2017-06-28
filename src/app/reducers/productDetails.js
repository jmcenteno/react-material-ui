import { Map, List } from 'immutable';

import {
  PRODUCTS_GET_DETAILS_START,
  PRODUCTS_GET_DETAILS_SUCCESS,
  PRODUCTS_GET_DETAILS_ERROR,
  PRODUCT_DETAILS_REVIEWS
} from '../actions/productDetails';

const initialState = Map({
  product: Map(),
  reviews: List(),
  error: null,
  loading: false
});

const actionsMap = {

  [PRODUCTS_GET_DETAILS_START]: (state) => {
    return state.merge({
      product: Map(),
      loading: true
    });
  },

  [PRODUCTS_GET_DETAILS_SUCCESS]: (state, action) => {
    return state.merge({
      product: action.data,
      reviews: action.data.reviews || List(),
      error: null,
      loading: false
    });
  },

  [PRODUCTS_GET_DETAILS_ERROR]: (state, action) => {
    return state.merge({
      product: Map(),
      error: action.data,
      loading: false
    });
  },

  [PRODUCT_DETAILS_REVIEWS]: (state, action) => {
    return state.merge({
      reviews: action.data
    });
  }

};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
