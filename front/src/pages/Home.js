import React from "react";
import "../style/home.css";

function Home() {
  return (
    <div className="home-body">
      {/* <div className="home-hero">
        <img className="hero-img" />
      </div> */}
      <button className="home-options">OFERTAS</button>
      <button className="home-options">REMERAS</button>
      <button className="home-options">GORRAS</button>
      <button className="home-options">TODOS LOS PRODUCTOS</button>
    </div>
  );
}

export default Home;
