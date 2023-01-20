import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";


//redux
import { signUp } from "../redux/actions/actions";
import {useSelector, useDispatch} from "react-redux";

function Signup({ setLogged }) {
  //redux
  const dispatch = useDispatch();
  const userActual = useSelector((state) => state.user);

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    Number.parseInt(input.phone);

    console.log(input);

    dispatch(signUp(input));


    setTimeout(()=>{
      if(userActual){
        console.log(userActual)
        if (userActual.token) {
          localStorage.setItem("jwt", userActual.token);
          window.location.replace("http://localhost:3000/");
          setSuccess(!success);
          setLogged(true);
        } else {
          setError(!error);
        }
      }
    },4000);
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

    setSuccess(false);
    setError(false);
  };

  console.log(input);

  return (
    <div>
      <div
        id="signupForm"
        className="signup-form"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "30%",
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
      <Snackbar open={success} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Se registró con exito!
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Ha ocurrido un error!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Signup;
