const path = require('path');

const auth = require('./auth');
const api = require('./api');
const measurements = require('./measurements');

const home = {
  method: 'GET',
  path: '/',
  options: {
    auth: {
      mode: 'try',
    },
    handler: (request, h) => h.view('index', { title: 'Home' }),
  },
};

const staticAssets = {
  method: 'GET',
  path: '/assets/{param*}',
  handler: {
    directory: {
      path: path.join(__dirname, '..', 'assets'),
    },
  },
  options: { auth: false },
};

const error404 = {
  method: '*',
  path: '/{any*}',
  handler(request, h) {
    return h.view('404', { title: 'Not Found' }).code(404);
  },
  options: {
    auth: false,
    description: 'error pages',
  },
};

module.exports = [
  home,
  staticAssets,
  error404,
  ...auth,
  ...api,
  ...measurements,
];
