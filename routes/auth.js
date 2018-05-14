'use strict';

////////////////////////////////////////////////////////
/////       Authorization and Creditaling   	     ////
/////    A message is analyzed for permissions    ////
/////     DB connection is secured for org        ////
/////////////////////////////////////////////////////

const bodyParser =  				require('body-parser')
const connect =             require('../db/connections')
const Client =              require('../db/schemas/Client').Client
const configObj =           require('../db/schemas/Config')
const platform =            require('../config').platform()
const mongoose =          	require('mongoose')
const clone =     					require('clone-deep')
const utils =               require('../utils')
const platformarray =       require('../config').platform()
const keys =          			require('../config').init();
const { g, b, gr, r, y } =  require('../console')

const options = {
  	poolSize: 10, // Maintain up to x socket connections
    autoReconnect: true,
    autoIndex: false,
    reconnectTries: Number.MAX_SAFE_INTEGER
    }

/////////////////////////////////////////////////////////////////////////////
/////////////    retrieve authenticated client.js objects        ///////////
///////////////////////////////////////////////////////////////////////////
let clients = []
let configs = []

// detect run time environment
let envState = true
if ( process.env.isLive == 'false' ) {
    envState = false
  }

// retrieve configuration object when server starts (prod or test)
// and connect to platform db
const config = platform.filter((p) => p.isLive == envState)
const clientDbAPI = config[0].uri + config[0].db
mongoose.connect(clientDbAPI)
let dbc = mongoose.connection

/////////////////////////////////////////////
// async routines retrieve client configs //
//    ping every db to confirm online   ///
//////////////////////////////////////////

const getAllConfigs = async (arr) => {
  const filterArray = arr.filter((f) => {
    return (utils.isValidUrl(f.uri + f.dbname))
  })
  const cArray = filterArray.map(async c => {
    const response = await getConfig(c)
    return response
  })
  const newArray = await Promise.all(cArray)
  return newArray
}

const getConfig = (c) => {
  return new Promise((resolve, reject) => {

    connect(c.uri, c.dbname, (conn) => {
      // fetch the clients configuration object which contains other critical run time parms
        let Config = conn.model('Config', configObj.configSchema);
        Config.find({})
              .then((response) => {
                  let resp = response[0]
                  let config = clone(resp)
                  // append unique id to config from respective client obj
                  config.runparms.name = c.name
                  config.runparms.sms = c.sms
                  config.runparms.web = c.web
                  //conn.close()                      // note do not close connections - let mongoose manage pool
                  resolve( config ) })
              .catch((e) => {
                  reject(e) })
    })
  })
}
///////////////////////////////////////////////////////////////
//  create array of clients and configs for auth process /////
//  insert delay to ensure that test client data loaded /////
/////////////////////////////////////////////////////////////
setTimeout(() => {

  Client.find({})
        .then((c) => {
          clients = [...c]
          if (c.length < 1) {
        		console.log(r("Platform Error. No Client Records Found"))
        		process.exit(1) }
          else {
            console.log(g("Client Array Created"))
            // retrieve configs for each client
            getAllConfigs(clients).then((configArray) => {
              console.log(g("Config Array Created"))
              configs = [...configArray]
            })
          }
        })

  }, 2000 )


// auth process
const auth = (router) => {
	router.use(bodyParser.json());

	router.use('/api', function(req, res, next) {

	console.log("-------------AUTHORIZATION-------------")

  // set of channels and paths to be test the http message against
  require('./channels')

	const token = req.get('Authorization')

  // REFACTOR - auth right now is driven off phone number of incoming object
  // the path db/api executes against default number - see above
  // the web widget executes against default number - see public/web
  // Need JWT test as well ....
  // Also .. only load clients if activated ... and test for public vs private
  // and need better handling of errors encountered - multiple clients, configs etc
  // cannot shut down the entire platform if a single client's data is messed up

  let clientObj = clients.filter((c) => c.sms == req.body.To )

  if (clientObj.length < 1) {
    console.log(r("Platform Error. Number Not Recognized"))
    console.log(clientObj)
    console.log(req.body.To)
  //  process.exit(1)
  }

  if (clientObj.length > 1) {
    console.log(r("Platform Error. Multiple Clients Found for Same SMS"))
    console.log(clientObj)
  //  process.exit(1)
  }

  let configObj = configs.filter((c) => c.runparms.sms == req.body.To )

  if (configObj.length < 1) {
    console.log(r("Config Error. Number Not Recognized"))
    console.log(configObj)
    console.log(req.body.To)
  //  process.exit(1)
  }

  if (configObj.length > 1) {
    console.log(r("Platform Error. Multiple Client Configs Found"))
    console.log(clientObj)
  //  process.exit(1)
  }

  let clientDbURI = clientObj[0].uri + clientObj[0].dbname
  let customer = clientObj[0]
  let configuration = configObj[0]
  req.customer = customer
  req.config = configuration

  connect(clientObj[0].uri, clientObj[0].dbname, (conn) => {
    //req.conn = clone(conn)
    req.conn = conn
    next()
    })

  })
}

module.exports = auth
