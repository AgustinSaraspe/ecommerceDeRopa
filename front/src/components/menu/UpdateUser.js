import React, { useState, useEffect } from "react";
import { Alert, Box, Modal, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, updateUser } from "../../redux/actions/actions";

export const UpdateUser = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const [usersFound, setUsersFound] = useState(null);

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    admin: false,
    state: true,
    address: "",
    phone: "",
  });
  const [search, setSearch] = useState("");

  const formStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const clearInputs = (e) => {
    //FUNCION PARA BORRAR CONTENIDO DE LOS INPUTS

    setInput({
      name: "",
      email: "",
      password: "",
      admin: false,
      state: true,
      address: "",
      phone: "",
    });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search.length) {
      return;
    }
    console.log(search);
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
    success: "El usuario se editó con exito!",
    error: "El usuario no se pudo editar!",
    errorInput: "Por favor rellene todos los campos",
  };

  useEffect(() => {
    // MOTOR DE BUSQUEDA
    dispatch(getAllUsers());
    const userFound = [];
    if (search.length) {
      users.map((user) => {
        if (user.name.toLowerCase().includes(search.toLowerCase()))
          // console.log(users.id);
          userFound.push(user);
        setUsersFound(userFound);
      });
    }
  }, [search]);

  return (
    <div>
      <div className="productMenu" style={formStyle}>
        <h2>Editar Usuarios</h2>
        <div className="updateProducts">
          <input
            placeholder="Buscar usuario"
            name="search"
            value={search}
            onChange={handleSearch}
          />
          <button onClick={handleSearchSubmit} className="searchButton">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <ShowFoundProducts users={usersFound} />
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

// ─▄▄▀▀█▀▀▄▄
// ▐▄▌─▀─▀─▐▄▌
// ──█─▄▄▄─█──▄▄
// ──▄█▄▄▄█▄─▐──▌
// ▄█▀█████▐▌─▀─▐
// ▀─▄██▀██▀█▀▄▄▀

const ShowFoundProducts = ({ users }) => {
  useEffect(() => {}, [users]);
  const [selection, setSelection] = useState(null);

  return (
    <div>
      <ul
        style={{
          paddingInlineStart: 0,
        }}
      >
        {users ? (
          users.map((user) => {
            return (
              <button
                key={user.id}
                style={{
                  display: "flex",
                  width: "80%",
                  alignItems: "center",
                  fontFamily: "verdana",
                  border: "1px solid #555",
                  padding: "2rem",
                  margin: ".5rem auto",
                  backgroundColor: "transparent",
                  color: "#ddd",
                  justifyContent: "space-between",
                  fontSize: "16px",
                }}
                onClick={() => setSelection(user)}
              >
                <h6>{`Id: ${user.id}`}</h6>
                <h5>{`Nombre: ${user.name}`}</h5>
                <h6>{`Email: ${user.email}`}</h6>
                <h6>{`Admin: ${user.admin}`}</h6>
                <h6>{`Tel: ${user.phone}`}</h6>
                <h6>{`Direc: ${user.address}`}</h6>
                <i className="fa-solid fa-pencil"></i>
              </button>
            );
          })
        ) : (
          // <h3>No se encontraron useros.</h3>
          <></>
        )}
      </ul>
      {selection ? (
        <UpdateForm user={selection} setter={setSelection} />
      ) : (
        <></>
      )}
    </div>
  );
};

//
// ░░░░░▄░░░░░░█▄█░░░░░
// ░░░▄▀░░░░░▄▄██▀░░░░░
// ░░░▀▄░░▄██████░░░░░░
// ▒░▒░▀▄████▀█▀█▒░▒░▒▒
// ░▒░▒░▒▀██▄▒█▒█░▒░▒░░

const UpdateForm = ({ user, setter }) => {
  // const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    margin: "2rem 20%",
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
    if (input.name && input.email) {
      //AQUI PODRIAMOS MANEJAR UN POSIBLE ERROR EN EL BACKEND
      console.log("successfull");
      dispatch(updateUser(input, user.id));
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

  // SNACKBARS
  const [severity, setSeverity] = useState("success");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const messages = {
    success: "El usuario se modificó con exito!",
    error: "El usuario no se pudo modificar!",
    errorInput: "Por favor rellene todos los campos",
  };

  const [input, setInput] = useState({
    name: user.name,
    email: user.email,
    address: user.address,
    phone: user.phone,
    admin: user.admin,
    state: user.admin,
  });

  const boxStyle = {
    backgroundColor: "#111111ee",
    fontSize: "12px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "90%",
    border: "2px solid #000",
    boxShadow: 24,
    p: 10,
    display: "flex",
    flexDirection: "column",
  };

  return (
    <>
      <Modal open={user !== undefined}>
        <Box style={boxStyle} className="modalBoxUser">
          <h1>Modificar Usuarios</h1>
          <label>Nombre del usuario</label>
          <input name="name" value={input.name} onChange={handleChange} />
          <label>Email</label>
          <input name="email" value={input.email} onChange={handleChange} />
          <label>Direccion</label>
          <input name="address" value={input.address} onChange={handleChange} />
          <label>Admin</label>
          <select
            style={{
              padding: ".5rem",
              backgroundColor: "#111",
              color: "#fff",
              margin: "0 auto",
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
              padding: ".5rem",
              backgroundColor: "#111",
              color: "#fff",
              margin: "0 auto",
            }}
            name="state"
            onChange={handleChange}
          >
            <option value={true}>Activo</option>
            <option value={false}>Inactivo</option>
          </select>
          <button className="modalButtonUser" onClick={handleSubmit}>
            Guardar
          </button>
          <button className="modalButtonUser" onClick={() => setter(undefined)}>
            Cancelar
          </button>
        </Box>
      </Modal>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
