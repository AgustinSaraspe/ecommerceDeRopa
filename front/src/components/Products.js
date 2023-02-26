import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../style/products.css";

import { useLocalStorage } from "../useLocalStorage/useLocalStorage";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { SkeletonItem } from "../utils/Skeleton";
import {
  getAllProducts,
  addProductCart,
  getCart,
} from "../redux/actions/actions.js";

function Products() {
  //redux
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [cartLocalStore, setCartLocalStore] = useLocalStorage("cart", "");

  const handleClick = (e, product) => {
    e.preventDefault();

    let existe = false;
    let cantidadActual = 0;

    if (cart.length) {
      for (let item of cart) {
        if (item.id === product.id) {
          existe = true;
          cantidadActual = item.cantidad;
        }
      }

      if (existe) {
        console.log("cantidad", cantidadActual);

        let newProduct = {
          ...product,
          cantidad: cantidadActual + 1,
        };

        cart.map((e) => {
          if (e.id === newProduct.id) {
            e.cantidad = cantidadActual + 1;
          }
        });
           
        setCartLocalStore(cart)

      } else {
        let newProduct = {
          ...product,
          cantidad: 1,
        };
        
        setCartLocalStore(cart)
        dispatch(addProductCart(addProductCart(newProduct)));
      }
    } else {
      let newProduct = {
        ...product,
        cantidad: 1,
      };

      setCartLocalStore(cart)
      dispatch(addProductCart(addProductCart(newProduct)));
    }
  };

  console.log("CART: ", cartLocalStore);
  console.log("cart", cart);


  //Uso dos useffect para que no se haga un infinite loop
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length) {
      setLoading(false);
    }
  }, [products]);

  useEffect(() => {
    if (cart) {
    }
  }, [cartLocalStore]);

  return (
    <div
      style={
        loading
          ? {
              margin: ".5rem",
              backgroundColor: "#111111ee",
            }
          : {
              backgroundColor: "#111111ee",
              margin: ".5rem",
              display: "grid",
              gridTemplateColumns: "repeat(4,minmax(200px, 1fr))",
            }
      }
    >
      {!loading ? (
        products.map((product) => {
          return (
            <Card
              sx={{
                maxWidth: 320,
                margin: "1rem",
                backgroundColor: "#111",
                border: "1px solid #ddd",
                color: "#fff",
                cursor: "pointer",
              }}
              key={product.id}
            >
              <CardMedia
                sx={{ height: 220 }}
                image={product.file}
                title={product.name}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    fontFamily: "verdana",
                  }}
                >
                  {product.name}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{
                    color: "#ddd",
                    fontWeight: "light",
                  }}
                >
                  ${product.price}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{
                    color: "#ddd",
                    fontWeight: "light",
                  }}
                >
                  Cantidad restante: {product.stock}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#ddd",
                    fontWeight: "light",
                  }}
                >
                  {product.description}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                }}
              >
                <button
                  className="buyProductBtn"
                  // onClick={handleBuy}
                >
                  Comprar
                </button>
                <button
                  className="cartProductBtn"
                  onClick={(e) => {
                    handleClick(e, product);
                  }}
                >
                  <i class="fa-solid fa-cart-plus"></i>
                </button>
              </CardActions>
            </Card>
          );
        })
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
        </div>
      )}
    </div>
  );
}

export default Products;
