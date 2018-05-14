

///////////////////////////////////////////
////////      routes               ///////
///////      c 2018 xio         ////////
//////////////////////////////////////

const Winston = require('winston')

module.exports = (dispatcher) => {
  Winston.info('routes registered')

  dispatcher.setStatic('/public')
  dispatcher.setStaticDirname('static')

  // html pages
  dispatcher.onGet('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end('<h1>Index Page</h1>')
  })

  // apis
  dispatcher.onGet('/api/customer', (req, res) => {
    const customer = {
      firstName: 'Tony',
      lastName: 'Stark',
      agent: 'Iron Bot',
      network: 'Stark Industries'
    }

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(customer))
  })

  dispatcher.onPost('/api/customer', (req, res) => {
    Winston.info(req.body)

    const response = {
      status: 'success'
    }

    res.writeHead(201, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(response))
  })

  dispatcher.beforeFilter(/\//, function(req, res, chain) { //any url
       console.log("Before filter");
       chain.next(req, res, chain);
   });

   dispatcher.afterFilter(/\//, function(req, res, chain) { //any url
       console.log("After filter");
       chain.next(req, res, chain);
   });

  dispatcher.onError = (req, res) => {
    res.writeHead(404)
    res.end('<h1>Resource not found</h1>')
  }
}
