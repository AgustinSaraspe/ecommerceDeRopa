import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocalStorage } from "../useLocalStorage/useLocalStorage";
import axios from "axios";
import "../style/cart.css";

function Cart() {

  const user = useSelector((state)=>state.user);
  const cart = useSelector(state => state.cart);
  const userCarts = useSelector((state)=>state.userCart);
  const [cartLocalStore, setCartLocalStore] = useLocalStorage("cart", "");

  let priceTotal = cart?.reduce((acc, curr) => {
    return Number(acc) + Number(curr.price) * Number(curr.cantidad);
  }, 0);
 
  let lastCart = userCarts[userCarts.length - 1]?.id;

  console.log("lastCart", lastCart)

  const handleDeleteCart = (event, id) =>{
    event.preventDefault();
    let newCart = cart.filter((e) => e.id !== id);
    console.log(newCart);
    setCartLocalStore(newCart);
    window.location.reload();
  };

  useEffect(() => {}, [cartLocalStore]);
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


  return (
    <div className="cart-container">
      <h1>Carrito</h1>
      <div>
        <div className="cart-products-container">
          {cart?.length ? (
            cart?.map((e) => {
              return (
                <div className="cart-products">
                  <div className="cart-product-img">
                    <img src={e.file} alt={e.name} />
                  </div>
                  <h2>{e.name}</h2>
                  <h4>cantidad: {e.cantidad}</h4>
                  <h3>${e.price}</h3>
                  <button onClick={(event) => handleDeleteCart(event, e.id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              );
            })
          ) : (
            <h1>El carro esta vacio</h1>
          )}
        </div>
        <div className="cart-menu">
          <h3>Total carrito</h3>
          <h4>${priceTotal}</h4>
          <div>
            <button>Comprar Carrito</button>
            <button>Cancelar compra</button>
          </div>
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
