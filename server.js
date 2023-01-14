require('dotenv').config();
const Hapi = require('@hapi/hapi');
const bell = require('@hapi/bell');
const { getDate } = require('./app/plugins/date');
const routes = require('./app/routers/index');

const start = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
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
    bell,
  ]);

  server.auth.strategy('twitter', 'bell', {
    provider: 'twitter',
    password: 'adsfa8sdf78a7dsf87das8f7',
    clientId: process.env.TWITTER_CONSUMER_KEY,
    clientSecret: process.env.TWITTER_CONSUMER_SECRET,
    isSecure: false,
  });

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
