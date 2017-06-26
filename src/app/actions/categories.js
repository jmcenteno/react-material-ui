import CategoriesService from '../services/categories';

export const CATEGORIES_GET_LIST_START = 'CATEGORIES_GET_LIST_START';
export const CATEGORIES_GET_LIST_SUCCESS = 'CATEGORIES_GET_LIST_SUCCESS';
export const CATEGORIES_GET_LIST_ERROR = 'CATEGORIES_GET_LIST_ERROR';

export const CATEGORIES_GET_DETAILS_START = 'CATEGORIES_GET_DETAILS_START';
export const CATEGORIES_GET_DETAILS_SUCCESS = 'CATEGORIES_GET_DETAILS_SUCCESS';
export const CATEGORIES_GET_DETAILS_ERROR = 'CATEGORIES_GET_DETAILS_ERROR';

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

export function getCategories() {
  return function (dispatch) {

    dispatch(start(CATEGORIES_GET_LIST_START));

    return CategoriesService.getCategories()
      .then(data => dispatch(handleResponse(CATEGORIES_GET_LIST_SUCCESS, data)))
      .catch(error => dispatch(handleResponse(CATEGORIES_GET_LIST_ERROR, error)));

  };
}

export function getCategory(id) {
  return function (dispatch) {

    dispatch(start(CATEGORIES_GET_DETAILS_START));

    return CategoriesService.getCategory(id).once('value',
      (snapshot) => dispatch(handleResponse(CATEGORIES_GET_DETAILS_SUCCESS, snapshot.val())),
      (error) => dispatch(handleResponse(CATEGORIES_GET_DETAILS_ERROR, error))
    );

  };
}
