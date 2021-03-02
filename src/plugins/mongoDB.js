// const mongoDb = require('hapi-mongodb');

exports.plugin = {
  name: 'kpiDb',
  version: '1.0.0',
  register: async (server, options) => {
    await server.register({
      plugin: require('hapi-mongodb'),
      options: {
        url: process.env.MONGO_DB,
        settings: {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          poolSize: 10,
        },
        decorate: true,
      },
    });
  },
};
