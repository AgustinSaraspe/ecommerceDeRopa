const server = require("express").Router();
require("dotenv").config();
const { Cart, Product, Detail } = require("../db.js");
const mercadopago = require("mercadopago");
const {
  createPayment,
  getPayment,
} = require("../controllers/paymentControllers");

mercadopago.configure({ access_token: process.env.ACCESS_TOKEN });

server.post("/payment", async (req, res, next) => {
  // try {
  //   const { cartItems } = req.body;

  //   let items = cartItems.map((element) => ({
  //     id: element.id,
  //     title: element.name,
  //     unit_price: Number(element.price),
  //     quantity: Number(element.cantidad) || 1,
  //   }));

  //   let preference = {
  //     items,
  //     back_urls: {
  //       success: "http://localhost:3000",
  //       failure: "",
  //       pending: "",
  //     },
  //     auto_return: "approved",
  //     binary_mode: true,
  //   };

  //   mercadopago.preferences
  //     .create(preference)
  //     .then((response) => res.status(200).send({ response }))
  //     .catch((error) => res.status(400).send({ error: error.message }));
  // } catch (error) {
  //   next(error);
  // }
  try {
    const { cartId, userId, cartItems, email } = req.body;
    const payment = await createPayment(cartId, userId, cartItems, email);
    res.json({ payment });
  } catch (error) {
    next(error);
  }
});

server.get("/payment", async (req, res, next) => {
  let reference = req.query.external_reference.split("-");
  let external_reference = req.query.external_reference.toString();
  let cartId = Number(reference[0]);
  let userId = reference[1];
  console.log("REFERENCE: ", reference);
  console.log("EXTERNAL REFERENCE: ", external_reference);
  console.log("cart id: ", cartId);
  console.log("user id: ", userId);

  try {
    let cart = await Cart.findByPk(cartId);
    setTimeout(async () => {
      let updateState = "cancelled";
      let factura = await comprobante(external_reference);
      console.log("Factura: ", factura);
      let carrito = factura.cart?.map((el) => {
        return {
          quantity: Number(el.quantity),
          price: Number(el.unit_price) * Number(el.quantity),
          CartOrderN: Number(cartId),
          ProductId: Number(el.id),
        };
      });
      if (factura.status === "approved") {
        updateState = "completed";
        for (let i = 0; i < carrito.length; i++) {
          let product = await Product.findByPk(Number(carrito[i].ProductId));
          product.stock = product.stock - Number(carrito[i].quantity);
          if (product.stock === 0) {
            product.availability = false;
          }
          await product.save();
          await Detail.create({
            quantity: Number(carrito[i].price) * Number(carrito[i].quantity),
            CartOrderN: Number(cartId),
            ProductId: Number(carrito[i].ProductId),
            UserEmail: userId,
          });
        }
      }
      if (factura.status === "in_process") updateState = "processing";
      await cart.update(
        {
          state: updateState,
          totalPrice:
            factura.status === "approved" || factura.status === "processing"
              ? factura.totalUltimaCompra
              : 0,
        },
        { where: { orderN: cartId } }
      );
      return res.redirect(process.env.REACT_APP_FRONT_URL);
    }, [2000]);
  } catch (error) {
    next(error);
  }
  // try {
  //   const id = req.query.pymnt_id;
  //   const paymentData = await getPayment(id);
  //   res.json({ paymentData });
  // } catch (error) {
  //   next(error);
  // }
});

const comprobante = async (id) => {
  const mp = new mercadopago(process.env.ACCESS_TOKEN);
  try {
    let {
      body: { results },
    } = await mp.get(`/v1/payments/search`, { external_reference: id });
    let totalUltimaCompra =
      results[results.length - 1].transaction_details.total_paid_amount;
    let cart = results[results.length - 1].additional_info.items;
    let status = results[results.length - 1].status;
    return { totalUltimaCompra, cart, status };
  } catch (error) {
    return { totalUltimaCompra: 0, cart: [], status: "rejected" };
  }
};

module.exports = server;
