import React, { useEffect, useState } from "react";
import { Alert, inputAdornmentClasses, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { postProduct,getAllProducts,postPicture } from "../../redux/actions/actions";
import axios from "axios";

export const NewProduct = () => {

  const [input, setInput] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });


  const dispatch = useDispatch();
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    margin: "2rem 20%",
  };

  const products = useSelector((state)=>state.products);

 // Cloudinary
 const [image, setImage] = useState('');

 const uploadImage = async (e) => {
   const files = e.target.files;
   const data = new FormData();

   data.append('file', files[0]);
   data.append('upload_preset', 'images');
   const { data: file } = await axios.post(
     'https://api.cloudinary.com/v1_1/dev3snn9g/image/upload',
     data,
   );

   setImage(file.secure_url);

   console.log(file);
 };


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
    if (input.name && input.price && input.stock) {
      //AQUI PODRIAMOS MANEJAR UN POSIBLE ERROR EN EL BACKEND
      console.log("successfull");

      console.log(input)
      dispatch(postProduct(input));
      clearInputs();
      setTimeout(() => {
        setMessage(messages.success);
        setSeverity("success");
        setOpen(true);
      }, 500);
    
     let values =  {
      url: image,
      name: input.name
     }

    //  image ? {
    //   url: image,
    //   name: input.name
    // } :

    setTimeout(() => {
      dispatch(postPicture(values))
      
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


  console.log("product",products);

  useEffect(()=>{

    dispatch(getAllProducts());

  },[dispatch])


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
        <label>Imagen</label>
        <input
          type="file"
          name="file"
          onChange={uploadImage}
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
