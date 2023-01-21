const Hapi = require('@hapi/hapi');
const bell = require('@hapi/bell');
const routes = require('./src/routes/index');
const { getDate } = require('./src/plugins/date');
const mongoose = require('mongoose');
const { connectToMongo } = require('./src/helpers/db/connectToMongo');
const { jwt_secret } = require('./src/config/auth');
const HapiJWT2 = require('hapi-auth-jwt2');

connectToMongo();

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
    HapiJWT2,
  ]);

  // !auth strategy
  const twitterAuthOpt = {
    provider: 'twitter',
    password: 'adsfa8sdf78a7dsf87das8f7',
    clientId: process.env.TWITTER_CONSUMER_KEY,
    clientSecret: process.env.TWITTER_CONSUMER_SECRET,
    isSecure: false,
  };
  const googleAuthOpt = {
    provider: 'google',
    password: 'cookie_encryption_password',
    clientId: 'your_client_id',
    clientSecret: 'your_client_secret',
    isSecure: false,
  };

  server.auth.strategy('twitter', 'bell', twitterAuthOpt);
  server.auth.strategy('google', 'bell', googleAuthOpt);
  server.auth.strategy('admin', 'jwt', {
    key: jwt_secret,
    validate: (decoded, request) => {
      if (
        decoded.role === 'admin' ||
        decoded.role === 'user' ||
        decoded.role === 'super_admin'
      ) {
        return { isValid: true, credentials: decoded };
      } else {
        return { isValid: false };
      }
    },
    verifyOptions: { algorithms: ['HS256'] },
  });

  server.views({
    engines: {
      pug: require('pug'),
    },
    relativeTo: __dirname,
    path: 'src/views',
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

  server.route(routes, {
    method: '*',
    path: '/{any*}',
    handler: (request, h) => {
      // return h.response('404 Not Found').code(404);
      throw Boom.notFound('API Tidak Ditemukan');
    },
  });

  await server.start();
  console.log('Server running on port 3000');
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log(
      'Mongoose default connection disconnected through app termination'
    );
    process.exit(0);
  });
});

start();
