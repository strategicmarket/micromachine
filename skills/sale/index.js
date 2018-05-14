'use strict';

/////////////////////////////////////////////
////////      process help           ///////
////////////////////////////////////////////
const Winston =           	require('winston')
const bodyParser =  				require('body-parser')
const { g, b, gr, r, y } =  require('../console')

const sale = (router) => {

	router.use(bodyParser.json());
	router.use(function(req, res, next) {

		console.log(r("sell")

		Winston.info(`Route requested: ${request.url}`)

    next()
 });
}

module.exports = sale
