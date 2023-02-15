import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../redux/actions/actions";
import { useLocalStorage } from "../useLocalStorage/useLocalStorage";
import axios from "axios";


function Cart() {

  const user = useSelector((state)=>state.user);
  const cart = useSelector(state => state.cart);
  const userCarts = useSelector((state)=>state.userCart);
  const [cartLocalStore, setCartLocalStore] = useLocalStorage("cart", "");
  const dispatch = useDispatch();

  let priceTotal = cart?.reduce((acc, curr) => {
    return Number(acc) + Number(curr.price)*Number(curr.cantidad)
  }, 0);

 
  let lastCart = userCarts[userCarts.length - 1]?.id;

  console.log("lastCart", lastCart)

  const handleDeleteCart = (event, id) =>{
    event.preventDefault();
    let newCart = cart.filter((e) => e.id !== id);
    console.log(newCart)
    
    setCartLocalStore(newCart);
    dispatch(updateCart(newCart))
  }
  
  const handlePayment = async ( ) =>{
    try{
      await axios.post("http://localhost:3001/mercadopago/payment",{
       cartId: lastCart,
       userId: user.id,
       cartItems: cart
      })
      .then((res)=> window.location.href = res.data.response.body.init_point);

    } catch(error){
      console.log(error.message)
    }
  }

  console.log("user",cart)


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
        <button onClick={()=> handlePayment()}>Comprar</button>
    </div>
  );
}

export default Cart;
