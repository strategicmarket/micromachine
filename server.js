
////////////////////////////////////////////////////////////////
////////             strategicmachines.io              ////////
//////           developer testing workbench           ///////
//////       c xio 2017 - all rights reserved         ///////
///////////////////////////////////////////////////////////

require('dotenv').config()

const express =            require('express');
const path =               require('path');
const bodyParser =         require('body-parser');
const Winston =            require('winston')

const app =   express();

const port = process.env.port || 8080

const handleRequest = (request, response) => {
  Winston.info(`Route requested: ${request.url}`)
  dispatcher.dispatch(request, response)
}

const server = Http.createServer(handleRequest)
require('./routes')(dispatcher)

exports.listen = () => {
  server.listen(port, () => {
    Winston.info(`Http server listening on http://localhost:${port}`)
  })
}

exports.close = (next) => {
  server.close(next)
}

console.log(process.env)

const startServer = process.argv.find((n) => n === '--start')
if (startServer) {
  exports.listen()
}
