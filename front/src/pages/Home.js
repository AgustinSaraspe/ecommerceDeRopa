import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  const handleInputChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("sending data...");
    axios.post("http://localhost:3001/products", product);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        margin: "0 auto",
      }}
    >
      <h2>Cargar producto</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <input
          name="name"
          type="text"
          placeholder="Nombre"
          onChange={handleInputChange}
        />
        <input
          name="price"
          type="text"
          placeholder="Precio"
          onChange={handleInputChange}
        />
        <input
          name="stock"
          type="text"
          placeholder="Stock"
          onChange={handleInputChange}
        />
        <input
          name="description"
          type="text"
          placeholder="Descripcion"
          onChange={handleInputChange}
        />
        <input type="submit" />
      </form>
    </div>
  );
}

export default Home;
