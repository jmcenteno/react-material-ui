import ProductsService from '../services/products';

export const PRODUCTS_GET_DETAILS_START = 'PRODUCTS_GET_DETAILS_START';
export const PRODUCTS_GET_DETAILS_SUCCESS = 'PRODUCTS_GET_DETAILS_SUCCESS';
export const PRODUCTS_GET_DETAILS_ERROR = 'PRODUCTS_GET_DETAILS_ERROR';

export function start() {
  return {
    type: PRODUCTS_GET_DETAILS_START
  };
}

export function handleSuccess(data) {
  return {
    type: PRODUCTS_GET_DETAILS_SUCCESS,
    data
  };
}

export function handleError(data) {
  return {
    type: PRODUCTS_GET_DETAILS_ERROR,
    data
  };
}

export function getProductDetails(category, id) {
  return function (dispatch) {

    dispatch(start());

    ProductsService.getProductDetails(category, id)
      .then(data => dispatch(handleSuccess(data)))
      .catch(error => dispatch(handleError(error)));

  };
}
