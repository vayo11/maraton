const express = require('express')
const mapUrls = require('./url_mappings.js')
const app = express()
require('dotenv-safe').config()
const port = process.env.PORT

async function startApplication() {
  app.use("/", mapUrls)
  app.disable("x-powered-by")
  app.set('trust proxy', true)
  app.listen(port, () => {
    console.log(`App listening at port ${port}`)
  })
}

module.exports = startApplication