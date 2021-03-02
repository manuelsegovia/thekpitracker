const dotEnv = require('dotenv');
const { createSever } = require('./app');

const init = async () => {
  dotEnv.config();
  const server = await createSever();
  await server.start();
  console.log('Server running on %s', server.info.uri);
};
process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
