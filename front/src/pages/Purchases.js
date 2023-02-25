import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail, getVoucher } from "../redux/actions/actions";
import "../style/purchases.css";

const Purchases = () => {
  const dispatch = useDispatch();
  const compras = useSelector((state) => state.userVoucher);
  const userId = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    if (!compras.length) dispatch(getVoucher(userId));
    console.log(compras);
  }, [compras]);

  return (
    <div className="purchases-container">
      <h1>Mis Compras</h1>
      <div className="purchase-wrapper">
        <ul>
          {!compras ? (
            <li>
              <h5>Cargando...</h5>
            </li>
          ) : (
            compras?.map((compra) => {
              return (
                <li>
                  <h5>
                    Id: <b>{compra.id}</b>
                  </h5>
                  <h5>
                    Fecha: <b>{compra.date}</b>
                  </h5>
                  <h5>
                    Forma de pago: <b>{compra.wayToPay}</b>
                  </h5>
                  <h3>
                    Total: <b>${compra.price}</b>
                  </h3>
                  <button onClick={""}>
                    <i className="fa-solid fa-eye"></i>
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default Purchases;
