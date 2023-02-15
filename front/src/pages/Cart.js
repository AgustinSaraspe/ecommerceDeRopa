import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../redux/actions/actions";
import { useLocalStorage } from "../useLocalStorage/useLocalStorage";

function Cart() {

  const cart = useSelector(state => state.cart);
  const [cartLocalStore, setCartLocalStore] = useLocalStorage("cart", "");
  const dispatch = useDispatch();

  let priceTotal = cart?.reduce((acc, curr) => {
    return Number(acc) + Number(curr.price)*Number(curr.cantidad)
  }, 0);

  const handleDeleteCart = (event, id) =>{
    event.preventDefault();
    let newCart = cart.filter((e) => e.id !== id);
    console.log(newCart)
    
    setCartLocalStore(newCart);
    dispatch(updateCart(newCart))
  }
  

  useEffect(()=>{
  },[cartLocalStore])
      
 
  return (
    <div>
      {
        cart?.length ? 
        cart?.map((e)=>{
         return <div>
          <div>
           <h1>{e.name}</h1> 
           <h3>cantidad: {e.cantidad}</h3>
           <h4>precio: {e.price}</h4>
           <button onClick={(event)=>handleDeleteCart(event, e.id)}>X</button>
          </div>
          
         </div>
        })
        :
        <h1>El carro esta vacio</h1>
      }
        <h1>{`$${priceTotal}`}</h1>
    </div>
  );
}

export default Cart;
