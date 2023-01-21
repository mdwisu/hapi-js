const UserController = require('../controllers/user');

module.exports = [
  {
    method: 'POST',
    path: '/users',
    handler: UserController.create,
  },
  {
    method: 'GET',
    path: '/users',
    handler: UserController.findAll,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: UserController.findOne,
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    handler: UserController.update,
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: UserController.delete,
  },
  {
    method: 'POST',
    path: '/register',
    handler: UserController.register,
  },
  {
    method: 'POST',
    path: '/login',
    handler: UserController.login,
  },
  {
    method: 'GET',
    path: '/verify/{id}',
    handler: UserController.verify,
  },
];
