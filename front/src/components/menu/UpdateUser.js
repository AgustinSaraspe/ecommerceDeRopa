import React, { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { postProduct } from "../../redux/actions/actions";

export const UpdateUser = () => {
  const formStyle = {
    display: "flex",
    flexDirection: "column",
  };
  const [input, setInput] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log("search:", search);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search.length) {
      return;
    }
    console.log(search);
  };

  return (
    <div>
      <div className="productMenu" style={formStyle}>
        <h2>Borrar Usuarios</h2>
        <div className="deleteUsers">
          <input
            placeholder="Buscar usuario"
            name="search"
            value={search}
            onChange={handleSearch}
          />
          <button onClick={handleSearchSubmit} className="searchButton">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
