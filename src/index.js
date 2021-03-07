const config = require('./config');
const { createServer } = require('./app');

// const config = {
//   port: PORT,
//   host: '0.0.0.0',
//   routes: {
//     cors: true,
//   },
// };
const init = async () => {
  const server = await createServer(config);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};
process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
