import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BasicModal } from "../utils/Modal.js";

function User() {
  const [user, setUser] = useState(null);

  let stringiUser = localStorage.getItem("user");

  useEffect(() => {
    if (!stringiUser) {
      return;
    }
    setUser(JSON.parse(stringiUser));
  }, [stringiUser]);

  return <div>{!user ? <BasicModal /> : <h1>{user.name}</h1>}</div>;
}

export default User;
