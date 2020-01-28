import * as actionTypes from '../actions/types/products';

export const getProducts = () => {
  return {
    type: actionTypes.PRODUCT_LIST,
  };
};

export const deleteProduct = productId => {
  return {type: actionTypes.DELETE_PRODUCT, payload: productId};
};

export const createProduct = (title, imageUrl, description, price) => {
  return {
    type: actionTypes.CREATE_PRODUCT,
    payload: {title, imageUrl, description, price},
  };
};

export const updateProduct = (id, title, imageUrl, description, price) => {
  return {
    type: actionTypes.UPDATE_PRODUCT,
    payload: {id, title, imageUrl, description, price},
  };
};
