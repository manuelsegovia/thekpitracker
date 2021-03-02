const Hapi = require('@hapi/hapi');
const plugins = require('./plugins');

const createSever = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 8080,
    host: process.env.HOST || 'localhost',
  });
  await plugins.register(server);
  server.route(require('./routes'));
  return server;
};

module.exports = {
  createSever,
};
