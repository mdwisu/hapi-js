const Hapi = require('@hapi/hapi');
const routes = require('./app/routers/index');

const start = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });

  server.route(routes);

  await server.start();
  console.log('Server running on port 3000');
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

start();
