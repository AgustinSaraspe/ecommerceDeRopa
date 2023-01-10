const { Router } = require("express");
const categoryRouter = Router();
const {
  getAllCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryControllers.js");

categoryRouter.get("/", async (req, res, next) => {
  try {
    const categories = await getAllCategories();

    res.status(201).json(categories);
  } catch (error) {
    next(error);
  }
});

categoryRouter.get("/:id", async (req, res, next) => {
  try {
    const category = await getOneCategory(req.params.id);

    res.json(category);
  } catch (error) {
    next(error);
  }
});

categoryRouter.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await createCategory(name);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

categoryRouter.put("/:id", async (req, res, next) => {
  try {
    const update = updateCategory(req.body, req.params.id);
    if (!update)
      res.status(404).json({ message: "No hay una categoria con ese id!" });
    res.status(200).json({ message: "Categoria modificada con exito!" });
  } catch (error) {
    next(error);
  }
});

categoryRouter.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await deleteCategory(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ message: "No existe la categoria con ese id!" });
    return res.status(200).json({ message: "Categoria eliminada con exito!" });
  } catch (error) {
    next(error);
  }
});

module.exports = categoryRouter;
