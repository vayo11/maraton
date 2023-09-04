const app = require('../../lib/lib').app;
const verifyToken = require('../../lib/lib').verifyToken

const personaJuridicaController = require('../../controllers/personaJurdicaController');

app.post(
    '/consultaPersonaJuridica',
    personaJuridicaController.consultaPersonaJuridica
  );
 
app.post ('/generacionToken',
  personaJuridicaController.generacionToken
  )
  //Health check
  app.get('/ping', async (req, res) => { return res.status(200).json({ response: "Pong" }) })
  
  module.exports = app