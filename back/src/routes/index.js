const { Router } = require("express");
const productRouter = require("./productRouter.js");
const router = Router();

/* const PaymentController = require('../Controllers/PaymentController')
const PaymentService = require('../services/PaymentService')
const PaymentInstance = new PaymentController(new PaymentService()) */

//mercado pago get de info del producto

router.use("/products", productRouter);

module.exports = router;
