'use strict';

/////////////////////////////////////////////
////////      process help           ///////
////////////////////////////////////////////
const Winston =           require('winston')
const bodyParser =  			require('body-parser')

const log = (router) => {

	router.use(bodyParser.json());
	router.use(function(req, res, next) {

		Winston.info(`Route requested: ${request.url}`)

    next()
 });
}

module.exports = log
