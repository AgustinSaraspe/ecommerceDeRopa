import React from "react";
import { menuTypes } from "../utils/menuTypes";
import { DeleteProduct } from "./menu/DeleteProducts";
import { DeleteUser } from "./menu/DeleteUser";
import { ListUsers } from "./menu/ListUsers";
import { NewProduct } from "./menu/NewProduct";
import { NewUser } from "./menu/NewUser";
import { Sales } from "./menu/Sales";
import { UpdateProduct } from "./menu/UpdateProducts";
import { UpdateUser } from "./menu/UpdateUser";

/* -------------------------------------------------------- */
//Styles

const generalStyle = {
  display: "flex",
  flexDirection: "column",
  width: "70%",
  backgroundColor: "#222",
  color: "#fff",
  textAlign: "center",
};

export function Menu({ menu }) {
  switch (menu) {
    case menuTypes.NEW_PRODUCT:
      return (
        <div style={generalStyle}>
          <NewProduct />
        </div>
      );
    case menuTypes.UPDATE_PRODUCT:
      return (
        <div style={generalStyle}>
          <UpdateProduct />
        </div>
      );
    case menuTypes.DELETE_PRODUCT:
      return (
        <div style={generalStyle}>
          <DeleteProduct />
        </div>
      );
    case menuTypes.NEW_USER:
      return (
        <div style={generalStyle}>
          <NewUser />
        </div>
      );
    case menuTypes.UPDATE_USER:
      return (
        <div style={generalStyle}>
          <UpdateUser />
        </div>
      );
    case menuTypes.DELETE_USER:
      return (
        <div style={generalStyle}>
          <DeleteUser />
        </div>
      );
    case menuTypes.LIST_USERS:
      return (
        <div style={generalStyle}>
          <ListUsers />
        </div>
      );
    case menuTypes.SALES:
      return (
        <div style={generalStyle}>
          <Sales />
        </div>
      );

    default:
      console.log("default");
      break;
  }
}
