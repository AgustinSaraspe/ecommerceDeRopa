const {Router} = require("express");
const {getPicture, getPictureProduct, postPicture, detelePicture} = require("../controllers/pictureControllers.js");

const pictureRouter = Router();


pictureRouter.post("/", async (req, res, next)=>{
    try{
       const {url} = req.body;
       const result = await postPicture(url);
       res.status(200).json(result);
    }catch(error){
        next(error);
    };
});

pictureRouter.get("/:id", async (req, res, next)=>{
    try{
        const {id} = req.params;
        const result = await getPicture(id);
        res.status(200).json(result);
    }catch(error){
        next(error);
    }
});

pictureRouter.get("/pictureProduct/:idProduct", async (res, req, next)=>{
   try{
     const {idProduct} = req.params;
     const result = await getPictureProduct(idProduct);
     res.status(200).json(result);
    }catch(error){
        next(error);
    };
});

pictureRouter.delete("/:id", async (req,res,next)=>{
    const {id} = req.params;
    try{
        const result = await detelePicture(id);
        res.status(200).json("Done");
    }catch(error){
        next(error);
    }
});


module.exports = pictureRouter; 