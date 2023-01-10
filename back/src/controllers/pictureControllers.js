const {Picture} = require("../db.js");


const postPicture = async (url)=>{
    if(!url) throw new Error("La url es requerida");
    const result = await Picture.create(url);
    return result;
};


const getPicture = async (id) =>{
    if(!id) throw new Error("El id es requerido");
    const result = await Picture.findByPk(id);
    if(!id) throw new Error("Imagen no encontrada");
    return result;
};

const getPictureProduct = async (idProduct) =>{
    if(!idProduct) throw new Error("Es requerido el id producto");
    const result = await Picture.findAll({where:{
        idProduct: idProduct
    }});
    return result;
};

const detelePicture = async (id) =>{
    if(!id) throw new Error("Es requerido el id");
    await Picture.destroy({where:{id:id}});
};


module.exports = {
    postPicture,
    getPicture,
    getPictureProduct,
    detelePicture
};