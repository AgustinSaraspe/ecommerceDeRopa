import React, { useState, useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions/actions";

export const ListUsers = () => {
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

//
// ░░░░░▄░░░░░░█▄█░░░░░
// ░░░▄▀░░░░░▄▄██▀░░░░░
// ░░░▀▄░░▄██████░░░░░░
// ▒░▒░▀▄████▀█▀█▒░▒░▒▒
// ░▒░▒░▒▀██▄▒█▒█░▒░▒░░

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
                  cursor: "default",
                }}
              >
                <h6>{`Id: ${user.id}`}</h6>
                <h5>{`Nombre: ${user.name}`}</h5>
                <h6>{`Email: ${user.email}`}</h6>
                <h6>{`Admin: ${user.admin}`}</h6>
                <h6>{`Tel: ${user.phone}`}</h6>
                <h6>{`Direc: ${user.address}`}</h6>
              </button>
            );
          })
        ) : (
          // <h3>No se encontraron useros.</h3>
          <></>
        )}
      </ul>
    </div>
  );
};
