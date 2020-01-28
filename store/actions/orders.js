import * as actionTypes from '../actions/types/orders';

export const addOrder = (cartItems, total) => {
  return {
    type: actionTypes.ADD_ORDER,
    payload: {
      items: cartItems,
      amount: total,
    },
  };
};

export const getOrders = () => {
  return {
    type: actionTypes.ORDER_LIST,
  };
};
