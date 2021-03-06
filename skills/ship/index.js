'use strict';

////////////////////////////////////////
////////        test            ///////
//////////////////////////////////////
const Winston =           	require('winston')
const bodyParser =  				require('body-parser')
const { g, b, gr, r, y } =  require('../../console')

const ship = (router) => {

	router.use(bodyParser.json());
	router.use(function(req, res, next) {
		console.log(g("ship"))

	  res.status(200).send({ message: 'Ship!' })

    next()
 });
}

module.exports = ship
