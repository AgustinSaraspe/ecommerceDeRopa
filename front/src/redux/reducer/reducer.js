import {
    POST_USER
} from "../actions/actions";



const initialState = {
  user:{},
  cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
};


const reducer = (state = initialState, {type, payload})=>{
    switch(type){
      case POST_USER: 
         return{
            ...state,
           user: payload
        };
      case ADD_CART:
        return {
          ...state,
          cart: [...state.cart, payload]
       };
      default: return state
    };
};


export default reducer;