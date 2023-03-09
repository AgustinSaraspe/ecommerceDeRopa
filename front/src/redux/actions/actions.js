import axios from "axios";
import User from "../../pages/User";
export const types = {
  POST_USER: "POST_USER",
  ADD_CART: "ADD_CART",
  REMOVE_CART: "REMOVE_CART",
  GET_USER: "GET_USER",
  GET_ALL_USERS: "GET_ALL_USERS",
  LOGIN_USER: "LOGIN_USER",
  LOGOUT_USER: "LOGOUT_USER",
  UPDATE_USER: "UPDATE_USER",
  DELETE_USER: "DELETE_USER",
  GET_ALL_PRODUCTS: "GET_ALL_PRODUCTS",
  GET_PRODUCT: "GET_PRODUCT",
  POST_PRODUCT: "POST_PRODUCT",
  UPDATE_PRODUCT: "UPDATE_PRODUCT",
  DELETE_PRODUCT: "DELETE_PRODUCT",
  POST_PICTURE: "POST_PICTURE",
  UPDATE_CART: "UPDATE_CART",
  GET_USER_CART: "GET_USER_CART",
  POST_CART: "POST_CART",
  LOAD_USER: "LOAD_USER",
  GET_DETAIL: "GET_DETAIL",
  GET_VOUCHER: "GET_VOUCHER",
  GET_ALL_VOUCHERS: "GET_ALL_VOUCHERS",
};

//User
export const userLoad = (user) => {
  return async function (dispatch) {
    return dispatch({
      type: types.LOAD_USER,
      payload: user,
    });
  };
};

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

export const updateUser = (input, id) => {
  return async function (dispatch) {
    const user = await axios.put(`http://localhost:3001/users/${id}`, input);
    return dispatch({
      type: types.UPDATE_USER,
      payload: user.data,
    });
  };
};

export const deleteUser = (id) => {
  return async function (dispatch) {
    const user = await axios.delete(`http://localhost:3001/users/${id}`);
    return dispatch({
      type: types.DELETE_USER,
      payload: user.data,
    });
  };
};

//Cart
export const addProductCart = (product) => {
  return { type: types.ADD_CART, payload: product };
};

export const removeAllCart = () => {
  return { type: types.REMOVE_CART };
};

export const updateCart = (value) => {
  return async function (dispatch) {
    return dispatch({
      type: types.UPDATE_CART,
      payload: value,
    });
  };
};

export const postCart = (id, totalPrice) => {
  return async function (dispatch) {
    let values = {
      idUser: id,
      totalPrice: totalPrice,
    };
    const cart = await axios.post("http://localhost:3001/cart", values);
    return dispatch({
      type: types.POST_CART,
    });
  };
};

export const getUserCart = (id) => {
  return async function (dispatch) {
    const userCart = await axios.get(`http://localhost:3001/cart/${id}`);
    return dispatch({ type: types.GET_USER_CART, payload: userCart.data });
  };
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

export const postPicture = (values) => {
  return async function (dispatch) {
    const picture = await axios.post("http://localhost:3001/picture", values);
    return dispatch({
      type: types.POST_PICTURE,
    });
  };
};

// DETAIL

export const getDetail = (cartId) => {
  return async function (dispatch) {
    const userDetail = await axios.get(
      `http://localhost:3001/detail/${cartId}`
    );
    return dispatch({ type: types.GET_DETAIL, payload: userDetail.data });
  };
};

// VOUCHER

export const getVoucher = (userId) => {
  return async function (dispatch) {
    const userVoucher = await axios.get(
      `http://localhost:3001/voucher/${userId}`
    );
    return dispatch({ type: types.GET_VOUCHER, payload: userVoucher.data });
  };
};

export const getAllVouchers = () => {
  return async function (dispatch) {
    const vouchers = await axios.get("http://localhost:3001/voucher");
    return dispatch({ type: types.GET_ALL_VOUCHERS, payload: vouchers.data });
  };
};
