import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail } from "../redux/actions/actions";
import "../style/purchases.css";

const Purchases = () => {
  const dispatch = useDispatch();
  const compras = useSelector((state) => state.userDetail);
  const userId = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    dispatch(getUserDetail(userId));
    console.log(compras);
  }, []);

  return (
    <div className="purchases-container">
      <h1>Mis Compras</h1>
      <div>
        <ul>
          {!compras ? (
            <h3>Cargando...</h3>
          ) : (
            compras?.map((compra) => {
              return (
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <h3>Fecha: {compra.createdAt}</h3>
                  <h3>Producto:</h3>
                  <div
                    style={{
                      width: "80px",
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                      src={compra.Product.file}
                    />
                  </div>
                  <h4>{compra.Product.name}</h4>
                  <h4>{compra.Product.price}</h4>
                </div>
              );
            })
          )}
        </ul>
      </div>
      <section></section>
    </div>
  );
};

export default Purchases;
