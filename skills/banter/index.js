'use strict';

/////////////////////////////////////////////
////////      process help           ///////
////////////////////////////////////////////

const bodyParser =  			require('body-parser')
const Winston =           require('winston')
const { g, b, gr, r, y } =  require('../console')

const log = (router) => {

	router.use(bodyParser.json());
	router.use(function(req, res, next) {

		console.log(r("banter")
		Winston.info(`Route requested: ${request.url}`)

    next()
 });
}

module.exports = log
