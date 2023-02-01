import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocalStorage } from "../useLocalStorage/useLocalStorage";

function Cart() {

  let cart = useSelector(state => state.cart);
  const [cartLocalStore, setCartLocalStore] = useLocalStorage("cart", "");

  const [newCart2, setNewCart2]= useState(cart);

  
  const handleDeleteCart = (id) =>{
    console.log("hola", id)
    let newCart = cart.filter((e) => e.id !== id);
   console.log(newCart)
   setCartLocalStore(newCart);
  }
  
  // console.log("newCart", newCart2);
  
  // useEffect(()=>{
  //  setCartLocalStore(newCart2);
  // },[newCart2])
      
  console.log(cart);
 
  return (
    <div>
      {
        cart.length ? 
        cart.map((e)=>{
         return <div>
          <h1>{e.name}</h1> 
          <button onClick={()=>handleDeleteCart(e.id)}>X</button>
         </div>
        })
        :
        <h1>El carro esta vacio</h1>
      }
    </div>
  );
}

export default Cart;
