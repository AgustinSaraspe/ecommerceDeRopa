const { Product } = require("../db.js");

//Trae todos los productos
const getAllProducts = async () => {
  try {
    let allProducts = await Product.findAll({
      // include: { model: Category},
    });
    return allProducts.map((el) => valuesToReturn(el.toJSON()));
  } catch (error) {
    throw new Error(error);
  }
};

//Trae un producto por id
const getOneProduct = async (id) => {
  try {
    let product = await Product.findByPk(id, {
      // include : {model : Category},
    });
    if (!product) throw new Error(`No se encontró el producto con id: ${id}`);
    return valuesToReturn(product);
  } catch (error) {
    throw new Error(error);
  }
};

//Crea un nuevo producto
const createProduct = async (name, price, stock, state, description) => {
  try {
    //Comprobamos que todos los argumentos esten definidos.
    // if (!name || !price || !stock || !state || !description)
    //   throw new Error("El argumento no esta definido");
    //Comprobamos que los argumentos price y stock sean numeros.
    if (isNaN(price) || isNaN(stock))
      throw new Error("El argumento no es un numero");
    //Pasamos el argumento nombre a minuscula para evitar errores
    let newName = name.toLowerCase();
    //Comprobamos que el producto no exista
    const resultado = await Product.findOne({
      where: {
        name: newName,
      },
    });
    if (resultado) throw new Error("El producto ya existe");

    //En caso de pasar todas las validaciones, creamos el producto :D
    const nuevoProducto = await Product.create({
      name,
      price,
      stock,
      state,
      description,
    });
    return nuevoProducto;
  } catch (error) {
    throw new Error(error);
  }
};

//Modifica la data de un producto existente.
const updateProduct = async (body, id) => {
  try {
    let updated = await Product.update(
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

const deleteProduct = async (id) => {
  try {
    let deleted = await Product.destroy({
      where: {
        id,
      },
    });
    return deleted;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

const valuesToReturn = (value) => {
  return {
    id: value.id,
    name: value.name,
    description: value.description,
    price: value.price,
    state: value.state,
    stock: value.stock,
    // category: value.Categories.map(el=>el.name),
  };
};
