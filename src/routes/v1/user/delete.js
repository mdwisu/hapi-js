const userController = require('../../../controllers/user');

module.exports = {
  method: 'DELETE',
  path: '/users/{id}',
  handler: userController.delete,
};
