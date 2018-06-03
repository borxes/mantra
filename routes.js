const routes = require('next-routes')();

//routes.add('...', '...');
routes
  .add('/mantras/new', '/mantras/new')
  .add('/mantras/:address', '/mantras/show') // :address is a wild card
  .add('/mantras/:address/requests', '/mantras/requests/index')
  .add('/mantras/:address/requests/new', '/mantras/requests/new');

module.exports = routes;
