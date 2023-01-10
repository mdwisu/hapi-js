'use strict';

exports.plugin = {
  pkg: require('../../package.json'),
  register: async function (server, options) {
    // Create a route for example
    server.route({
      method: 'GET',
      path: '/hello',
      handler: function (request, h) {
        h.state('username', 'tom');
        // return h.response({
        //   text: `hello, world ${options.name} ${new Date()}`,
        //   cookie: request.state.username,
        // });
        return h.response(request.state.username);
      },
    });

    // etc...
    // await someAsyncMethods();
  },
};
