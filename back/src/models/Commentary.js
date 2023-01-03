const {DataTypes} = require("sequelize");


module.exports = (sequelize) =>{
  sequelize.define("Commentary", {
    message:{
        type: DataTypes.STRING,
        allowNull: false
    }   
  }
  )
}