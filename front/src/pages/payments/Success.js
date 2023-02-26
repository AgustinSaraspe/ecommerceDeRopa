import axios from "axios";
import React from "react";

const Success = () => {
  const getPayment = async () => {
    const pymnt_id = localStorage.getItem("id_payment");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    };
    if (pymnt_id) {
      try {
        const data = await axios.get(
          `http://localhost:3001/mercadopago/payment/${pymnt_id}`,
          config
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No se encontró el payment id");
    }
  };

  getPayment();

  return (
    <div>
      <h1>Success</h1>
    </div>
  );
};

export default Success;
