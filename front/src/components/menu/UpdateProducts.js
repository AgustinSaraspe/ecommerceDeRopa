import React, { useEffect, useState } from "react";
import { Alert, Modal, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  postProduct,
  updateProduct,
} from "../../redux/actions/actions";
import { Box } from "@mui/system";
import "../../style/modal.css";
import "../../style/dashboard.css";

export const UpdateProduct = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  const [productsFound, setProductsFound] = useState(null);

  const [input, setInput] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });
  const [search, setSearch] = useState("");

  const formStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const clearInputs = (e) => {
    //FUNCION PARA BORRAR CONTENIDO DE LOS INPUTS

    setInput({
      name: "",
      price: "",
      stock: "",
      description: "",
    });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search.length) {
      return;
    }
    console.log(search);
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
    } else {
      setProductsFound(products);
    }
  }, [search]);

  return (
    <div>
      <div className="productMenu" style={formStyle}>
        <h2>Editar Productos</h2>
        <div className="updateProducts">
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

// ─▄▄▀▀█▀▀▄▄
// ▐▄▌─▀─▀─▐▄▌
// ──█─▄▄▄─█──▄▄
// ──▄█▄▄▄█▄─▐──▌
// ▄█▀█████▐▌─▀─▐
// ▀─▄██▀██▀█▀▄▄▀

const ShowFoundProducts = ({ products }) => {
  useEffect(() => {}, [products]);
  const [selection, setSelection] = useState(null);

  return (
    <div>
      <ul className="productWrapper">
        {products ? (
          products.map((product) => {
            return (
              <button
                key={product.id}
                className="updateProductList"
                onClick={() => setSelection(product)}
              >
                <h6>{`Id: ${product.id}`}</h6>
                <div className="productListImage">
                  <img src={product.file} />
                </div>
                <h5>{`${product.name}`}</h5>
                <h6>{`Precio: $${product.price}`}</h6>
                <h6>{`${product.stock}`}</h6>
                <i className="fa-solid fa-pencil"></i>
              </button>
            );
          })
        ) : (
          // <h3>No se encontraron productos.</h3>
          <></>
        )}
      </ul>
      {selection ? (
        <UpdateForm product={selection} setter={setSelection} />
      ) : (
        <></>
      )}
    </div>
  );
};

//
// ░░░░░▄░░░░░░█▄█░░░░░
// ░░░▄▀░░░░░▄▄██▀░░░░░
// ░░░▀▄░░▄██████░░░░░░
// ▒░▒░▀▄████▀█▀█▒░▒░▒▒
// ░▒░▒░▒▀██▄▒█▒█░▒░▒░░

const UpdateForm = ({ product, setter }) => {
  // const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    margin: "2rem 20%",
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.name && input.price && input.stock) {
      //AQUI PODRIAMOS MANEJAR UN POSIBLE ERROR EN EL BACKEND
      console.log("successfull");
      dispatch(updateProduct(input, product.id));
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

  // SNACKBARS
  const [severity, setSeverity] = useState("success");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const messages = {
    success: "El producto se modificó con exito!",
    error: "El producto no se pudo modificar!",
    errorInput: "Por favor rellene todos los campos",
  };

  const [input, setInput] = useState({
    name: product.name,
    price: product.price,
    stock: product.stock,
    description: product.description,
  });

  return (
    <>
      <Modal open={product !== undefined}>
        <Box className="modalBox">
          <h1>Modificar Producto</h1>
          <label>Nombre del producto</label>
          <input name="name" value={input.name} onChange={handleChange} />
          <label>Precio</label>
          <input name="price" value={input.price} onChange={handleChange} />
          <label>Stock</label>
          <input name="stock" value={input.stock} onChange={handleChange} />
          <label>Descripción</label>
          <input
            name="description"
            value={input.description}
            onChange={handleChange}
          />
          <button className="modalButton" onClick={handleSubmit}>
            Guardar
          </button>
          <button className="modalButton" onClick={() => setter(undefined)}>
            Cancelar
          </button>
        </Box>
      </Modal>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
