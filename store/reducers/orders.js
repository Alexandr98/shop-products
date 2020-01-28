import {ADD_ORDER_SUCCESS} from '../actions/types/orders';
import {
  ORDER_LIST_START,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAILED,
} from '../actions/types/orders';

const initialState = {
  loading: false,
  orders: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.concat(action.payload),
      };
    case ORDER_LIST_START:
      return {
        ...state,
        loading: true,
      };
    case ORDER_LIST_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case ORDER_LIST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
  }
  return state;
};
