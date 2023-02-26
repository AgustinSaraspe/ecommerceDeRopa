const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Detail", {
    Total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
