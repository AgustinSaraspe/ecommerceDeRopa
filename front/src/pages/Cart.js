import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocalStorage } from "../useLocalStorage/useLocalStorage";
import "../style/cart.css";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const [cartLocalStore, setCartLocalStore] = useLocalStorage("cart", "");

  let priceTotal = cart?.reduce((acc, curr) => {
    return Number(acc) + Number(curr.price) * Number(curr.cantidad);
  }, 0);

  const handleDeleteCart = (event, id) => {
    event.preventDefault();
    let newCart = cart.filter((e) => e.id !== id);
    console.log(newCart);
    setCartLocalStore(newCart);
    window.location.reload();
  };

  useEffect(() => {}, [cartLocalStore]);

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
    </div>
  );
}

export default Cart;
