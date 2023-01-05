const {Router} = require("express");
const {postUser, getUser, getAllUsers,updateUser,deleteUser} = require("../controllers/userControllers.js");

const userRouter = Router();

userRouter.get("/:id", async(req,res, next)=>{
    const {id} = req.params;
    try{
        const user = await getUser(id);
        res.status(200).json(user);
    }catch(error){
        next(error);
    };
});

userRouter.get("/", async (req, res, next)=>{
    try{
        const users = await getAllUsers();
        res.status(200).json(users);
    }catch(error){
        next(error);
    }
});

userRouter.post("/", async (req,res,next)=>{
    const {name, email,state,admin,password,address,phone} = req.body;
    try{
        const newUser = await postUser(name, email,state,admin,password,address,phone);
        res.status(200).json(newUser);
    }catch(error){
        next(error);
    };
});


userRouter.put("/", async (req, res, next)=>{
    const {id,name, email,state,admin,password,address,phone} = req.body;
    try{
        const user = await updateUser(id,name, email,state,admin,password,address,phone);
        res.status(200).json("Done");
    }catch(error){
        next(error);
    }
});

userRouter.delete("/:id", async (req,res,next)=>{
    const {id} = req.params;
    try{
        const result = await deleteUser(id);
        res.status(200).json("Done");
    }catch(error){
        next(error);
    }
})


module.exports = userRouter;