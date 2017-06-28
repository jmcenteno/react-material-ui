import store from 'store2';

const cart = store.namespace('cart');

export const CART_GET_ITEMS = 'CART_ADD_ITEM';
export const CART_ADD_ITEM = 'CART_ADD_ITEM';
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM';

export function getItems() {
  return function (dispatch, getState) {

    dispatch({
      type: CART_GET_ITEMS,
      data: getState().cart
    });

  };
}

export function addCartItem(product, qty) {
  return function (dispatch, getState) {

    const items = getState().cart.get('items').toJS();

    items.push({
      product,
      qty
    });

    cart.session('items', items);

    dispatch({
      type: CART_ADD_ITEM,
      data: items
    });

  };
}

export function removeCartItem(index) {
  return function (dispatch, getState) {

    const items = getState().cart.get('items').toJS();

    items.splice(index, 1);

    cart.session('items', items);

    dispatch({
      type: CART_REMOVE_ITEM,
      data: items
    });

  };
}
