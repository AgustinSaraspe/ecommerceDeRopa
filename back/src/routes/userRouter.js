const { Router } = require("express");
const {
  postUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  logIn,
  // superUser,
} = require("../controllers/userControllers.js");

const userRouter = Router();

userRouter.get("/:email", async (req, res, next) => {
  const { email } = req.params;
  try {
    const user = await getUser(email);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/", async (req, res, next) => {
  const { name, email, state, admin, password, address, phone } = req.body;
  try {
    const newUser = await postUser(
      name,
      email,
      state,
      admin,
      password,
      address,
      phone
    );
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
});

// userRouter.get("/superUser", async (req, res, next) => {
//   try {
//     console.log("entra a ROUTE");
//     const result = await superUser();
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

userRouter.post("/logIn", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const newUser = await logIn(email, password);
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
});

userRouter.put("/:id", async (req, res, next) => {
  try {
    const update = updateUser(req.body, req.params.id);
    if (!update)
      return res
        .status(404)
        .json({ message: "No hay un usuario con ese id! " });
    res.status(200).json({ message: "Usuario modificado con exito!" });
  } catch (error) {
    next(error);
  }
});

userRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await deleteUser(id);
    res.status(200).json("Done");
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
