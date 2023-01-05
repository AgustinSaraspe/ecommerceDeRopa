
const { Router } = require('express')
const userRouter = require("./userRouter.js");
const router = Router()


router.use("/users", userRouter);


const { Router } = require("express");
const productRouter = require("./productRouter.js");
const router = Router();


router.use("/products", productRouter);

module.exports = router;
