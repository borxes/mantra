const routes = require('next-routes')();

//routes.add('...', '...');
routes
  .add('/mantras/new', '/mantras/new')
  .add('/mantras/show', '/mantras/show'); // :address is a wild card

module.exports = routes;
