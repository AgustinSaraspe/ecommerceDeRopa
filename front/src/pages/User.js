import React from "react";

import { useSelector } from "react-redux";

function User() {
  const userActual = useSelector((state) => state.user);

  return (
    <div>
      <h1>{userActual.user.name}</h1>
    </div>
  );
}

export default User;
