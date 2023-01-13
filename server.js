const Hapi = require('@hapi/hapi');
const { getDate } = require('./app/plugins/date');
const routes = require('./app/routers/index');

const start = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    debug: { request: ['error'] }, // untuk response validator supaya muncul di log
  });

  await server.register([
    {
      plugin: getDate,
      options: {
        name: 'Muhammad Dwi Susanto',
        age: 21,
      },
    },
    {
      plugin: require('@hapi/vision'),
    },
  ]);

  server.views({
    engines: {
      pug: require('pug'),
    },
    relativeTo: __dirname,
    path: 'app/templates',
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
    // encoding: 'base64json',
    // clearInvalid: false, // remove invalid cookies
    // strictHeader: true, // don't allow violations of RFC 6265
    // path: '/',
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
