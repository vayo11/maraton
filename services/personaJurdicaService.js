const axios = require("axios");

var MongoClient = require("mongodb").MongoClient

var url = "mongodb://localhost:27017/juridico"

const ConsentsService = {
    consultaPersonaJuridica: async () => { 
          var config = {
            method: 'get',
            url: `http://wsruc.com/Ruc2WS_JSON.php?tipo=2&ruc=20600892470&token=cXdlcnR5bGFtYXJja19zYUBob3RtYWlsLmNvbXF3ZXJ0eQ==`,
            headers: { 
              'Content-Type': 'application/json'
            },
          };      
    return axios(config)
  .then(function (response) {
    console.log(response.data) 
    MongoClient.connect(url,function(err,db){
      db.collection('usuario').insertOne({
          ruc:response.data.ruc,
          rasonSocial: response.data.razon_social,
          estado: response.data.estado,
          direccion:response.data.direccion,
          ubigeo:response.data.ubigeo,
          departamento: response.data.departamento,
          provincia:response.data.provincia,
          distrito:response.data.distrito
      })
     })

   })
.catch(function (error) {
  console.log(error);
});

    }
}

module.exports = ConsentsService