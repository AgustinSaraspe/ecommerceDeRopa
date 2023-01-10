const { Commentary } = require("../db.js");

const getAllCommentaries = async () => {
  try {
    let allCommentaries = await Commentary.findAll();
    return allCommentaries.map((e) => valuesToReturn(e.toJSON()));
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

const createCommentary = async (message) => {
  try {
    let newCommentary = await Commentary.create({
      message,
    });
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
