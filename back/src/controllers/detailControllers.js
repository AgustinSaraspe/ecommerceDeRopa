const {Detail, Product} = require("../db.js");


const getDetailCart = async (idCart) =>{

    if(!idCart) throw new Error("El id cart es requerido");
   const detail = await Detail.findAll({where:{
    idCart: idCart
   },
   include: [{model: Product}]
});
   return detail;
};



//pendiente
const postDetailCart = async(cart)=>{
    if(!cart.length === 0)throw new Error("Carro vacio");

    cart.forEach(async(e) => {
        await Detail.create(e); 
    });
};


module.exports = {
    postDetailCart,
    getDetailCart
};