import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_START,
  PRODUCT_LIST_FAILED,
} from '../actions/types/products';

const initialState = {
  loading: false,
  availableProducts: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_START:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        availableProducts: action.payload,
        loading: false,
      };
    case PRODUCT_LIST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
  }
  return state;
};
