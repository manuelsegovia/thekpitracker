const Bell = require('@hapi/bell');
const Cookie = require('@hapi/cookie');

exports.plugin = {
  name: 'auth',
  version: '1.0.0',
  register: async (server) => {
    const { config } = server.app;
    const isSecure = config.nodeEnv === 'production';
    const location = isSecure
      ? 'https://thekpitracker.herokuapp.com'
      : server.info.uri;
    const redirectTo = isSecure
      ? 'https://thekpitracker.herokuapp.com/authorization-code/callback'
      : '/authorization-code/callback';
    await server.register([Cookie, Bell]);

    server.auth.strategy('session', 'cookie', {
      cookie: {
        name: 'sid-okta',
        path: '/',
        password: config.cookiePwd,
        isSecure,
      },
      // redirectTo: '/authorization-code/callback',
      redirectTo,
    });
    // OKTA configuration
    server.auth.strategy('okta', 'bell', {
      provider: 'okta',
      config: { uri: config.oktaOrgUrl },
      password: config.cookiePwd,
      isSecure,
      location,
      clientId: config.oktaClientId,
      clientSecret: config.oktaClientSecret,
    });
    server.auth.default('session');
  },
};
