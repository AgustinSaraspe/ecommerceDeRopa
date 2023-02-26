const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Voucher", {
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    wayToPay: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
    },
  });
};
