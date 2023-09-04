
const consentsService= require('../services/personaJurdicaService')
const jwt = require('jsonwebtoken');

const controller = {
    consultaPersonaJuridica: async (req, res, next)=> {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (token == null)  return res.sendStatus(403);
        jwt.verify(token, "secret_key", (err) => {
           if (err) {
            res.sendStatus(401);
           }else{
            const response =  consentsService.consultaPersonaJuridica();
            if (response?.error) {
                return res.status(response.error.status).json(response);
            }
            return res.json(response)
           
         }
        });
    
    }, 
    generacionToken: async(req, res)=>{
        console.log("Ingreso aca numero 14")
        const id  = req.body.id;
        const username = req.body.username;
        const password = req.body.password;
        jwt.sign(id , 'secret_key' , (err,token) => {
           if(err){
              res.status(400).send({msg : 'Error'})
           }
          else {
              res.send({msg:'success' , token: token})
           }
        })
    }

};

module.exports = controller;