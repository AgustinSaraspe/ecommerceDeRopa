import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function Login() {

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address:""
  })


  const handleSubmit = async(e) => {
    e.preventDefault(); 
    Number.parseInt(input.phone);
    console.log(input)
    let resultado = await axios.post("http://localhost:3001/users", input)
    localStorage.setItem("jwt", resultado.data.token);
    if(resultado.data.token){
      window.location.replace("http://localhost:3000/");
    }
  };

  const handleChange = (e) => {

    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
  };
 
  console.log(input);
   
  return (
    <div>
       <form>
         <label>Name:</label><input type="text" name="name" value={input.name} onChange={(e)=>handleChange(e)}/>
         <label>Email:</label><input type="email" name="email" value={input.email} onChange={(e)=>handleChange(e)}/>
         <label>Password:</label><input type="text" name="password" value={input.password} onChange={(e)=>handleChange(e)}/>
         <label>Phone:</label><input type="number" name="phone" value={input.phone} onChange={(e)=>handleChange(e)}/>
         <label>address:</label><input type="text" name="address" value={input.address} onChange={(e)=>handleChange(e)}/>
         <button onClick={(e)=>handleSubmit(e)}>Enviar</button>
       </form>
    </div>
  );
}

export default Login;
