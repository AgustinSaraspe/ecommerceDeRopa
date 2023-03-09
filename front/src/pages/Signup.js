import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

//redux
import { postUser } from "../redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";

function Signup() {
  //redux
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);
  const allUsers = useSelector((state) => state.users);

  //Snackbars MaterialUI
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const messages = {
    error: "Error al registrarse!",
    success: "Se ha registrado correctamente!",
  };

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    Number.parseInt(input.phone);
    console.log(input);
    if (
      !(
        input.name.length &&
        input.password.length &&
        input.email.length &&
        input.phone.length &&
        input.address.length &&
        input.email.includes("@")
      )
    ) {
      setTimeout(() => {
        setMessage(messages.error);
        setSeverity("error");
        setOpen(true);
      }, 3000);
    } else {
      setTimeout(() => {
        dispatch(postUser(input));
        setMessage(messages.success);
        setSeverity("success");
        window.location.replace("http://localhost:3000/");
        setOpen(true);
      }, 3000);
    }

    // setTimeout(() => {
    //   if (userActual) {
    //     console.log(userActual);
    //     if (userActual.token) {
    //       localStorage.setItem("jwt", userActual.token);
    //       window.location.replace("http://localhost:3000/");
    //       setSuccess(!success);
    //     } else {
    //       setError(!error);
    //     }
    //   }
    // }, 4000);
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  console.log(input);

  return (
    <div>
      <div id="signupForm" className="signup-form">
        <h1
          style={{
            textAlign: "center",
            fontFamily: "Noto Sans Tangsa",
            color: "white",
            textShadow: "2px 2px 1px black",
          }}
        >
          Registrarse
        </h1>
        <label>Nombre</label>
        <input
          name="name"
          value={input.name}
          onChange={(e) => handleChange(e)}
        />
        <label>Email</label>
        <input
          name="email"
          value={input.email}
          onChange={(e) => handleChange(e)}
        />
        <label>Contraseña</label>
        <input
          name="password"
          type="password"
          value={input.password}
          onChange={(e) => handleChange(e)}
        />
        <label>Telefono</label>
        <input
          name="phone"
          value={input.phone}
          onChange={(e) => handleChange(e)}
        />
        <label>Direccion</label>
        <input
          name="address"
          value={input.address}
          onChange={(e) => handleChange(e)}
        />
        <button onClick={(e) => handleSubmit(e)}>Registrarse</button>
        <p>
          Ya tienes cuenta?{" "}
          <a href="http://localhost:3000/login">Inicia Sesión</a>
        </p>
      </div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      {/* <Snackbar open={error} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Ha ocurrido un error!
        </Alert>
      </Snackbar> */}
    </div>
  );
}

export default Signup;
