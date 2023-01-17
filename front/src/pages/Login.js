import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          justifyContent: "center",
        }}
      >
        <TextField
          label="Nombre"
          id="outlined-start-adornment"
          sx={{ m: 1, width: "30ch" }}
        />
        <TextField
          label="Email"
          id="outlined-start-adornment"
          sx={{ m: 1, width: "30ch" }}
        />
        <TextField
          label="Contraseña"
          id="outlined-adornment-password"
          sx={{ m: 1, width: "30ch" }}
          type={showPassword ? "text" : "password"}
          endAdornment={<InputAdornment position="end"></InputAdornment>}
        />
      </Box>
    </div>
  );
}

export default Login;
