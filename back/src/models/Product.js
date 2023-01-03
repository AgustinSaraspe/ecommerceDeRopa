const {DataTypes} = require("sequelize");


module.exports = (sequelize) =>{
  sequelize.define("Product", {
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    }   
  },
  {
    timestamps: false
   }
  )
}