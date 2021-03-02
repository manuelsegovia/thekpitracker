const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const utilityPlugins = require('./utilityPlugins');
const mongoDB = require('./mongoDB');
const auth = require('./auth');

module.exports = {
  name: 'index',
  version: '1.0.0.0',
  register: async (server) => {
    await server.register([Inert, Vision, auth, mongoDB, ...utilityPlugins]);
    server.views({
      engines: {
        hbs: require('handlebars'),
      },
      relativeTo: __dirname,
      path: '../templates',
      layout: true,
      isCached: false,

      context: (request) => {
        const { isAuthenticated, isAnonymous } = request.auth;

        if (isAuthenticated) {
          const data = {
            id: request.auth.credentials.profile.id,
            firstName: request.auth.credentials.profile.firstName,
          };
          return {
            isAuthenticated,
            isAnonymous,
            data,
          };
        }
        return { firstName: '' };
      },
    });
  },
};
