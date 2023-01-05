const {User} = require("../db.js");


//POST
const postUser = async (name, email,state,admin,password,address,phone)=>{
    try{
        const [result, created] = await User.findOrCreate({
          where:{
            email: email
          },
          defaults: {
            name,
            email,
            state,
            admin,
            password,
            address,
            phone
          }
        });
        return result;
    } catch(err){
        throw new Error(err);
    }

};


//GET
const getUser = async(id) =>{
    const user = await User.findByPk(id);
    if(!user) throw new Error("Usuario no encontrado");
    return user;
};

const getAllUsers = async () =>{
    let allUsers = await User.findAll();
    if(!allUsers.length) throw new Error("No se encontro usuarios");
    return allUsers;
}


//PUT
const updateUser =  async (id,name, email,state,admin,password,address,phone) =>{
   if(!id ||!name || !email || !state || !password || !address || !phone) throw new Error("Falta un argumento");

   await User.update({
    name,
    email,
    state,
    admin: admin !== true ? false : true,
    password,
    address,
    phone
   },
   {
    where: {id: id}
   });
};


//DELETE
const deleteUser = async (id) =>{
    if(!id) throw new Error("Falta el argumento");
    await User.destroy({where:{id:id}});
};

module.exports = {
  getUser,
  getAllUsers,
  postUser,
  updateUser,
  deleteUser
};