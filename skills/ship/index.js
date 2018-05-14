'use strict';

/////////////////////////////////////////////
////////      process help           ///////
////////////////////////////////////////////
const Winston =           	require('winston')
const bodyParser =  				require('body-parser')
const { g, b, gr, r, y } =  require('../../console')

const ship = (router) => {

	router.use(bodyParser.json());
	router.use(function(req, res, next) {
		console.log(r("ship"))

		Winston.info(`Route requested: ${request.url}`)

    next()
 });
}

module.exports = ship
