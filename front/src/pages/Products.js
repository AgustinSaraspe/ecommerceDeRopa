import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Box, Button, Snackbar, TextField } from "@mui/material";
import "../style/products.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, postProduct } from "../redux/actions/actions";

//Redux

function Products() {
  //SNACKBARS
  const [severity, setSeverity] = useState("success");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const messages = {
    success: "El producto se agregó con exito!",
    error: "El producto no se pudo agregar!",
    errorInput: "Por favor rellene todos los campos",
  };

  const [input, setInput] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  const clearInputs = (e) => {
    //FUNCION PARA BORRAR CONTENIDO DE LOS INPUTS
    setInput({
      name: "",
      price: "",
      stock: "",
      description: "",
    });
  };

  const dispatch = useDispatch();
  const products = useSelector(getAllProducts);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    if (
      input.name.length &&
      input.price.length &&
      input.stock.length &&
      input.description.length
    ) {
      //AQUI PODRIAMOS MANEJAR UN POSIBLE ERROR EN EL BACKEND
      dispatch(postProduct(input));
      clearInputs();
      setTimeout(() => {
        setMessage(messages.success);
        setSeverity("success");
        setOpen(true);
      }, 500);
    } else {
      setTimeout(() => {
        setMessage(messages.errorInput);
        setSeverity("error");
        setOpen(true);
      }, 500);
    }
    // if (res.status >= 200 && res.status <= 300) {
    //   setSuccess(true);
    // }
    // if (res.status >= 500 && res.status <= 600) {
    //   setError(true);
    // }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="new-product-container" onSubmit={handleSubmit}>
      <div
        component="form"
        id="nuevoProducto"
        className="signup-form"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "50%",
          margin: "2rem auto",
          padding: "3rem",
          borderRadius: "5px",
          border: "1px solid #DDD",
          boxShadow: "3px 3px 10px #333",
          backgroundColor: "#111111EE",
          backdropFilter: "blur(2px)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontFamily: "Noto Sans Tangsa",
            color: "white",
            textShadow: "2px 2px 1px black",
          }}
        >
          Nuevo Producto
        </h1>
        <label>Nombre</label>
        <input name="name" onChange={handleChange} value={input.name} />
        <label>Precio</label>
        <input
          name="price"
          type="number"
          onChange={handleChange}
          value={input.price}
        />
        <label>Stock</label>
        <input
          name="stock"
          type="number"
          onChange={handleChange}
          value={input.stock}
        />
        <label>Descripcion</label>
        <input
          name="description"
          onChange={handleChange}
          value={input.description}
        />
        <button onClick={handleSubmit}>Guardar Producto</button>
        <button
          style={{
            backgroundColor: "transparent",
            width: "auto",
            border: "none",
          }}
          onClick={clearInputs}
        >
          Cancelar
        </button>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      {/* <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          El producto no se cargó correctamente!
        </Alert>
      </Snackbar> */}
    </div>
  );
}

export default Products;
