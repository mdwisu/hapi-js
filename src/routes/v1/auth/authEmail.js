const AuthController = require('../../../controllers/auth');

module.exports = [
  {
    method: 'POST',
    path: '/v1/register',
    handler: AuthController.register,
  },
  {
    method: 'POST',
    path: '/v1/login',
    handler: AuthController.login,
  },
  {
    method: 'GET',
    path: '/v1/verify/{id}',
    handler: AuthController.verify,
  },
  {
    method: 'POST',
    path: '/v1/logout',
    options: {
      auth: 'jwt',
    },
    handler: AuthController.logout,
  },
];
