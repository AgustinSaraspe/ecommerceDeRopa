const {Voucher, User, Cart} = require("../db.js");


const getVoucher = async (idUser) =>{
    try{
        if(!idUser) throw new Error("el id usuario es requerido");
        let userVoucher = await Voucher.findAll({where:{
            UserId: idUser
        }});
        console.log(userVoucher)
        return userVoucher;
    }catch(error){
        throw new Error(error);
    }
};

const postVoucher = async (wayToPay, price,idUser,idCart) =>{
   if(!wayToPay || !price) throw new Error("Falta un argumento");
   if(isNaN(price)) throw new Error("El precio no es numero");

   //relacion 
   const userVoucher = await User.findByPk(idUser);     
   if(!userVoucher) throw new Error("user no encontrado");

   const result = await Voucher.create({
    wayToPay,
    price,
    CartId: idCart
   });
    
   userVoucher.addVoucher(result);

   return result;
};


const getAllVouchers = async () =>{
   const result = await Voucher.findAll();
   if(!result) throw new Error("No se encontraron comprobantes");
   console.log(result)
   return result;
};


module.exports = {
    getVoucher,
    getAllVouchers,
    postVoucher
};
