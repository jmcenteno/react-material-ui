import store from 'store2';

const cart = store.namespace('cart');

export const CART_GET_ITEMS = 'CART_GET_ITEMS';
export const CART_UPDATE = 'CART_UPDATE';

export function getItems() {
  return function (dispatch, getState) {

    dispatch({
      type: CART_GET_ITEMS,
      data: getState().cart.get('items').toJS()
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
      type: CART_UPDATE,
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
      type: CART_UPDATE,
      data: items
    });

  };
}

export function updateCart(data) {

  const cartItems = data.map(item => {
    return {
      product: item.product,
      qty: item.qty
    };
  });

  cart.session('items', cartItems);

  return {
    type: CART_UPDATE,
    data: cartItems
  };

}
