import { Map, List } from 'immutable';

import {
  CART_GET_ITEMS,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM
} from '../actions/cart';

const initialState = Map({
  items: List()
});

const actionsMap = {

  [CART_GET_ITEMS]: (state, action) => {
    return state.merge({
      items: action.data
    });
  },

  [CART_ADD_ITEM]: (state, action) => {
    return state.merge({
      items: action.data
    });
  },

  [CART_REMOVE_ITEM]: (state, action) => {
    return state.merge({
      items: action.data
    });
  }

};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
