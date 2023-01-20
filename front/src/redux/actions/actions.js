import axios from "axios";
export const POST_USER = "POST_USER";
export const LOGIN_USER = "LOGIN_USER";
export const ADD_CART = "ADD_CART";


//User
export const signUp = (input) =>{
    return async function(dispatch){
        const user = await axios.post("http://localhost:3001/users", input);
        return dispatch({
            type: POST_USER,
            payload: user.data
        });
    };
};

export const signIn = (input) =>{
    return async function(dispatch){
        const user = await axios.post("http://localhost:3001/users/singIn", input);
        return dispatch({
            type: LOGIN_USER,
            payload: user.data
        });
    };
};

//Cart
export const addProductCart = (product) => {
    return { type: ADD_CART, payload: product };
};