'use strict';

////////////////////////////////////////////////////////
/////       Authorization and Creditaling   	     ////
/////    A message is analyzed for permissions    /////
/////////////////////////////////////////////////////

const bodyParser =  				require('body-parser')
const { g, b, gr, r, y } =  require('../console')

// auth process

const auth = (router) => {
	router.use(bodyParser.json());

	router.use('/api', function(req, res, next) {

	   console.log("-------------AUTHORIZATION-------------")

     next()

    })
  })
}

module.exports = auth
