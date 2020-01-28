import {takeEvery} from 'redux-saga/effects';
import * as productTypes from '../actions/types/products';
import * as orderTypes from '../actions/types/orders';

import {
  createProductSaga,
  getProductsListSaga,
  updateProductSaga,
  deleteProductSaga,
} from './products';
import {addOrderSaga, getOrdersListSaga} from './orders';

export default function* rootSaga() {
  // PRODUCTS
  yield takeEvery(productTypes.CREATE_PRODUCT, createProductSaga);
  yield takeEvery(productTypes.PRODUCT_LIST, getProductsListSaga);
  yield takeEvery(productTypes.UPDATE_PRODUCT, updateProductSaga);
  yield takeEvery(productTypes.DELETE_PRODUCT, deleteProductSaga);

  // ORDER
  yield takeEvery(orderTypes.ADD_ORDER, addOrderSaga);
  yield takeEvery(orderTypes.ORDER_LIST, getOrdersListSaga);
}
