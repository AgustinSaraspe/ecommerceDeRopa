import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocalStorage } from "../useLocalStorage/useLocalStorage";
import axios from "axios";
import "../style/cart.css";
import { removeAllCart, updateCart } from "../redux/actions/actions";

function Cart() {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const userCarts = useSelector((state) => state.userCart);
  const [cartLocalStore, setCartLocalStore] = useLocalStorage("cart", "");

  const dispatch = useDispatch();

  let priceTotal = cart?.reduce((acc, curr) => {
    return Number(acc) + Number(curr.price) * Number(curr.cantidad);
  }, 0);

  let lastCart = userCarts[userCarts.length - 1]?.id;

  console.log("lastCart", lastCart);

  const handleDeleteCart = (event, id) => {
    event.preventDefault();
    let newCart = cart.filter((e) => e.id !== id);
    console.log(newCart);
    setCartLocalStore(newCart);
    window.location.reload();
    dispatch(updateCart(newCart));
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  };

  const handlePayment = async () => {
    try {
      await axios
        .post(
          "http://localhost:3001/mercadopago/payment",
          {
            cartId: lastCart,
            userId: user.id,
            cartItems: cart,
            email: user.email,
          },
          config
        )
        .then((res) => {
          const data = res.data;
          localStorage.setItem("id_payment", data.payment.id);
          window.location.href = data.payment.init_point;
          dispatch(removeAllCart());
          //ELIMINAR CARRITO DE LOCALSTORAGE
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {}, [cartLocalStore]);

  return (
    <div className="cart-container">
      <h1>Carrito</h1>
      <div className="cart-wrapper">
        <div className="cart-products-container">
          {cart?.length ? (
            cart?.map((e) => {
              return (
                <div className="cart-products" key={e.id}>
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
            <button onClick={() => handlePayment()}>Comprar Carrito</button>
            <button>Cancelar compra</button>
          </div>
        </div>
      </div>
      :<></>
    </div>
  );
}

export default Cart;
