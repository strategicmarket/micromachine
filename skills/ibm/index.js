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
		res.status(200).send(JSON.stringify(workObj))
    return
    }).catch((err) => {
    console.log("ERROR IN THREAD PROCESSING")
    console.log(err)
		res.status(500).send(err)
  })

  // stages for message analysis and response
  // req object initialized in auth with db connection - validate customer

  async function test(req, res) {
    let result =    	await banter(req)
    return result
  }


 });
}

module.exports = ibm
