import React from "react";
import { useNavigate } from "react-router";
import Products from "../components/Products";
import "../style/store.css";

function Store() {
  let navigate = useNavigate();

  return (
    <div className="store-body">
      <div className="store-wrapper">
        <Products />
      </div>
    </div>
  );
}

export default Store;
