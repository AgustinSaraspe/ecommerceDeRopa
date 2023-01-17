const { Router } = require("express");
const cartRouter = Router();
const {
  getAllCarts,
  getOneCart,
  createCart,
  updateCart,
  deleteCart,
} = require("../controllers/cartControllers.js");

cartRouter.get("/", async (req, res, next) => {
  try {
    const carts = await getAllCarts();

    res.status(201).json(carts);
  } catch (error) {
    next(error);
  }
});

cartRouter.get("/:id", async (req, res, next) => {
  try {
    const cart = await getOneCart(req.params.id);

    res.json(cart);
  } catch (error) {
    next(error);
  }
});

cartRouter.post("/", async (req, res, next) => {
  try {
    const { idUser,totalPrice } = req.body;
    const result = await createCart(idUser,totalPrice);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

cartRouter.put("/:id", async (req, res, next) => {
  try {
    const update = await updateCart(req.body, req.params.id);
    if (!update)
      res.status(404).json({ message: "No hay un carrito con ese id!" });
    res.status(200).json({ message: "Carrito modificado con exito!" });
  } catch (error) {
    next(error);
  }
});

cartRouter.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await deleteCart(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "No existe carrito con ese id!" });
    return res.status(200).json({ message: "Carrito eliminado con exito!" });
  } catch (error) {
    next(error);
  }
});

module.exports = cartRouter;
