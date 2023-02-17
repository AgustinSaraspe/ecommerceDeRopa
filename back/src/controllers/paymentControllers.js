const axios = require("axios");
require("dotenv");

export const createPayment = async (cartItems) => {
  const url = "https://api.mercadopago.com/checkout/preferences";
  let items = cartItems.map((product) => ({
    id: product.id,
    title: product.name,
    unit_price: Number(product.price),
    quantity: Number(product.cantidad) || 1,
  }));

  const body = {
    payer_email: "comprador@email.com",
    items,
    back_urls: {
      success: "http://localhost:3000",
    },
  };
  try {
    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    return payment.data;
  } catch (error) {
    throw new Error(error);
  }
};
