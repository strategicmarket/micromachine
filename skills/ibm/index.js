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
		res.status(200).send(workObj)
    return
    }).catch((err) => {
    console.log("ERROR IN THREAD PROCESSING")
    console.log(err)
		res.status(500).send(err)
  })

  // triggers the function(s) -- note the data object is passed in from req object

  async function test(req, res) {
    let result =    	await banter(req.body)
    return result
  }


 });
}

module.exports = ibm
