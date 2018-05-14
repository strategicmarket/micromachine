'use strict';

/////////////////////////////////////////////
////////       test                   ///////
////////////////////////////////////////////

const bodyParser =  				require('body-parser')
const Winston =           	require('winston')
const { g, b, gr, r, y } =  require('../../console')

const banter = (router) => {

	router.use(bodyParser.json());
	router.use(function(req, res, next) {

		console.log(r("banter"))
		res.status(200).send({ message: 'Banter!' })

    next()
 });
}

module.exports = banter
