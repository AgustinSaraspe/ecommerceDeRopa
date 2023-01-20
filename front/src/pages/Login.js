import axios from "axios";
import React, { useState } from "react";
import "../style/signup.css";


//redux
import { signIn } from "../redux/actions/actions";
import {useSelector, useDispatch} from "react-redux";


function Login() {
   //redux
   const dispatch = useDispatch();
   const userActual = useSelector((state) => state.user);

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    Number.parseInt(input.phone);
    console.log(input)
    
     dispatch(signIn(input));

     if(userActual){
      console.log(userActual)
     }

     setTimeout(()=>{
      if(userActual){
        console.log(userActual)
        if (userActual.token) {
          localStorage.setItem("jwt", userActual.token);
          window.location.replace("http://localhost:3000/");
        } else {
         alert("el login fallo");
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

  console.log(input);

  return (
    <div>
      <div
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
        <button onClick={(e)=>handleSubmit(e)}>Iniciar Sesion</button>
        <p>
          No estás registrado?{" "}
          <a href="http://localhost:3000/signup">Registrarse</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
