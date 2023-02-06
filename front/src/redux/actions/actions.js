import axios from "axios";
export const types = {
  POST_USER: "POST_USER",
  ADD_CART: "ADD_CART",
  GET_USER: "GET_USER",
  GET_ALL_USERS: "GET_ALL_USERS",
  LOGIN_USER: "LOGIN_USER",
  LOGOUT_USER: "LOGOUT_USER",
  GET_ALL_PRODUCTS: "GET_ALL_PRODUCTS",
  GET_PRODUCT: "GET_PRODUCT",
  POST_PRODUCT: "POST_PRODUCT",
  UPDATE_PRODUCT: "UPDATE_PRODUCT",
  DELETE_PRODUCT: "DELETE_PRODUCT",
};

//User
export const postUser = (input) => {
  return async function (dispatch) {
    const user = await axios.post("http://localhost:3001/users", input);
    return dispatch({
      type: types.POST_USER,
      payload: user.data,
    });
  };
};

export const loginUser = (input) => {
  return async function (dispatch) {
    const user = await axios.post("http://localhost:3001/users/logIn", input);
    return dispatch({
      type: types.LOGIN_USER,
      payload: user.data,
    });
  };
};

export const logoutUser = () => {
  return function (dispatch) {
    return dispatch({
      type: types.LOGOUT_USER,
    });
  };
};

export const getUser = (email) => {
  return async function (dispatch) {
    const user = await axios.get(`http://localhost:3001/users${email}`);
    return dispatch({ type: types.GET_USER, payload: user.data });
  };
};

export const getAllUsers = () => {
  return async function (dispatch) {
    const users = await axios.get("http://localhost:3001/users");
    return dispatch({
      type: types.GET_ALL_USERS,
      payload: users.data,
    });
  };
};

//Cart
export const addProductCart = (product) => {
  return { type: types.ADD_CART, payload: product };
};

//Product
export const getAllProducts = () => {
  return async function (dispatch) {
    const products = await axios.get("http://localhost:3001/products");
    return dispatch({
      type: types.GET_ALL_PRODUCTS,
      payload: products.data,
    });
  };
};

export const getProduct = () => {};

export const postProduct = (input) => {
  return async function (dispatch) {
    const product = await axios.post("http://localhost:3001/products", input);
    return dispatch({
      type: types.POST_PRODUCT,
      payload: product.data,
    });
  };
};

export const updateProduct = (input, id) => {
  return async function (dispatch) {
    const product = await axios.put(
      `http://localhost:3001/products/${id}`,
      input
    );
    return dispatch({
      type: types.UPDATE_PRODUCT,
      payload: product.data,
    });
  };
};

export const deleteProduct = (id) => {
  return async function (dispatch) {
    const product = await axios.delete(
      `http://localhost:3001/products/${id}`,
      id
    );
    return dispatch({
      type: types.DELETE_PRODUCT,
      payload: product.data,
    });
  };
};
