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
import Dashboard from "./pages/Dashboard";

function App() {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  // const [quantity, setQuantity] = useState(null);
  // const [cart, setCart] = useState(null);
  let stringiUser = localStorage.getItem("user");
  let cart = JSON.parse(localStorage.getItem("cart"));

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    if (!stringiUser) {
      return;
    }
    setUser(JSON.parse(stringiUser));
  }, [stringiUser]);

  useEffect(() => {}, [cart]);
  console.log(cart.length);

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
            {user !== null ? (
              <>
                {!user.admin ? (
                  <div className="dropdown-cart">
                    <Link to="/cart" className="cart-btn">
                      <i className="fa-solid fa-cart-shopping"></i>
                    </Link>
                    <div className="dropdown-cart-content">
                      {cart.map((product) => (
                        <div>
                          <div
                            style={{
                              width: "50px",
                              height: "auto",
                            }}
                          >
                            <img
                              style={{
                                width: "100%",
                                height: "auto",
                              }}
                              src={product.file}
                            />
                          </div>
                          <h5>{product.name}</h5>
                          <h5>${product.price}</h5>
                          <button>
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      ))}
                      <button>Ver carrito</button>
                      <button>Comprar carrito</button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="dropdown-user">
                  <i className="fa-solid fa-user"></i>
                  <div className="dropdown-content">
                    <Link
                      to="/user"
                      style={{
                        margin: "0",
                      }}
                    >
                      <Avatar>{user.name.charAt(0)}</Avatar>
                    </Link>
                    <h4 style={{ margin: "1rem auto" }}>{user.name}</h4>
                    {user.admin ? (
                      <button
                        onClick={() => {
                          window.location.replace(
                            "http://localhost:3000/dashboard"
                          );
                        }}
                      >
                        Dashboard
                      </button>
                    ) : (
                      ""
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                      }}
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        padding: "10px",
                        borderLeft: "none",
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
            <Route path="/dashboard" element={<Dashboard />} />
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
