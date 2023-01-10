const getDate = require('../plugins/hello').getDate;

module.exports = [
  {
    method: ['GET', 'POST'],
    path: '/a',
    handler: (request, h) => {
      return 'Hello World!';
    },
  },
  {
    method: 'GET',
    path: '/hello/{name}',
    handler: function (request, h) {
      const name = request.params.name;
      return 'Hello ' + name;
    },
  },
  {
    method: 'GET',
    path: '/home',
    handler: function (request, h) {
      return h.redirect('/');
    },
  },
  {
    method: 'GET',
    path: '/user',
    handler: function (request, h) {
      const user = {
        firstName: 'John',
        lastName: 'Doe',
        userName: 'JohnDoe',
        id: 123,
      };

      return user;
    },
  },
  {
    method: 'POST',
    path: '/hello',
    handler: function (request, h) {
      const name = request.payload.name;
      return `Hello ` + name;
    },
  },
];
