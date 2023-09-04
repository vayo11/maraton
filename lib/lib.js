require('dotenv-safe').config();
fs = require('fs');
const swaggerOptions = require('../swagger.json');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDocs = swaggerJSDoc(swaggerOptions);
const express = require('express');

const app = express();



const respuestaGenerateSwagger = fs.writeFileSync('swagger-generate.json', JSON.stringify(swaggerDocs));

const swaggerUI = require('swagger-ui-express');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.get('/api-docs-spec', async (req, res) => { return res.status(200).json(swaggerDocs) });




app.use(express.json());

function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(403);
    jwt.verify(token, "secret_key", (err, user) => {
       if (err) return res.sendStatus(404);
       req.user = user;
       next();
    });
  }

module.exports = {
    app: app,
   
};