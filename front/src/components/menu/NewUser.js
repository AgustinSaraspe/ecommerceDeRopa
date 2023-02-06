import React, { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { postUser } from "../../redux/actions/actions";

export const NewUser = () => {
  const dispatch = useDispatch();
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    margin: "2rem 20%",
  };

  const [active, setActive] = useState(true);
  const [admin, setAdmin] = useState(false);

  const [input, setInput] = useState({
    name: "",
    email: "",
    state: active,
    admin: admin,
    password: "",
    address: "",
    phone: "",
  });

  const clearInputs = (e) => {
    //FUNCION PARA BORRAR CONTENIDO DE LOS INPUTS

    setInput({
      name: "",
      email: "",
      state: active,
      admin: admin,
      password: "",
      address: "",
      phone: "",
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
      input.name &&
      input.email &&
      input.password &&
      input.phone &&
      input.address
    ) {
      //AQUI PODRIAMOS MANEJAR UN POSIBLE ERROR EN EL BACKEND
      console.log("successfull");
      dispatch(postUser(input));
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
    success: "Usuario creado con exito!",
    error: "El usuario no se pudo crear!",
    errorInput: "Por favor rellene todos los campos",
  };

  return (
    <div>
      <div className="productMenu" style={formStyle}>
        <h2>Nuevo Usuario</h2>
        <label>Nombre</label>
        <input name="name" onChange={handleChange} value={input.name} />
        <label>Email</label>
        <input
          name="email"
          type="email"
          onChange={handleChange}
          value={input.email}
        />
        <label>Contraseña</label>
        <input
          name="password"
          type="password"
          onChange={handleChange}
          value={input.password}
        />
        <label>Direccion</label>
        <input name="address" onChange={handleChange} value={input.address} />
        <label>Telefono</label>
        <input
          name="phone"
          type="tel"
          onChange={handleChange}
          value={input.phone}
        />
        <label
          style={{
            marginTop: "1rem",
          }}
        >
          Admin
        </label>
        <select
          style={{
            padding: "1rem",
            backgroundColor: "#111",
            color: "#fff",
            margin: ".5rem auto",
          }}
          name="admin"
          onChange={handleChange}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <label>Estado</label>
        <select
          style={{
            padding: "1rem",
            backgroundColor: "#111",
            color: "#fff",
            margin: ".5rem auto",
          }}
          name="state"
          onChange={handleChange}
        >
          <option value={true}>Activo</option>
          <option value={false}>Inactivo</option>
        </select>
        <button className="dashboardButton" onClick={handleSubmit}>
          Guardar Usuario
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
