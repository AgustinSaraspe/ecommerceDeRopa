const { Router } = require('express')
const userRouter = require("./userRouter.js");
const productRouter = require("./productRouter.js");
const detailRouter = require("./detailRouter.js");
const pictureRouter = require("./pictureRouter.js");
const voucherRouter = require("./voucherRouter.js");
const categoryRouter = require("./categoryRouter.js");
const cartRouter = require("./cartRoutes.js");
const commentaryRouter = require("./commentaryRoutes.js");
const mercadoPagoRouter = require("./mercadoPagoRouter.js");

const router = Router()

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/detail", detailRouter);
router.use("/picture", pictureRouter);
router.use("/voucher", voucherRouter);
router.use("/categories", categoryRouter);
router.use("/cart", cartRouter);
router.use("/commentary", commentaryRouter);
router.use("/mercadopago", mercadoPagoRouter);


module.exports = router;


