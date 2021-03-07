const Hapi = require('@hapi/hapi');

const plugins = require('./plugins');

const createServer = async (config) => {
  const { host, port } = config;
  const server = Hapi.server({
    host,
    port,
    routes: {
      cors: true,
    },
  });
  server.app.config = config;
  await plugins.register(server);
  server.route(require('./routes'));
  return server;
};

module.exports = {
  createServer,
};
