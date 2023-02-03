import React, { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, postProduct } from "../../redux/actions/actions";
import { ShowFoundProducts } from "../ShowFoundProducts";

export const DeleteProduct = () => {
  const dispatch = useDispatch();
  const formStyle = {
    display: "flex",
    flexDirection: "column",
  };
  const [input, setInput] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });
  const [search, setSearch] = useState("");

  const clearInputs = (e) => {
    //FUNCION PARA BORRAR CONTENIDO DE LOS INPUTS

    setInput({
      name: "",
      price: "",
      stock: "",
      description: "",
    });
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log("search:", search);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search.length) {
      return;
    }
    console.log(search);
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
      console.log("successfull");
      dispatch(postProduct(input));
      clearInputs();
      setTimeout(() => {
        setMessage(messages.success);
        setSeverity("success");
        setOpen(true);
      }, 500);
    } else {
      setTimeout(() => {
        console.log("error");
        setMessage(messages.errorInput);
        setSeverity("error");
        setOpen(true);
      }, 500);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  //SNACKBARS
  const [severity, setSeverity] = useState("success");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const messages = {
    success: "El producto se editó con exito!",
    error: "El producto no se pudo editar!",
    errorInput: "Por favor rellene todos los campos",
  };

  const products = useSelector((state) => state.products);
  const [productsFound, setProductsFound] = useState(null);

  useEffect(() => {
    // MOTOR DE BUSQUEDA
    dispatch(getAllProducts());
    const productFound = [];
    if (search.length) {
      products.map((product) => {
        if (product.name.toLowerCase().includes(search.toLowerCase()))
          // console.log(product.id);
          productFound.push(product);
        setProductsFound(productFound);
      });
    }
  }, [search]);

  return (
    <div>
      <div className="productMenu" style={formStyle}>
        <h2>Borrar Productos</h2>
        <div className="deleteProducts">
          <input
            placeholder="Buscar producto"
            name="search"
            value={search}
            onChange={handleSearch}
          />
          <button onClick={handleSearchSubmit} className="searchButton">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <ShowFoundProducts products={productsFound} />
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
