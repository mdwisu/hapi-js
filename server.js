const Hapi = require('@hapi/hapi');
const { getDate } = require('./app/plugins/date');
const routes = require('./app/routers/index');

const start = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
  });

  await server.register({
    plugin: getDate,
    options: {
      name: 'Muhammad Dwi Susanto',
      age: 21,
    },
  });

  // !extension point
  // server.ext('onRequest', function (request, h) {
  //   request.setUrl('/hello');
  //   return h.continue;
  // });
  // !cookie parser
  server.state('username', {
    ttl: null, //24 * 60 * 60 * 1000, //one day
    isSecure: false,
    isHttpOnly: true,
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
