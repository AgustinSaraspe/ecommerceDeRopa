const server = require("express").Router();
require("dotenv").config();
const { Cart, Product, Detail, Voucher } = require("../db.js");
const mercadopago = require("mercadopago");
const {
  createPayment,
  getPayment,
} = require("../controllers/paymentControllers");

mercadopago.configure({ access_token: process.env.ACCESS_TOKEN });

server.post("/payment", async (req, res, next) => {
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
  try {
    let cart = await Cart.findByPk(cartId);
    setTimeout(async () => {
      let updateState = "cancelled";
      let factura = await comprobante(external_reference);
      console.log("FACTURA: ", factura);
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
            Total: parseFloat(carrito[i].price),
            Quantity: Number(carrito[i].quantity),
            ProductId: Number(carrito[i].ProductId),
            CartId: Number(cartId),
          });
          await Voucher.create({
            wayToPay: factura.wayToPay,
            price: parseFloat(factura.totalUltimaCompra),
            UserId: Number(userId),
            CartId: Number(cartId),
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
    let wayToPay = results[results.length - 1].payment_type_id;
    return { totalUltimaCompra, cart, status, wayToPay };
  } catch (error) {
    return {
      totalUltimaCompra: 0,
      cart: [],
      status: "rejected",
      wayToPay: "none",
    };
  }
};

module.exports = server;
