const { Router } = require("express");
const userRouter = require("./userRouter.js");
const productRouter = require("./productRouter.js");
const categoryRouter = require("./categoryRouter.js");
const cartRouter = require("./cartRoutes.js");
const commentaryRouter = require("./commentaryRoutes.js");
const router = Router();

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/cart", cartRouter);
router.use("/commentary", commentaryRouter);

module.exports = router;
