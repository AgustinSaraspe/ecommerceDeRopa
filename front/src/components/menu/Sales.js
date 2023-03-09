import React, { useState, useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getAllVouchers } from "../../redux/actions/actions";
import "../../style/dashboard.css";

export const Sales = () => {
  const dispatch = useDispatch();

  const sales = useSelector((state) => state.userVoucher);
  const [salesFound, setSalesFound] = useState(null);

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
    dispatch(getAllVouchers);
  }, []);

  useEffect(() => {
    // MOTOR DE BUSQUEDA
    dispatch(getAllVouchers());
    const salesFound = [];
    if (search.length) {
      sales.map((sale) => {
        if (sale.date.includes(search))
          // console.log(sales.id);
          salesFound.push(sale);
        setSalesFound(salesFound);
      });
    } else {
      setSalesFound(sales);
    }
  }, [search]);

  return (
    <div>
      <div className="productMenu" style={formStyle}>
        <h2>Ventas</h2>
        <div className="updateProducts">
          <input
            placeholder="Buscar por fecha: YYYY-MM-DD"
            name="search"
            value={search}
            onChange={handleSearch}
          />
          <button onClick={handleSearchSubmit} className="searchButton">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <ShowFoundProducts sales={salesFound} />
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

const ShowFoundProducts = ({ sales }) => {
  useEffect(() => {}, [sales]);
  const [selection, setSelection] = useState(null);

  return (
    <div>
      <ul
        style={{
          paddingInlineStart: 0,
        }}
      >
        {sales ? (
          sales.map((sale) => {
            return (
              <button
                key={sale.id}
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
                <h6>{`Id: ${sale.id}`}</h6>
                <h5>{`Fecha: ${sale.date}`}</h5>
                <h6>{`Forma de pago: ${sale.wayToPay}`}</h6>
                <h6>{`Total: $${sale.price}`}</h6>
                <h6>{`Id de Usuario: ${sale.UserId}`}</h6>
                <h6>{`Id Carrito: ${sale.CartId}`}</h6>
              </button>
            );
          })
        ) : (
          // <h3>No se encontraron ventas.</h3>
          <></>
        )}
      </ul>
    </div>
  );
};
