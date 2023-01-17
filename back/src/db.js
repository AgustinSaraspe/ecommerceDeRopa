const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const {
  dbUser,
  dbPassword,
  dbHost,
  dbName,
  dbPort,
} = require("./utils/config");

// Defino los parametros de conexión con la base de datos mediante una instancia de Sequelize
let sequelize = new Sequelize(
  `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`,
  { logging: false, native: false }
);

// Pruebo si la conexión está bien.
(async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "The connection to the database has been established successfully."
    );
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
})();

// Requiero e introduzco cada funcion de modelo en el array "modelDefiners".
const basename = path.basename(__filename);
const modelDefiners = [];
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Defino cada modelo pasandole el parametro "sequelize" a cada funcion de modelo.
modelDefiners.forEach((model) => model(sequelize));

// Renombro cada modelo en formato PascalCase.
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Extraigo cada modelo.
const { Product, User, Detail, Picture, Voucher, Commentary, Category, Cart } = sequelize.models;

//Relaciones
User.hasMany(Commentary); 
Commentary.belongsTo(User);

User.hasMany(Cart); 
Cart.belongsTo(User);

User.hasMany(Voucher); 
Voucher.belongsTo(User);

Cart.hasOne(Voucher); 
Voucher.belongsTo(Cart);

Cart.hasMany(Detail); 
Detail.belongsTo(Cart);

Product.hasMany(Commentary);
Commentary.belongsTo(Product);

Product.hasMany(Detail); 
Detail.belongsTo(Product);

Product.hasMany(Picture); 
Picture.belongsTo(Product);

Product.belongsToMany(Category, {through: 'product_category'}) 
Category.belongsToMany(Product, {through: 'product_category'})


module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
