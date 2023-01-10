const {Router} = require("express");
const {getAllVouchers,getVoucher,postVoucher} = require("../controllers/voucherControllers.js");

const voucherRouter = Router();

voucherRouter.get("/", async (req, res, next)=>{
  try{
    const result = getAllVouchers();
    res.status(200).json(result);
  }catch(error){
    next(error);
  }
});

voucherRouter.get("/:idUser", async (req, res, next)=>{
  try{
     const {idUser} = req.params;
     const result = getVoucher(idUser);
     res.status(200).json(result);
  }catch(error){
    next(error);
  }
});


voucherRouter.post("/", async (req,res,next)=>{
   try{
      const {wayToPay, price} = req.body;
      const result = postVoucher(wayToPay, price);
      res.status(200).json(result);
   }catch(error){
    next(error);
   }
});


module.exports = voucherRouter; 
