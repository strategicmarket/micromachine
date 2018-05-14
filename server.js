
////////////////////////////////////////////////////////////////
////////             strategicmachines.io              ////////
//////           developer testing workbench           ///////
//////       c xio 2017 - all rights reserved         ///////
///////////////////////////////////////////////////////////

require('dotenv').config()

const express =            require('express');
const path =               require('path');
const bodyParser =         require('body-parser');

const app =   express();

//////////////////////////////////////////////////////////////////////////
////////////////////  Register Middleware       /////////////////////////
////////////////////////////////////////////////////////////////////////

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//////////////////////////////////////////////////////
////////// Register and Config Skill Bundles/////////
////////////////////////////////////////////////////

// routes for general api handling
const log =         express.Router()
const auth =        express.Router();
const help =        express.Router();
const errs =        express.Router();
const unk =         express.Router();

require('../routes/log')(log);
require('../routes/auth')(auth);
require('../routes/help')(help);
require('../routes/error')(errs);
require('../routes/unk')(unk);


// routes for triggering skill bundles
const banter =      express.Router();
const sale =        express.Router();
const ship =        express.Router();

require('../skills/banter')(banter);
require('../skills/sale')(sale);
require('../skills/ship')(ship);



//////////////////////////////////////////////////////////////////////////
///////////////////////////// API CATALOGUE /////////////////////////////
////////////////////////////////////////////////////////////////////////

// log everything
app.use(log)
// auth everything
app.use(auth)
// help
app.get('/', help)
// text > twilio > server process
app.use('/api/sms', sms)
// web > twilio > text
app.use('/api/web', web)
// db api
app.use('/api/db', db)
// 404
app.use(unk)
// error handling
app.use(errs)

// server
let port = process.env.PORT || keys.port;

app.listen(port, () => {
  console.log(b('listening on port '), port)
});

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
