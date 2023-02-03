import React, { useEffect } from "react";

export const ShowFoundProducts = ({ products }) => {
  useEffect(() => {}, [products]);

  return (
    <ul
      style={{
        paddingInlineStart: 0,
      }}
    >
      {products ? (
        products.map((product) => {
          return (
            <button
              key={product.id}
              style={{
                display: "flex",
                width: "60%",
                alignItems: "center",
                fontFamily: "verdana",
                border: "1px solid #555",
                padding: "1rem",
                margin: ".5rem auto",
                backgroundColor: "transparent",
                color: "#ddd",
                justifyContent: "space-between",
              }}
            >
              <h6>{`Id: ${product.id}`}</h6>
              <h5>{`${product.name}`}</h5>
              <h6>{`Precio: $${product.price}`}</h6>
            </button>
          );
        })
      ) : (
        // <h3>No se encontraron productos.</h3>
        <></>
      )}
    </ul>
  );
};
