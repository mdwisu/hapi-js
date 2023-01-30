const userController = require('../../../controllers/user');

module.exports = {
  method: 'PUT',
  path: '/users/{id}',
  handler: userController.update,
};
