var user = require('./user');
let blog = require('./blog');
let book = require('./book');


let index = [
  {
    method: ['GET', 'PUT', 'POST'],
    path: '/',
    handler: (request, h) => {
      return 'Hello Muhammad Dwi Susanto!';
    },
  },
  {
    method: 'GET',
    path: '/hello',
    handler: (request, h) => {
      // cookie
      h.state('username', 'dwi');
      console.log(request.state.username); //undefined
      return 'Hello world!' + h.getDate();
    },
  },
  {
    method: 'POST',
    path: '/hello',
    handler: (request, h) => {
      const name = request.payload.name;
      return `Hello ` + name;
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
];

module.exports = [].concat(index, user, blog, book);
