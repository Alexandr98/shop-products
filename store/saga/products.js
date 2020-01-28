import axios from 'axios';
import {put, call} from 'redux-saga/effects';

import * as actionTypes from '../actions/types/products';

export function* createProductSaga(action) {
  yield put({type: actionTypes.CREATE_PRODUCT_START});

  const url = 'https://products-shop-97858.firebaseio.com/products.json';
  try {
    yield axios.post(url, action.payload);
    yield call(getProductsListSaga);
  } catch (error) {
    yield put({
      type: actionTypes.CREATE_PRODUCT_FAILED,
      payload: {error},
    });
  }
}

export function* getProductsListSaga() {
  yield put({type: actionTypes.PRODUCT_LIST_START});

  const url = 'https://products-shop-97858.firebaseio.com/products.json';
  try {
    const {data} = yield axios.get(url);
    const products = [];

    for (const key in data) {
      products.push({id: key, ...data[key]});
    }

    yield put({
      type: actionTypes.PRODUCT_LIST_SUCCESS,
      payload: products,
    });
  } catch (error) {
    yield put({
      type: actionTypes.PRODUCT_LIST_FAILED,
      payload: {error},
    });
  }
}

export function* updateProductSaga(action) {
  yield put({type: actionTypes.UPDATE_PRODUCT_START});
  const {id, title, description, imageUrl, price} = action.payload;

  const url = `https://products-shop-97858.firebaseio.com/products/${id}.json`;
  try {
    const {data} = yield axios.patch(url, {
      title,
      description,
      imageUrl,
      price,
    });
    yield put({
      type: actionTypes.UPDATE_PRODUCT_SUCCESS,
      payload: {data},
    });
    yield call(getProductsListSaga);
  } catch (error) {
    yield put({
      type: actionTypes.UPDATE_PRODUCT_FAILED,
      payload: {error},
    });
  }
}

export function* deleteProductSaga(action) {
  yield put({type: actionTypes.DELETE_PRODUCT_START});

  const url = `https://products-shop-97858.firebaseio.com/products/${
    action.payload
  }.json`;
  try {
    yield axios.delete(url);
    yield put({
      type: actionTypes.DELETE_PRODUCT_SUCCESS,
    });
    yield call(getProductsListSaga);
  } catch (error) {
    yield put({
      type: actionTypes.DELETE_PRODUCT_FAILED,
      payload: {error},
    });
  }
}
