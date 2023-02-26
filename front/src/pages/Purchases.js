import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, getUserDetail, getVoucher } from "../redux/actions/actions";
import "../style/purchases.css";

const Purchases = () => {
  const dispatch = useDispatch();
  const compras = useSelector((state) => state.userVoucher);
  if (!localStorage.getItem("user")) {
    window.location.replace("http://localhost:3000");
  }
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  const [active, setActive] = useState(false);
  const [cartId, setCartId] = useState(null);

  const handleOpen = (id) => {
    setActive(true);
    setCartId(id);
  };

  const handleClose = () => {
    setActive(false);
    // setCartId(null);
  };

  useEffect(() => {
    if (!compras.length) dispatch(getVoucher(userId));
    console.log(compras);
  }, [compras]);

  useEffect(() => {}, [cartId]);

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
                  <button onClick={() => handleOpen(compra.CartId)}>
                    <i className="fa-solid fa-eye"></i>
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>
      {active ? (
        <DetailView cartId={cartId} handleClose={handleClose} />
      ) : (
        <></>
      )}
    </div>
  );
};

const DetailView = ({ cartId, handleClose }) => {
  const dispatch = useDispatch();
  const detalle = useSelector((state) => state.userDetail);

  useEffect(() => {
    if (!detalle.length) dispatch(getDetail(cartId));
    console.log(detalle);
  }, [detalle]);

  return (
    <div className="detail-container">
      <nav>
        <h2>Detalle de Compra</h2>
        <button onClick={handleClose}>x</button>
      </nav>
      {detalle.map((e) => {
        return (
          <div className="detail-wrapper">
            <div
              style={{
                width: "70px",
              }}
            >
              <img style={{ width: "100%" }} src={e.Product.file} />
            </div>
            <h5>Nombre: {e.Product.name}</h5>
            <h5>Cantidad: {e.Quantity}</h5>
            <h5>${e.Product.price}</h5>
            <h4>SubTotal: ${e.Total}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Purchases;
