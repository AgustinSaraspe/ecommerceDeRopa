import React, { useEffect, useState } from "react";
import axios from "axios";

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
        gridTemplateColumns: "repeat(3,1fr)",
      }}
    >
      {products ? (
        products.map((product) => {
          return (
            <div
              className="product-card"
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                margin: "0 auto",
                justifyContent: "center",
                height: "150px",
                width: "70%",
              }}
            >
              <a>{product.name}</a>
              <h6>${product.price}</h6>
              <p>Stock: {product.stock}</p>
              <p>{product.description}</p>
              <button>Comprar</button>
              <button>Agregar al carrito</button>
            </div>
          );
        })
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
}

export default Products;
