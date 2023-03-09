import React, { useEffect, useState } from "react";
import { Alert, Button, Modal, Snackbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProducts,
  postProduct,
} from "../../redux/actions/actions";
import { Box } from "@mui/system";
import "../../style/dashboard.css";

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
    } else {
      setProductsFound(products);
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
          <ShowFoundProducts
            products={productsFound}
            setOpen={setOpen}
            setMessage={setMessage}
          />
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

const ShowFoundProducts = ({ products, setOpen, setMessage }) => {
  useEffect(() => {}, [products]);
  const [selection, setSelection] = useState(null);
  const dispatch = useDispatch();

  const boxStyle = {
    backgroundColor: "#111111ee",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "2px solid #bbb",
    boxShadow: 24,
    p: 10,
    display: "flex",
    flexDirection: "column",
    color: "#eee",
  };

  const deleteSelection = (product) => {
    dispatch(deleteProduct(product.id));
    setOpen(true);
    setMessage("El producto se eliminó correctamente");
    handleClose();
  };

  const handleClose = () => {
    setSelection(null);
  };

  return (
    <div>
      <ul className="productWrapper">
        {products ? (
          products.map((product) => {
            return (
              <button
                key={product.id}
                className="productList"
                onClick={() => setSelection(product)}
              >
                <h6>{`Id: ${product.id}`}</h6>
                <h5>{`${product.name}`}</h5>
                <h6>{`Precio: $${product.price}`}</h6>
                <i className="fa-solid fa-trash"></i>
              </button>
            );
          })
        ) : (
          // <h3>No se encontraron productos.</h3>
          <></>
        )}
      </ul>
      <Modal
        open={selection !== null}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle}>
          {selection ? (
            <>
              <Typography id="modal-moda-title" variant="h6" component="h2">
                ¿Desea eliminar {selection.name}?
              </Typography>
              <div
                style={{
                  display: "flex",
                  marginTop: "1rem",
                  justifyContent: "center",
                }}
              >
                <Button
                  sx={{
                    color: "white",
                  }}
                  onClick={() => deleteSelection(selection)}
                >
                  Si
                </Button>
                <Button
                  sx={{
                    color: "white",
                  }}
                  onClick={handleClose}
                >
                  No
                </Button>
              </div>
            </>
          ) : (
            <Typography id="modal-moda-title" variant="h6" component="h2">
              Cargando producto...
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};
