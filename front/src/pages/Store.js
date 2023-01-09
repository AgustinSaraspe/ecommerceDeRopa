import React from "react";
import { useNavigate } from "react-router";
import Products from "../components/Products";

function Store() {
  let navigate = useNavigate();

  return (
    <div>
      <h1>Store</h1>
      <h2>Products</h2>
      <div
        className="wrapper"
        style={{
          backgroundColor: "#111",
          color: "white",
        }}
      >
        <Products />
      </div>
    </div>
  );
}

export default Store;
