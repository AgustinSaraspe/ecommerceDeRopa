import { types } from "../actions/actions";

const initialState = {
  user: {},
  users: [],
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  products: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_USER:
      return {
        ...state,
        user: payload,
      };
    case types.GET_ALL_USERS:
      return {
        ...state,
        users: payload,
      };
    case types.POST_USER:
      return {
        ...state,
        user: payload,
      };
    case types.UPDATE_PRODUCT:
      return {
        ...state,
        user: payload,
      };
    case types.LOGIN_USER:
      return {
        ...state,
        user: payload,
      };
    case types.LOGOUT_USER:
      return {
        ...state,
        user: initialState.user,
      };
    case types.ADD_CART:
      return {
        ...state,
        cart: [...state.cart, payload.payload],
      };
    case types.GET_ALL_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    case types.POST_PRODUCT:
      return {
        ...state,
        products: [...state.products, payload],
      };
    case types.UPDATE_USER:
      return {
        ...state,
        product: payload,
      };
    case types.DELETE_PRODUCT:
      return {
        ...state,
        product: payload,
      };
    case types.DELETE_USER:
      return {
        ...state,
        product: payload,
      };
    default:
      return state;
  }
};

export default reducer;
