const axios = require("axios");
const { get } = require("../routes/mercadoPagoRouter");
require("dotenv");

const createPayment = async (cartId, userId, cartItems, email) => {
  const url = "https://api.mercadopago.com/checkout/preferences";
  const back_url = `${process.env.REACT_APP_BACK_URL}/mercadopago/payment`;
  let items = cartItems.map((product) => ({
    id: product.id.toString(),
    title: product.name,
    unit_price: Number(product.price),
    quantity: Number(product.cantidad) || 1,
  }));

  const body = {
    payer_email: email,
    items,
    external_reference: `${cartId}-${userId}`,
    back_urls: {
      success: back_url,
      failure: back_url,
      pending: back_url,
    },
  };
  try {
    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    // console.log(payment.data);
    return payment.data;
  } catch (error) {
    throw new Error(error);
  }
};

const getPayment = async (id) => {
  const url = `https://api.mercadopago.com/v1/payments/${id}`;
  try {
    const data = axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { createPayment, getPayment };
