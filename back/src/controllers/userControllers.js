const { User } = require("../db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//POST
const postUser = async (
  name,
  email,
  state,
  admin,
  password,
  address,
  phone
) => {
  try {
    let newPassword = bcrypt.hashSync(password, 10);

    const [result, created] = await User.findOrCreate({
      where: {
        email: email,
      },
      defaults: {
        name,
        email,
        state,
        admin,
        password: newPassword,
        address,
        phone,
      },
    });

    let token = jwt.sign({ user: result }, "secret_word", {
      expiresIn: "24h",
    });

    return {
      user: result,
      token: token,
    };
  } catch (err) {
    throw new Error(err);
  }
};

const logIn = async (email, password) => {
  const result = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!result) throw new Error("El usuario no existe");

  if (bcrypt.compareSync(password, result.password)) {
    let token = jwt.sign({ user: result }, "secret_word", {
      expiresIn: "24h",
    });

    return {
      user: result,
      token: token,
    };
  } else {
    throw new Error("Contraseña incorrecta");
  }
};

//GET
const getUser = async (email) => {
  const user = await User.findByPk(email);
  if (!user) throw new Error("Usuario no encontrado");
  return user;
};

const getAllUsers = async () => {
  let allUsers = await User.findAll();
  if (!allUsers.length) throw new Error("No se encontro usuarios");
  return allUsers;
};

//PUT
const updateUser = async (
  id,
  name,
  email,
  state,
  admin,
  password,
  address,
  phone
) => {
  if (!id || !name || !email || !state || !password || !address || !phone)
    throw new Error("Falta un argumento");

  await User.update(
    {
      name,
      email,
      state,
      admin: admin !== true ? false : true,
      password,
      address,
      phone,
    },
    {
      where: { id: id },
    }
  );
};

//DELETE
const deleteUser = async (id) => {
  if (!id) throw new Error("Falta el argumento");
  await User.destroy({ where: { id: id } });
};

module.exports = {
  getUser,
  getAllUsers,
  postUser,
  updateUser,
  deleteUser,
  logIn,
};
