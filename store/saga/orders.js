import axios from 'axios';
import {put} from 'redux-saga/effects';
import * as actionTypes from '../actions/types/orders';

export function* addOrderSaga(action) {
  yield put({type: actionTypes.ADD_ORDER_START});

  const {items, amount} = action.payload;
  const url = 'https://products-shop-97858.firebaseio.com/orders.json';

  try {
    const {data} = yield axios.post(url, action.payload);
    yield put({
      type: actionTypes.ADD_ORDER_SUCCESS,
      payload: {id: data.name, items, amount, date: new Date()},
    });
  } catch (error) {
    yield put({
      type: actionTypes.ADD_ORDER_FAILED,
      payload: {error},
    });
  }
}

export function* getOrdersListSaga() {
  yield put({type: actionTypes.ORDER_LIST_START});

  const url = 'https://products-shop-97858.firebaseio.com/orders.json';
  try {
    const {data} = yield axios.get(url);
    const orders = [];

    for (const key in data) {
      orders.push({id: key, ...data[key]});
    }

    yield put({
      type: actionTypes.ORDER_LIST_SUCCESS,
      payload: orders,
    });
  } catch (error) {
    yield put({
      type: actionTypes.ORDER_LIST_FAILED,
      payload: {error},
    });
  }
}

export default addOrderSaga;
