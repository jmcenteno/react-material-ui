import { Map, List } from 'immutable';

import {
  REVIEWS_GET_START,
  REVIEWS_GET_SUCCESS,
  REVIEWS_GET_ERROR,
  REVIEWS_CREATE_START,
  REVIEWS_CREATE_SUCCESS,
  REVIEWS_CREATE_ERROR
} from '../actions/reviews';

const initialState = Map({
  data: List(),
  error: null,
  loading: false
});

const actionsMap = {

  [REVIEWS_GET_START]: (state) => {
    return state.merge({
      loading: true
    });
  },

  [REVIEWS_GET_SUCCESS]: (state, action) => {
    return state.merge({
      data: action.data,
      error: null,
      loading: false
    });
  },

  [REVIEWS_GET_ERROR]: (state, action) => {
    return state.merge({
      data: List(),
      error: action.data,
      loading: false
    });
  },

  [REVIEWS_CREATE_START]: (state) => {
    return state;
  },

  [REVIEWS_CREATE_SUCCESS]: (state, action) => {
    return state.merge({
      data: action.data,
      error: null,
      loading: false
    });
  },

  [REVIEWS_CREATE_ERROR]: (state, action) => {
    return state.merge({
      error: action.data,
      loading: false
    });
  }

};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
