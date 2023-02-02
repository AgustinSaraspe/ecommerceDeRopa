import React, { useState } from "react";
import { Menu } from "../components/Menu";
import "../style/dashboard.css";
import Products from "./Products";
import { menuTypes } from "../utils/menuTypes";

function Dashboard() {
  const [products, setProducts] = useState(false);
  const [menu, setMenu] = useState(menuTypes.NEW_PRODUCT);

  return (
    <div className="dashboardContainer">
      <nav>
        <h1>Dashboard</h1>
        <h2>Productos</h2>
        <ul>
          <button
            className="dashboardButton"
            onClick={() => setMenu(menuTypes.NEW_PRODUCT)}
          >
            Nuevo Producto
          </button>
          <button
            className="dashboardButton"
            onClick={() => setMenu(menuTypes.UPDATE_PRODUCT)}
          >
            Modificar Producto
          </button>
          <button
            className="dashboardButton"
            onClick={() => setMenu(menuTypes.DELETE_PRODUCT)}
          >
            Eliminar Producto
          </button>
          <button
            className="dashboardButton"
            onClick={() => setMenu(menuTypes.LIST_PRODUCTS)}
          >
            Listar Productos
          </button>
        </ul>
        <h2>Usuarios</h2>
        <ul>
          <button
            className="dashboardButton"
            onClick={() => setMenu(menuTypes.NEW_USER)}
          >
            Nuevo Usuario
          </button>
          <button
            className="dashboardButton"
            onClick={() => setMenu(menuTypes.UPDATE_USER)}
          >
            Modificar Usuario
          </button>
          <button
            className="dashboardButton"
            onClick={() => setMenu(menuTypes.DELETE_USER)}
          >
            Eliminar Usuario
          </button>
          <button
            className="dashboardButton"
            onClick={() => setMenu(menuTypes.LIST_USERS)}
          >
            Listar Usuarios
          </button>
        </ul>
        <h2>Ventas</h2>
        <ul>
          <button
            className="dashboardButton"
            onClick={() => setMenu(menuTypes.SALES)}
          >
            Ver ventas
          </button>
        </ul>
      </nav>
      <Menu menu={menu} />
    </div>
  );
}

export default Dashboard;
