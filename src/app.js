const Hapi = require('@hapi/hapi');
const plugins = require('./plugins');

const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';
const createSever = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host,
    routes: {
      cors: true,
    },
  });
  await plugins.register(server);
  server.route(require('./routes'));
  return server;
};

module.exports = {
  createSever,
};
