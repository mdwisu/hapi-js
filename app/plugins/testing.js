'use strict';

exports.plugin = {
  pkg: require('../../package.json'),
  register: async function (server, options) {
    // Create a route for example
    server.route({
      method: 'GET',
      path: '/testing',
      handler: function (request, h) {
        return `hello, world ${options.name}`;
      },
    });

    // etc...
    // await someAsyncMethods();
  },
};
