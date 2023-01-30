import React, { useState, useEffect } from "react";
import "./style/app.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Store from "./pages/Store";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Avatar from "@mui/material/Avatar";

//Redux
import { useDispatch, useSelector } from "react-redux";
import User from "./pages/User";
import { logoutUser } from "./redux/actions/actions";

function App() {
  const loggedUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("jwt");
  };

  useEffect(() => {}, [loggedUser]);

  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <div className="nav-left">
            <Link to="/">Colibri</Link>
          </div>
          <div className="nav-right">
            <Link to="/">Inicio</Link>
            <Link to="/store">Productos</Link>
            <Link to="/about">Contacto</Link>
            {loggedUser.token ? (
              <>
                <div className="dropdown-cart">
                  <Link to="/cart" className="cart-btn">
                    <i className="fa-solid fa-cart-shopping"></i>
                  </Link>
                  <div className="dropdown-cart-content">
                    <button>Comprar</button>
                    {/* Renderizamos los productos del carrito */}
                    <button>Cancelar compra</button>
                  </div>
                </div>
                <div className="dropdown-user">
                  <i className="fa-solid fa-user" id="drop-user-btn"></i>
                  <div className="dropdown-content">
                    {loggedUser.user.admin ? (
                      <button>Cargar un producto</button>
                    ) : (
                      <Link to="/user">
                        <Avatar>{loggedUser.user.name.charAt(0)}</Avatar>
                      </Link>
                    )}
                    <h4>{loggedUser.user.name}</h4>
                    <button
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button className="log-button">
                  <Link to="/login">Login</Link>
                </button>
                <button className="log-button">
                  <Link to="/signup">Sign Up</Link>
                </button>
              </>
            )}
          </div>
        </nav>
        <div className="body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/products" element={<Products />} />
            <Route path="/user" element={<User />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <footer>
          <div className="footer-devs">
            <h5>Thiago Sosa Argañaraz</h5>
            <i className="fa-brands fa-github"></i>
            <i className="fa-solid fa-envelope"></i>
            <i className="fa-brands fa-linkedin"></i>
          </div>
          <div className="footer-header">
            <div>
              <h2>Colibri</h2>
            </div>
            <div>
              <i className="fa-brands fa-instagram"></i>
              <h5>@colibrisublimados</h5>
              <i className="fa-brands fa-whatsapp"></i>
              <h5>+54 3863 123456</h5>
            </div>
          </div>
          <div className="footer-devs">
            <h5>Agustin Saraspe</h5>
            <i className="fa-brands fa-github"></i>
            <i className="fa-solid fa-envelope"></i>
            <i className="fa-brands fa-linkedin"></i>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
