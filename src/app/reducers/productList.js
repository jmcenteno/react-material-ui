import { Map, List } from 'immutable';

import {
  PRODUCTS_GET_LIST_START,
  PRODUCTS_GET_LIST_SUCCESS,
  PRODUCTS_GET_LIST_ERROR
} from '../actions/productList';

const initialState = Map({
  data: List(),
  error: null,
  loading: false
});

const actionsMap = {

  [PRODUCTS_GET_LIST_START]: (state) => {
    return state.merge({
      data: List(),
      loading: true
    });
  },

  [PRODUCTS_GET_LIST_SUCCESS]: (state, action) => {
    return state.merge({
      data: action.data,
      error: null,
      loading: false
    });
  },

  [PRODUCTS_GET_LIST_ERROR]: (state, action) => {
    return state.merge({
      data: List(),
      error: action.data,
      loading: false
    });
  }

};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
