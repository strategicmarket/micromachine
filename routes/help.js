'use strict';

/////////////////////////////////////////////
////////      process help           ///////
////////////////////////////////////////////

const bodyParser =  			require('body-parser')

const help = (router) => {

	router.use(bodyParser.json());
	router.use(function(req, res, next) {

		const help = `
	  <pre>
	  strategicmachines.io: intelligent interaction platform

	  Use an Authorization header to work with your own data:
	  fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})
	  Endpoints vary by dbstore being modeled. Check the code for details

	  &copy2016 Strategic Machines all rights reserved
	  </pre> `

	  res.send(help)

    next()
 });
}

module.exports = help
