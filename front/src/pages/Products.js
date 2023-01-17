import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Box, Button, Snackbar, TextField } from "@mui/material";

function Products() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("sending data...");
    const res = await axios.post("http://localhost:3001/products", product);
    if (res.status >= 200 && res.status <= 300) {
      setSuccess(true);
    }
    if (res.status >= 500 && res.status <= 600) {
      setError(true);
    }
    document.getElementById("nuevoProducto").reset();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
    setError(false);
  };

  return (
    <div className="body">
      <h2 style={{ fontFamily: "verdana", margin: "0 1rem", color: "#5f5f5f" }}>
        Nuevo Producto
      </h2>
      <Box
        id="nuevoProducto"
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          display: "flex",
          flexDirection: "column",
          border: "1px solid #DDD",
          margin: "1rem",
          padding: "1rem",
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          required
          id="outlined-required"
          className="textField"
          name="name"
          label="Nombre"
          onChange={handleInputChange}
        />
        <TextField
          required
          id="outlined-required"
          className="textField"
          name="price"
          label="Precio"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-number"
          className="textField"
          label="Stock"
          type="number"
          name="stock"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleInputChange}
        />
        <TextField
          required
          id="outlined-required"
          className="textField"
          name="description"
          label="Descripcion"
          onChange={handleInputChange}
        />
        <Button variant="contained" type="submit">
          Guardar Producto
        </Button>
        <Button
          variant="text"
          onClick={() => {
            document.getElementById("nuevoProducto").reset();
          }}
        >
          Cancelar
        </Button>
      </Box>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          El producto se cargó correctamente!
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          El producto no se cargó correctamente!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Products;
