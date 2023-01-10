const { Category } = require("../db.js");

const getAllCategories = async () => {
  try {
    let allCategories = await Category.findAll();
    return allCategories.map((e) => valuesToReturn(e.toJSON()));
  } catch (error) {
    throw new Error(error);
  }
};

const getOneCategory = async (id) => {
  try {
    let category = await Category.findByPk(id);
    if (!category)
      throw new Error(`No se encontró el producto con el id: ${id}`);
    return valuesToReturn(category);
  } catch (error) {
    throw new Error(error);
  }
};

//Crea una nueva categoria
const createCategory = async (name) => {
  try {
    //Validaciones
    let newCategory = name.toLowerCase();
    let resultado = await Category.findOne({
      where: {
        name: newCategory,
      },
    });
    if (resultado) throw new Error("La categoria ya existe");

    //En caso que pase las validaciones creamos la nueva categoria
    const category = await Category.create({
      name,
    });
    return category;
  } catch (error) {
    throw new Error(error);
  }
};

//Modifica una categoria existente
const updateCategory = async (body, id) => {
  try {
    let updated = await Category.update(
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

//Elimina una categoria
const deleteCategory = async (id) => {
  try {
    let deleted = await Category.destroy({
      where: {
        id,
      },
    });
    if (!deleted) throw new Error("No se encontró la categoria");
    return deleted;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};

const valuesToReturn = (value) => {
  return {
    id: value.id,
    name: value.name,
    // category: value.Categories.map(el=>el.name),
  };
};
