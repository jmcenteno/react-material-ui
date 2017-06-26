import { Map } from 'immutable';

import {
  PRODUCTS_GET_DETAILS_START,
  PRODUCTS_GET_DETAILS_SUCCESS,
  PRODUCTS_GET_DETAILS_ERROR
} from '../actions/productDetails';

const initialState = Map({
  data: Map(),
  error: null,
  loading: false
});

const actionsMap = {

  [PRODUCTS_GET_DETAILS_START]: (state) => {
    return state.merge({
      data: Map(),
      loading: true
    });
  },

  [PRODUCTS_GET_DETAILS_SUCCESS]: (state, action) => {
    return state.merge({
      data: action.data,
      error: null,
      loading: false
    });
  },

  [PRODUCTS_GET_DETAILS_ERROR]: (state, action) => {
    return state.merge({
      data: Map(),
      error: action.data,
      loading: false
    });
  }

};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
