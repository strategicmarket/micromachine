
////////////////////////////////////////////////////////////////
////////             strategicmachines.io              ////////
//////           developer testing workbench           ///////
//////       c xio 2017 - all rights reserved         ///////
///////////////////////////////////////////////////////////

require('dotenv').config()

const express =             require('express');
const path =                require('path');
const bodyParser =          require('body-parser');
const favicon =             require('serve-favicon');
const { g, b, gr, r, y } =  require('../console')

const app =   express();

//////////////////////////////////////////////////////////////////////////
////////////////////  Register Middleware       /////////////////////////
////////////////////////////////////////////////////////////////////////

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'));
app.use(favicon(path.join(__dirname, '..', '/public/assets/favicon.ico')));

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

// trigger skill execution via api
app.use('/api/banter', banter)
// web > twilio > text
app.use('/api/sale', sale)
// db api
app.use('/api/ship', ship)

// 404
app.use(unk)
// error handling
app.use(errs)

// server
let port = process.env.PORT || keys.port;

app.listen(port, () => {
  console.log(g(`listening on port ${port}`))
});
/*
exports.listen = () => {
  server.listen(port, () => {
    Winston.info(`Http server listening on http://localhost:${port}`)
  })
}

exports.close = (next) => {
  server.close(next)
}

const startServer = process.argv.find((n) => n === '--start')
if (startServer) {
  exports.listen()
}
*/
