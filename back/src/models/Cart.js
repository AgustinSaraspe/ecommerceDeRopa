const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Cart", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};
