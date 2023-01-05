const { Router } = require("express");
const productRouter = Router();
const {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controllers.js");

productRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();

    res.status(201).json(products);
  } catch (error) {
    next(error);
  }
});

productRouter.get("/:id", async (req, res, next) => {
  try {
    const product = await getOneProduct(req.params.id);

    res.json(product);
  } catch (error) {
    next(error);
  }
});

productRouter.post("/", async (req, res, next) => {
  try {
    const { name, price, stock, state, description } = req.body;
    const result = await createProduct(name, price, stock, state, description);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

productRouter.put("/:id", async (req, res, next) => {
  try {
    const update = updateProduct(req.body, req.params.id);
    if (!update)
      return res
        .status(404)
        .json({ message: "No hay un producto con ese id! " });
    res.status(200).json({ message: "Producto modificado con exito!" });
  } catch (error) {
    next(error);
  }
});

productRouter.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await deleteProduct(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ message: "No hay un producto con ese id!" });
    return res.status(200).json({ message: "Producto eliminado con exito!" });
  } catch (error) {
    next(error);
  }
});

module.exports = productRouter;
