const { Detail, Product, Cart } = require("../db.js");

const getAllDetails = async () => {
  const details = await Detail.findAll();
  return details;
};

const getDetailCart = async (idCart) => {
  if (!idCart) throw new Error("El id cart es requerido");
  const detail = await Detail.findAll({
    where: {
      CartId: idCart,
    },
    include: [{ model: Product }],
  });
  return detail;
};

const getDetailUser = async (UserId) => {
  if (!UserId) throw new Error("El id del usuario es requerido");
  const detail = await Detail.findAll({
    where: {
      UserId: UserId,
    },
    include: [{ model: Product }],
  });
  return detail;
};

//pendiente
const postDetailCart = async (cart) => {
  if (!cart.length === 0) throw new Error("Carro vacio");

  cart.forEach(async (e) => {
    await Detail.create(e);
  });
};

module.exports = {
  postDetailCart,
  getDetailCart,
  getAllDetails,
  getDetailUser,
};
