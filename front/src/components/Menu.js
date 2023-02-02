import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postProduct } from "../redux/actions/actions";
import { menuTypes } from "../utils/menuTypes";

/* -------------------------------------------------------- */
//Styles

const generalStyle = {
  display: "flex",
  flexDirection: "column",
  width: "70%",
  backgroundColor: "#222",
  color: "#fff",
  textAlign: "center",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
};

/* -------------------------------------------------------- */
//Helpers

/* -------------------------------------------------------- */
//Handlers

/* -------------------------------------------------------- */
//Componentes

const NewProduct = () => {
  const dispatch = useDispatch();

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

  return (
    <div>
      <div className="productMenu" style={formStyle}>
        <h2>Nuevo Producto</h2>
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
        <button className="dashboardButton" onClick={handleSubmit}>
          Guardar Producto
        </button>
        <button
          style={{
            backgroundColor: "transparent",
            width: "auto",
            border: "none",
            color: "white",
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
    </div>
  );
};

/* ------------------- MODIFICAR PRODUCTO -------------------- */

const UpdateProduct = () => {
  const dispatch = useDispatch();
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
          <button onClick={handleSearchSubmit}>
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
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

/* ----------------- BORRAR PRODUCTOS ------------------*/

const DeleteProduct = () => {
  const dispatch = useDispatch();
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
          <button onClick={handleSearchSubmit}>
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
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

/* -------------------- LISTAR PRODUCTOS ---------------------*/

const ListProducts = () => {
  const dispatch = useDispatch();
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

  return (
    <div>
      <div className="productMenu" style={formStyle}>
        <h2>Listar Productos</h2>
        <div className="listProducts">
          <input
            placeholder="Buscar producto"
            name="search"
            value={search}
            onChange={handleSearch}
          />
          <button onClick={handleSearchSubmit}>
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
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

/* -------------- NUEVO USUARIO --------------- */

const NewUser = () => {
  const dispatch = useDispatch();
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
  return (
    <div>
      <div className="productMenu" style={formStyle}>
        <h2>Nuevo Usuario</h2>
        <div className="newUser">
          <input
            placeholder="Buscar usuario"
            name="search"
            value={search}
            onChange={handleSearch}
          />
          <button onClick={handleSearchSubmit}>
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
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

/* -------------- EDITAR USUARIO -------------- */

const UpdateUser = () => {
  const dispatch = useDispatch();
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
  return (
    <div>
      <div className="productMenu" style={formStyle}>
        <h2>Borrar Usuarios</h2>
        <div className="deleteUsers">
          <input
            placeholder="Buscar usuario"
            name="search"
            value={search}
            onChange={handleSearch}
          />
          <button onClick={handleSearchSubmit}>
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
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

/* ------------- BORRAR USUARIOS ---------------*/

const DeleteUser = () => {
  const dispatch = useDispatch();
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
  return (
    <div>
      <div className="productMenu" style={formStyle}>
        <h2>Borrar Usuario</h2>
        <div className="deleteUsers">
          <input
            placeholder="Buscar usuario"
            name="search"
            value={search}
            onChange={handleSearch}
          />
          <button onClick={handleSearchSubmit}>
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
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

/* ------------ LISTAR USUARIOS -------------- */

const ListUsers = () => {
  const dispatch = useDispatch();
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
  return (
    <div>
      <div className="productMenu" style={formStyle}>
        <h2>Listar Usuarios</h2>
        <div className="">
          <input
            placeholder="Buscar usuario"
            name="search"
            value={search}
            onChange={handleSearch}
          />
          <button onClick={handleSearchSubmit}>
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
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

const Sales = () => {
  return (
    <div>
      <h1>SALES</h1>
    </div>
  );
};

/* -------------------------------------------------------- */
//Funcion Principal

export function Menu({ menu }) {
  switch (menu) {
    case menuTypes.NEW_PRODUCT:
      return (
        <div style={generalStyle}>
          <NewProduct />
        </div>
      );
    case menuTypes.UPDATE_PRODUCT:
      return (
        <div style={generalStyle}>
          <UpdateProduct />
        </div>
      );
    case menuTypes.DELETE_PRODUCT:
      return (
        <div style={generalStyle}>
          <DeleteProduct />
        </div>
      );
    case menuTypes.LIST_PRODUCTS:
      return (
        <div style={generalStyle}>
          <ListProducts />
        </div>
      );
    case menuTypes.NEW_USER:
      return (
        <div style={generalStyle}>
          <NewUser />
        </div>
      );
    case menuTypes.UPDATE_USER:
      return (
        <div style={generalStyle}>
          <UpdateUser />
        </div>
      );
    case menuTypes.DELETE_USER:
      return (
        <div style={generalStyle}>
          <DeleteUser />
        </div>
      );
    case menuTypes.LIST_USERS:
      return (
        <div style={generalStyle}>
          <ListUsers />
        </div>
      );
    case menuTypes.SALES:
      return (
        <div style={generalStyle}>
          <Sales />
        </div>
      );

    default:
      console.log("default");
      break;
  }
}
