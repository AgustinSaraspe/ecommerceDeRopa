const { Router } = require('express')
const userRouter = require("./userRouter.js");
const productRouter = require("./productRouter.js");
const detailRouter = require("./detailRouter.js");
const pictureRouter = require("./pictureRouter.js");
const voucherRouter = require("./voucherRouter.js");


const router = Router()

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/detail", detailRouter);
router.use("/picture", pictureRouter);
router.use("/voucher", voucherRouter);


module.exports = router;
