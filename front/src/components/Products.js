import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Skeleton } from "@mui/material";

function Products() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get("http://localhost:3001/products");
      console.log(result.data);
      setProducts(result.data);
    };
    getData();
  }, []);

  //Uso dos useffect para que no se haga un infinite loop
  useEffect(() => {}, [products]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        margin: "1rem",
      }}
    >
      {products ? (
        products.map((product) => {
          return (
            <Card
              sx={{
                maxWidth: 320,
                margin: "1rem",
                boxShadow: "3px 5px 1rem #DDD",
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
          );
        })
      ) : (
        <div
          style={{
            maxWidth: "345px",
            margin: "0 auto",
          }}
        >
          <Skeleton variant="rectangular" width={345} height={150} />
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        </div>
      )}
    </div>
  );
}

export default Products;
