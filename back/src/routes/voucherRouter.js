const {Router} = require("express");
const {getAllVouchers,getVoucher,postVoucher} = require("../controllers/voucherControllers.js");

const voucherRouter = Router();

voucherRouter.get("/:idUser", async (req, res, next)=>{
  try{
     const {idUser} = req.params;
     const voucher = await getVoucher(idUser);
     res.status(200).json(voucher);
  }catch(error){
    next(error);
  }
});


voucherRouter.get("/", async (req, res, next)=>{
  try{
    const vouchers = await getAllVouchers();
    res.status(200).json(vouchers);
  }catch(error){
    next(error);
  }
});



voucherRouter.post("/", async (req,res,next)=>{
   try{
      const {wayToPay, price, idUser, idCart} = req.body;
      const result = await postVoucher(wayToPay, price, idUser, idCart);
      res.status(200).json(result);
   }catch(error){
    next(error);
   }
});


module.exports = voucherRouter; 
