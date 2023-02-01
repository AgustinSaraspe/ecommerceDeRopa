import React, { useState } from "react";
import "../style/dashboard.css";
import Products from "./Products";

function Dashboard() {
  const dashboardMenu = {
    NEW_PRODUCT: "NEW_PRODUCT",
    MODIFY_PRODUCT: "MODIFY_PRODUCT",
    DELETE_PRODUCT: "DELETE_PRODUCT",
    NEW_USER: "NEW_USER",
    MODIFY_USER: "MODIFY_USER",
    DELETE_USER: "DELETE_USER",
    SALES: "SALES",
  };
  const [products, setProducts] = useState(false);
  const [menu, setMenu] = useState(dashboardMenu.NEW_PRODUCT);

  return (
    <div className="dashboardContainer">
      <nav>
        <h1>Dashboard</h1>
        <h2>Productos</h2>
        <ul>
          <button>Nuevo Producto</button>
          <button>Modificar Producto</button>
          <button>Eliminar Producto</button>
        </ul>
        <h2>Usuarios</h2>
        <ul>
          <button>Nuevo Usuario</button>
          <button>Modificar Usuario</button>
          <button>Eliminar Usuario</button>
        </ul>
        <h2>Ventas</h2>
        <ul>
          <button>Ver ventas</button>
        </ul>
      </nav>
      <div className="dashboardBody">{}</div>
    </div>
  );
}

export default Dashboard;
