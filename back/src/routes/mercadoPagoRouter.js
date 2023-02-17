const server = require("express").Router();
require("dotenv").config();
const { REACT_APP_BACK_URL } = process.env;


const mercadopago = require("mercadopago");

mercadopago.configure({ access_token: process.env.ACCESS_TOKEN });

server.post("/payment", async(req,res, next)=>{
    let back_url = `${REACT_APP_BACK_URL}`;
    try{

      console.log("entro al back")
      // const {cartId, userId, cartItems} = req.body;
         
      // let items = cartItems.map((element)=>({
      //   id: element.id,
      //   title: element.name,
      //   unit_price: Number(element.price),
      //   quantity: Number(element.cantidad) || 1
      // }));

      //   let preference = {
      //       items,
      //       back_urls:{
      //           success: "http://localhost:3000",
      //           failure: "",
      //           pending: ""
      //       },
      //       auto_return: "approved",
      //       binary_mode: true,
      //   }
       

      const { cartId, userId, cartItems } = req.body;
      let items = cartItems.map((i) => ({
        title: i.name,
        unit_price: Number(i.price),
        quantity: Number(i.cantidad) || 1,
        id: i.id.toString(),
      }));
      let preference = {
        items,
       // external_reference: `${cartId}-${userId}`,
        // payment_methods: {
        //   excluded_payment_types: [{ id: "atm" }],
        //   installments: 3,
        // },
        back_urls: { success: "http://localhost:3000", failure: back_url, pending: back_url },
         auto_return: 'approved',
        shipments: {
          receiver_address: {
            zip_code: "",
            street_name: "",
            street_number: 11,
            floor: "",
            apartment: "",
          },
        }
      };

        const mercadoResponse = await mercadopago.preferences.create(preference);
        return res.json( mercadoResponse );
        // await mercadopago.preferences.create(preference)
        // .then((res)=> console.log(res))
        // .catch((error)=> console.log(error))


    }catch(error){
     next(error);
    }
});


// server.get("/pagos", async (req, res, next)=>{
//    console.log("entro a get")

// })

module.exports = server;