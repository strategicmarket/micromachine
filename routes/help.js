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

	  developer workbench for constructing winsome interactions

	  &copy2016 Strategic Machines all rights reserved
	  </pre> `

	  res.send(help)

    next()
 });
}

module.exports = help
