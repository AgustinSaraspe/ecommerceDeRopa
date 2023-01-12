const { Commentary, User, Product } = require("../db.js");

const getAllCommentaries = async (productId) => {
  try {
    if(!productId) throw new Error('El id producto es necesario');

    let allCommentaries = await Commentary.findAll({where:{
      ProductId: productId
    }});

    return allCommentaries;
  } catch (error) {
    throw new Error(error);
  }
};

//Traigo comentario por id
const getOneCommentary = async (id) => {
  try {
    let commentary = await Commentary.findByPk(id);
    if (!commentary) throw new Error(`No hay comentario con el id ${id}`);
    return valuesToReturn(commentary);
  } catch (error) {
    throw new Error(error);
  }
};

const createCommentary = async (message, idUser, idProduct) => {
  try {

    if(!message) throw new Error("El mensaje no puede estar vacio");
    //relaciones
    const userCommertary = await User.findByPk(idUser);
    if(!userCommertary) throw new Error("user no encontrado");
    
    const productCommertary = await Product.findByPk(idProduct);
    if(!productCommertary) throw new Error("product no encontrado");

    let newCommentary = await Commentary.create({
      message,
    });
    
    //relaciones
    userCommertary.addCommentary(newCommentary);
    productCommertary.addCommentary(newCommentary);


    return newCommentary;
  } catch (error) {
    throw new Error(error);
  }
};

const updateCommentary = async (body, id) => {
  try {
    let updated = await Commentary.update(
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

const deleteCommentary = async (id) => {
  try {
    let deleted = await Commentary.destroy({
      where: {
        id,
      },
    });
    if (!deleted) throw new Error("No se encontró el comentario");
    return deleted;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllCommentaries,
  getOneCommentary,
  createCommentary,
  updateCommentary,
  deleteCommentary,
};

const valuesToReturn = (value) => {
  return {
    id: value.id,
    message: value.message,
    date: value.date,
    // category: value.Categories.map(el=>el.name),
  };
};
