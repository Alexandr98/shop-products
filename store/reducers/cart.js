import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/types/cart';
import {ADD_ORDER} from '../actions/types/orders';
import {DELETE_PRODUCT} from '../actions/types/products';
import Cart from '../../models/cart';

const initialState = {
  items: {},
  total: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.payload;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new Cart(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice,
        );
      } else {
        updatedOrNewCartItem = new Cart(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: {...state.items, [addedProduct.id]: updatedOrNewCartItem},
        total: state.total + prodPrice,
      };

    case REMOVE_FROM_CART:
      const selectedCart = state.items[action.payload];
      const currentQty = state.items[action.payload].quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        const updatedCartItem = new Cart(
          selectedCart.quantity - 1,
          selectedCart.productPrice,
          selectedCart.productTitle,
          selectedCart.sum - selectedCart.productPrice,
        );

        updatedCartItems = {...state.items, [action.payload]: updatedCartItem};
      } else {
        updatedCartItems = {...state.items};
        delete updatedCartItems[action.payload];
      }
      return {
        ...state,
        items: updatedCartItems,
        total: state.total - selectedCart.productPrice,
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.payload]) {
        return state;
      }
      const updatedItems = {...state.items};
      const itemTotal = state.items[action.payload].sum;
      delete updatedItems[action.payload];
      return {
        ...state,
        items: updatedItems,
        total: state.total - itemTotal,
      };
  }
  return state;
};
