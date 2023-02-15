const server = require("express").Router();
require("dotenv").config();
const { REACT_APP_BACK_URL } = process.env;


const mercadopago = require("mercadopago");

mercadopago.configure({ access_token: process.env.ACCESS_TOKEN });

server.post("/payment", (req,res)=>{
    let back_url = `${REACT_APP_BACK_URL}/mercadopago/pagos`;
    try{
      const {cartId, userId, cartItems} = req.body;
         
      let items = cartItems.map((element)=>({
        id: element.id,
        title: element.name,
        unit_price: Number(element.price),
        quantity: Number(element.cantidad) || 1
      }));

        let preference = {
            items,
            back_urls:{
                success: "http://localhost:3000",
                failure: "",
                pending: ""
            },
            auto_return: "approved",
            binary_mode: true,
        }
       
        mercadopago.preferences.create(preference)
        .then((response)=> res.status(200).send({response}))
        .catch((error)=> res.status(400).send({error: error.message}));
        
    }catch(error){
     next(error);
    }
  


  


});


module.exports = server;