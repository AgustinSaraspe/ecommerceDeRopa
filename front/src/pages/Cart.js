import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocalStorage } from "../useLocalStorage/useLocalStorage";

function Cart() {

  const cart = useSelector(state => state.cart);
  const [cartLocalStore, setCartLocalStore] = useLocalStorage("cart", "");

  const [newCart2, setNewCart2] = useState(JSON.parse(localStorage.getItem("cart")));


  
  const handleDeleteCart = (event, id) =>{
    event.preventDefault();
    let newCart = cart.filter((e) => e.id !== id);
    console.log(newCart)
    setCartLocalStore(newCart);
    window.location.reload();
  }
  
  useEffect(()=>{
  },[cartLocalStore])
      
 
  return (
    <div>
      {
        cart?.length ? 
        cart?.map((e)=>{
         return <div>
          <h1>{e.name}</h1> 
          <button onClick={(event)=>handleDeleteCart(event, e.id)}>X</button>
         </div>
        })
        :
        <h1>El carro esta vacio</h1>
      }
    </div>
  );
}

export default Cart;
