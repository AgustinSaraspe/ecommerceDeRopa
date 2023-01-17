const {DataTypes} = require("sequelize");


module.exports = (sequelize) =>{
  sequelize.define("Picture", {
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