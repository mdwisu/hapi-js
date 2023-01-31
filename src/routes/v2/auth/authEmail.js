const AuthController = require('../../../controllers/auth');

module.exports = [
  {
    method: 'POST',
    path: '/v2/login',
    handler: AuthController.login,
  },
];
