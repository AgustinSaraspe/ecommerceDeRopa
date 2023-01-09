const { Cart } = require("../db.js");

//Trae todos los carritos
const getAllCarts = async () => {
  try {
    let allCarts = await Cart.findAll({
      //
    });
    return allCarts.map((e) => valuesToReturn(e.toJSON()));
  } catch (error) {
    throw new Error(error);
  }
};

//Trae carrito por id
const getOneCart = async (id) => {
  try {
    let cart = await Cart.findByPk(id, {
      //
    });
    if (!cart) throw new Error(`No se encontró carrito con id: ${id}`);
    return valuesToReturn(cart);
  } catch (error) {
    throw new Error(error);
  }
};

//Crea un nuevo carrito
const createCart = async (state, date) => {
  try {
    if (!state || !date) throw new Error("Falta un argumento");
    const resultado = await Cart.findOne({
      where: {
        //
      },
    });
    if (resultado) throw new Error("El carrito ya existe");

    let cart = await Cart.create({
      state,
      date,
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

const valuesToReturn = (value) => {
  return {
    id: value.id,
    state: value.state,
    date: value.date,
    // category: value.Categories.map(el=>el.name),
  };
};
