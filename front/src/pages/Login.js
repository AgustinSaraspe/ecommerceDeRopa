import axios from "axios";
import React, { useEffect, useState } from "react";
import "../style/signup.css";

//redux
import { loginUser } from "../redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Snackbar } from "@mui/material";

function Login() {
  //redux
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);

  //Snackbars MaterialUI
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const messages = {
    error: "Error al loguearse!",
    inputError: "Por favor, ingrese sus datos correctamente",
    success: `Bienvenido!`,
  };

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [click, setClick] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(input));
    setClick(true);
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
    setClick(false);
  };

  useEffect(() => {
    if (loggedUser && click) {
      if (loggedUser.token && loggedUser.user) {
        let user = {
          id: loggedUser.user.id,
          name: loggedUser.user.name,
          email: loggedUser.user.email,
          phone: loggedUser.user.phone,
          address: loggedUser.user.address,
          state: loggedUser.user.state,
          admin: loggedUser.user.admin,
          token: loggedUser.token,
        };
        user = JSON.stringify(user);
        localStorage.setItem("user", user);
        setTimeout(() => {
          setMessage(messages.success);
          setSeverity("success");
          setOpen(true);
          window.location.replace("http://localhost:3000/");
        }, 500);
      } else {
        setTimeout(() => {
          setMessage(messages.error);
          setSeverity("error");
          setOpen(true);
        }, 500);
      }
    }
  }, [loggedUser]);

  return (
    <div>
      <div className="signup-form">
        <h1
          style={{
            textAlign: "center",
            fontFamily: "Noto Sans Tangsa",
            color: "white",
            textShadow: "2px 2px 1px black",
          }}
        >
          Login
        </h1>
        <label>Email</label>
        <input
          name="email"
          type={"email"}
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
        <button onClick={(e) => handleSubmit(e)}>Iniciar Sesion</button>
        <p>
          No estás registrado?{" "}
          <a href="http://localhost:3000/signup">Registrarse</a>
        </p>
      </div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
