'use strict';

////////////////////////////////////////////////
////////   wrapper to test a microservice ////
/////////////////////////////////////////////

const bodyParser =  				require('body-parser')
const Winston =           	require('winston')
const { g, b, gr, r, y } =  require('../../console')

// destructure for every package export
const {banter} = 						require('./packages')

// all packages tested in this thread are configured for openwhisk
const ibm = (router) => {

	router.use(bodyParser.json());
	router.use(function(req, res, next) {

/*
		console.log(g("banter   -- testing an openwhisk microservice"))
		res.status(200).send({ message: 'Banter!' })
    next()
*/
		test(req, res).then((workObj) => {
    console.log("-------TEST COMPLETED-------")
    return
    }).catch((err) => {
    console.log("ERROR IN THREAD PROCESSING")
    console.log(err)
  })

  // stages for message analysis and response
  // req object initialized in auth with db connection - validate customer

  async function test(req, res) {
    let result =    await initialize(req)
    let stage100 =    await state(stage000)
    let stage200 =    await intent(stage100)
    let stage400 =    await machine(stage200)
    let stage450 =    await metrics(stage400)
    let stage500 =    await agent(stage450)
    // pass in the res object to close off http session
    let stage900 =    await response(stage500, res)
    let stage950 =    await record(stage900)

    return stage950
  }




 });
}

module.exports = ibm
