const { Router } = require("express");
const commentaryRouter = Router();
const {
  getAllCommentaries,
  getOneCommentary,
  createCommentary,
  updateCommentary,
  deleteCommentary,
} = require("../controllers/commentaryControllers.js");

commentaryRouter.get("/all/:productId", async (req, res, next) => {
  try {
    const {productId} = req.params;
    const commentaries = await getAllCommentaries(productId);

    res.status(201).json(commentaries);
  } catch (error) {
    next(error);
  }
});

commentaryRouter.get("/:id", async (req, res, next) => {
  try {
    const commentary = await getOneCommentary(req.params.id);

    res.status(201).json(commentary);
  } catch (error) {
    next(error);
  }
});

commentaryRouter.post("/", async (req, res, next) => {
  try {
    const { message, idUser, idProduct } = req.body;
    const result = await createCommentary(message,idUser, idProduct);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

commentaryRouter.put("/:id", async (req, res, next) => {
  try {
    const update = await updateCommentary(req.body, req.params.id);
    if (!update)
      res.status(404).json({ message: "No hay una comentario con ese id!" });
    res.status(200).json({ message: "Comentario modificado con exito!" });
  } catch (error) {
    next(error);
  }
});

commentaryRouter.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await deleteCommentary(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ message: "No existe un comentario con ese id!" });
    return res.status(200).json({ message: "Comentario eliminado con exito!" });
  } catch (error) {
    next(error);
  }
});

module.exports = commentaryRouter;
