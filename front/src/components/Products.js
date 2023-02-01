import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useLocalStorage } from "../useLocalStorage/useLocalStorage";


//Redux
import { useSelector, useDispatch } from "react-redux";
import { SkeletonItem } from "../utils/Skeleton";
import { getAllProducts, addProductCart } from "../redux/actions/actions.js";

function Products() {
  //redux
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  

  const [cartLocalStore, setCartLocalStore] = useLocalStorage("cart", "");
   
  const hadleClick = (e, product) =>{
    e.preventDefault();
      
    let existe = false;
    let cantidadActual = 0; 

    if(cart.length){
  
      for(let item of cart){
            if(item.id === product.id){
              existe = true;
              cantidadActual = item.cantidad;
            }
      }

      if(existe){
       console.log("cantidad", cantidadActual)

       let newProduct = {
          ...product,
          cantidad: cantidadActual + 1 
        }
         
         cart.map((e)=>{
          if(e.id === newProduct.id){
            e.cantidad = cantidadActual + 1;
          }
         })
          
         setCartLocalStore(cart);
      }else{
       let newProduct = {
          ...product,
          cantidad: 1
        }
        dispatch(addProductCart(addProductCart(newProduct)))
      }

    }else{

      let newProduct = {
        ...product,
        cantidad: 1
      }
  
      dispatch(addProductCart(addProductCart(newProduct)))
    }

  }
  
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

  console.log("producst",products);


  useEffect(()=>{
    if(cart){
      console.log("cart", cart)
      setCartLocalStore(cart);
    }
  },[cart])


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
              backgroundColor: "transparent",
              border: "1px solid #ddd",
            }}
          >
            <CardMedia sx={{ height: 140 }} image={""} title={product.name} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                justifyContent: "center",
              }}
            >
              <Button
                size="medium"
                sx={{
                  fontWeight: "bold",
                  border: "2px solid",
                }}
              >
                Comprar
              </Button>
              <Button
                size="small"
                sx={{}}
                onClick={(e) => {
                  hadleClick(e,product)
                }}
              >
                Agregar al carrito
              </Button>
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