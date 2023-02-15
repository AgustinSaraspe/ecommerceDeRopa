const { Cart } = require("../db.js");

//Trae todos los carritos
const getAllCarts = async () => {
  try {
    let allCarts = await Cart.findAll();
    return allCarts;
  } catch (error) {
    throw new Error(error);
  }
};

//Trae todos los carritos de un usuario
const getOneCart = async (idUser) => {
  try {
    let cart = await Cart.findAll({where:{
      UserId: idUser
    }});
    return cart;
  } catch (error) {
    throw new Error(error);
  }
};

//Crea un nuevo carrito
const createCart = async (idUser,totalPrice) => {
  try {
    if (!idUser) throw new Error(`Falta un argumento id`);
    if (!totalPrice) throw new Error(`Falta un argumento totalPrice`);
    
    let cart = await Cart.create({
      UserId: idUser,
      totalPrice
    });
    return cart;
  } catch (error) {
    throw new Error(error);
  }
};

//Modifica un carrito existente
const updateCart = async (body, id) => {
  try {
    let updated = await Cart.update(
      { ...body },
      {
        where: {
          id,
        },
      }
    );
    return updated;
  } catch (error) {
    throw new Error(error);
  }
};

//Elimina un carrito
const deleteCart = async (id) => {
  try {
    let deleted = await Cart.destroy({
      where: {
        id,
      },
    });
    if (!deleted) throw new Error("No se encontró el carrito");
    return deleted;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllCarts,
  getOneCart,
  createCart,
  updateCart,
  deleteCart,
};


