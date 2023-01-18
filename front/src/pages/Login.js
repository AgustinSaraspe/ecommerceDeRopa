import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import "../style/signup.css";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    Number.parseInt(input.phone);
    console.log(input);
    let resultado = await axios.post("http://localhost:3001/users", input);
    localStorage.setItem("jwt", resultado.data.token);
    if (resultado.data.token) {
      window.location.replace("http://localhost:3000/");
    }
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  console.log(input);

  return (
    <div>
      <Box
        component="form"
        className="signup-form"
        sx={{
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
          Login
        </h1>
        <label>Email</label>
        <input
          name="email"
          value={input.email}
          onChange={(e) => handleChange(e)}
        />
        <label>Contraseña</label>
        <input
          name="password"
          value={input.password}
          type="password"
          onChange={(e) => handleChange(e)}
        />
        <button>Iniciar Sesion</button>
        <p>
          No estás registrado?{" "}
          <a href="http://localhost:3000/signup">Registrarse</a>
        </p>
      </Box>
    </div>
  );
}

export default Login;
