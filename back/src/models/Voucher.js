const {DataTypes} = require("sequelize");


module.exports = (sequelize) =>{
  sequelize.define("Voucher", {
    date:{
        type: DataTypes.STRING,
    },
   wayToPay: {
     type: DataTypes.STRING
    }, 
    price: {
        type: DataTypes.FLOAT
    }
  }
  )
}