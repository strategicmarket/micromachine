'use strict';

////////////////////////////////////////
////////      test              ///////
//////////////////////////////////////
const Winston =           	require('winston')
const bodyParser =  				require('body-parser')
const { g, b, gr, r, y } =  require('../../console')

const sale = (router) => {

	router.use(bodyParser.json());
	router.use(function(req, res, next) {

		console.log(r("sell"))

		res.status(200).send({ message: 'Sell!' })

    next()
 });
}

module.exports = sale
