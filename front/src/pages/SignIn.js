import axios from "axios";
import React, { useState } from "react";

function SignIn() {

  const [input, setInput] = useState({
    email: "",
    password: ""
  });


  const handleSubmit = async(e) => {
    e.preventDefault(); 
    let resultado = await axios.post("http://localhost:3001/users/singIn", input)

      if(resultado.data.token){
        localStorage.setItem("jwt", resultado.data.token);
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
         <label>Email:</label><input type="email" name="email" value={input.email} onChange={(e)=>handleChange(e)}/>
         <label>Password:</label><input type="text" name="password" value={input.password} onChange={(e)=>handleChange(e)}/>
         <button onClick={(e)=>handleSubmit(e)}>Enviar</button>
       </form>
    </div>
  );
}

export default SignIn;
