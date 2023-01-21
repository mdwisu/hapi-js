let blog = require('./blog');
let book = require('./book');
let authTwitter = require('./auth/authTwitter');
const Boom = require('@hapi/boom');
const user = require('./user');
const admin = require('./admin');

let index = [
  {
    method: ['GET', 'PUT', 'POST'],
    path: '/',
    handler: (request, h) => {
      return 'Hello Muhammad Dwi Susanto!';
    },
  },
  {
    method: ['GET', 'PUT', 'POST'],
    path: '/notfound',
    handler: (request, h) => {
      throw Boom.notFound('API Tidak Ditemukan');
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
  {
    method: 'GET',
    path: '/pug',
    handler: function (request, h) {
      return h.view('index', { title: 'Homepage', message: 'Welcome' });
    },
  },
];

module.exports = [].concat(index, user, blog, book, authTwitter, admin);
