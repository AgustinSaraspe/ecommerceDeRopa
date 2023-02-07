const {Picture, Product} = require("../db.js");


const postPicture = async (url, productName)=>{
    if(!url) throw new Error("La url es requerida");

    const pictureProduct = await Product.findOne({
        where:{
            name: productName
    }});
    if(!pictureProduct) throw new Error("Producto no encontrado");

    const result = await Picture.create({
        url
    });
    
    pictureProduct.addPicture(result);
    return result;
};


const getPicture = async (id) =>{
    try{
        if(!id) throw new Error("El id es requerido");
        const result = await Picture.findByPk(id);
        if(!id) throw new Error("Imagen no encontrada");
        return result;
    }catch(error){
        throw new Error(error);
    }
};

const getPictureProduct = async (idProduct) =>{
    if(!idProduct) throw new Error("Es requerido el id producto");
    const result = await Picture.findAll({where:{
        ProductId: idProduct
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