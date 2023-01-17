const {Router} = require("express");
const {postDetailCart, getDetailCart} = require("../controllers/detailControllers");

const detailRouter = Router();


detailRouter.post("/", async (req, res, next)=>{
    try{
      const {cart} = req.body;
      const result = await postDetailCart(cart);
      res.status(200).json(result);
    }catch(error){
        next(error);
    };
});

detailRouter.get("/:idCart", async (req,res,next)=>{
 try{
    const {idCart} = req.params;
    const result = await getDetailCart(idCart);
    res.status(200).json(result);
 }catch(error){
    next(error);
 }
});


module.exports = detailRouter; 
