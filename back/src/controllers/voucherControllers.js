const {Voucher} = require("../db.js");


const getVoucher = async (idUser) =>{
    if(!idUser) throw new Error("el id usuario es requerido");
    const result = await Voucher.findAll({where:{
        idUser: idUser
    }});
    return result;
};

const postVoucher = async (wayToPay, price) =>{
   if(!wayToPay || !price) throw new Error("Falta un argumento");
   if(isNaN(price)) throw new Error("El precio no es numero");

   const result = await Voucher.create({
    wayToPay,
    price
   });
   //relacion pendiente
   return result;
};


const getAllVouchers = async () =>{
   const result = await Voucher.findAll();
   if(!result) throw new Error("No se encontraron comprobantes");
   return result;
};


module.exports = {
    getVoucher,
    getAllVouchers,
    postVoucher
};
