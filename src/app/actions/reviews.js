import ReviewsService from '../services/reviews';

export const REVIEWS_GET_START = 'REVIEWS_GET_START';
export const REVIEWS_GET_SUCCESS = 'REVIEWS_GET_SUCCESS';
export const REVIEWS_GET_ERROR = 'REVIEWS_GET_ERROR';
export const REVIEWS_CREATE_START = 'REVIEWS_CREATE_START';
export const REVIEWS_CREATE_SUCCESS = 'REVIEWS_CREATE_SUCCESS';
export const REVIEWS_CREATE_ERROR = 'REVIEWS_CREATE_ERROR';

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

export function getReviews(product) {
  return function (dispatch) {

    dispatch(start(REVIEWS_GET_START));

    return ReviewsService.getReviews(product)
      .then(data => dispatch(handleResponse(REVIEWS_GET_SUCCESS, data)))
      .catch(error => dispatch(handleResponse(REVIEWS_GET_ERROR, error)));

  };
}

export function createReview(productKey, review) {
  return function (dispatch) {

    return ReviewsService.createReview(productKey, review)
      .then(data => dispatch(handleResponse(REVIEWS_CREATE_SUCCESS, data)))
      .catch(error => dispatch(handleResponse(REVIEWS_CREATE_ERROR, error)));

  };
}
