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

function App() {
  const [logged, setLogged] = useState(false);

  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <div className="nav-left">
            <Link to="/">Colibri</Link>
          </div>
          <div className="nav-right">
            <Link to="/">Home</Link>
            <Link to="/store">Store</Link>
            <Link to="/about">About</Link>
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
            <a>
              <i className="fa-solid fa-user"></i>
            </a>
            {logged ? (
              <button
                className="log-button"
                onClick={() => {
                  setLogged(!logged);
                }}
              >
                Login
              </button>
            ) : (
              <button
                className="log-button"
                onClick={() => {
                  setLogged(!logged);
                }}
              >
                Sign Up
              </button>
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
            <h2>Colibri</h2>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-whatsapp"></i>
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
