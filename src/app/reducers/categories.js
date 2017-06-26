import { Map, List } from 'immutable';

import {
  CATEGORIES_GET_LIST_START,
  CATEGORIES_GET_LIST_SUCCESS,
  CATEGORIES_GET_LIST_ERROR
} from '../actions/categories';

const initialState = Map({
  data: List()
});

const actionsMap = {

  [CATEGORIES_GET_LIST_START]: (state) => {
    return state.merge({
      data: List()
    });
  },

  [CATEGORIES_GET_LIST_SUCCESS]: (state, action) => {
    return state.merge({
      data: action.data,
      error: null
    });
  },

  [CATEGORIES_GET_LIST_ERROR]: (state, action) => {
    return state.merge({
      data: List(),
      error: action.data
    });
  }

};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
