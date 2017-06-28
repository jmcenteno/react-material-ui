import ProductsService from '../services/products';
import ReviewsService from '../services/reviews';

export const PRODUCTS_GET_DETAILS_START = 'PRODUCTS_GET_DETAILS_START';
export const PRODUCTS_GET_DETAILS_SUCCESS = 'PRODUCTS_GET_DETAILS_SUCCESS';
export const PRODUCTS_GET_DETAILS_ERROR = 'PRODUCTS_GET_DETAILS_ERROR';
export const PRODUCT_DETAILS_REVIEWS = 'PRODUCT_DETAILS_REVIEWS';

export function start(type) {
  return {
    type
  };
}

export function handleResponse(type, data) {
  return {
    type,
    data
  };
}

export function getProductDetails(category, id) {
  return function (dispatch) {

    dispatch(start(PRODUCTS_GET_DETAILS_START));

    ProductsService.getProductDetails(category, id)
      .then(data => dispatch(handleResponse(PRODUCTS_GET_DETAILS_SUCCESS, data)))
      .catch(error => dispatch(handleResponse(PRODUCTS_GET_DETAILS_ERROR, error)));

  };
}

export function createReview(productKey, review) {
  return function (dispatch) {

    return ReviewsService.createReview(productKey, review)
      .then(data => dispatch(handleResponse(PRODUCT_DETAILS_REVIEWS, data)))
      .catch(() => dispatch(handleResponse(PRODUCT_DETAILS_REVIEWS, [])));

  };
}
