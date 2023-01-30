import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getAllProducts } from "../redux/actions/actions.js";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { SkeletonItem } from "../utils/Skeleton";

function Products() {
  //redux
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  //Uso dos useffect para que no se haga un infinite loop
  useEffect(() => {
    dispatch(getAllProducts());
  }, [products]);
  console.log(products);

  return (
    <div
      style={{
        margin: ".5rem",
        backgroundColor: "#111111ee",
      }}
    >
      {products.length ? (
        products.map((product) => {
          return (
            <div style={{}}>
              <Card
                sx={{
                  maxWidth: 320,
                  margin: "1rem",
                  boxShadow: "3px 5px 1rem #DDD",
                }}
              >
                <CardMedia
                  sx={{ height: 140 }}
                  image={""}
                  title={product.name}
                />
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
                    size="small"
                    sx={{
                      fontWeight: "bold",
                      border: "2px solid",
                    }}
                  >
                    Comprar
                  </Button>
                  <Button size="small">Añadir al carrito</Button>
                </CardActions>
              </Card>
            </div>
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
