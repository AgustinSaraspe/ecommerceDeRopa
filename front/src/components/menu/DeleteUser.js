import React, { useState, useEffect } from "react";
import { Alert, Box, Modal, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../../redux/actions/actions";
import "../../style/dashboard.css";

export const DeleteUser = () => {
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
    } else {
      setUsersFound(users);
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
      <ul className="productWrapper">
        {users ? (
          users.map((user) => {
            return (
              <button
                key={user.id}
                className="userList"
                onClick={() => setSelection(user)}
              >
                <h6>{`Id: ${user.id}`}</h6>
                <h5>{`Nombre: ${user.name}`}</h5>
                <h6>{`Email: ${user.email}`}</h6>
                <h6>{`Admin: ${user.admin}`}</h6>
                <h6>{`Tel: ${user.phone}`}</h6>
                <h6>{`Direc: ${user.address}`}</h6>
                <i class="fa-solid fa-trash"></i>
              </button>
            );
          })
        ) : (
          // <h3>No se encontraron users.</h3>
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

const UpdateForm = ({ user, setter }) => {
  // const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    margin: "2rem 20%",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("successfull");
    dispatch(deleteUser(user.id));
    setTimeout(() => {
      setMessage(messages.success);
      setSeverity("success");
      setOpen(true);
    }, 500);
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
    success: "El usuario se eliminó con exito!",
    error: "El usuario no se pudo eliminar!",
    errorInput: "Por favor rellene todos los campos",
  };

  const boxStyle = {};

  return (
    <>
      <Modal open={user !== undefined}>
        <Box className="modalBoxUser">
          <h1>Eliminar Usuario</h1>
          {user ? (
            <h2
              style={{
                color: "#fff",
                textAlign: "center",
                marginTop: "1rem",
                fontWeight: "lighter",
              }}
            >
              ¿Desea eliminar el usuario <b>"{user.name}"</b>?
            </h2>
          ) : (
            <h2>Cargando...</h2>
          )}
          <button className="modalButtonUser" onClick={handleSubmit}>
            Si
          </button>
          <button className="modalButtonUser" onClick={() => setter(undefined)}>
            No
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
