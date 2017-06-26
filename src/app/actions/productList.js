import ProductsService from '../services/products';

export const PRODUCTS_GET_LIST_START = 'PRODUCTS_GET_LIST_START';
export const PRODUCTS_GET_LIST_SUCCESS = 'PRODUCTS_GET_LIST_SUCCESS';
export const PRODUCTS_GET_LIST_ERROR = 'PRODUCTS_GET_LIST_ERROR';

export function start() {
  return {
    type: PRODUCTS_GET_LIST_START
  };
}

export function handleSuccess(data) {
  return {
    type: PRODUCTS_GET_LIST_SUCCESS,
    data
  };
}

export function handleError(data) {
  return {
    type: PRODUCTS_GET_LIST_ERROR,
    data
  };
}

export function getProductList(category) {
  return function (dispatch) {

    dispatch(start());

    ProductsService.getProducts(category)
      .then(data => dispatch(handleSuccess(data)))
      .catch(error => dispatch(handleError(error)));

  };
}
