const {DataTypes} = require("sequelize");


module.exports = (sequelize) =>{
  sequelize.define("Product", {
    url:{
        type: DataTypes.STRING,
        allowNull: false
    }   
  },
  {
    timestamps: false
   }
  )
}