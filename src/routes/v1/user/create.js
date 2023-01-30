const userController = require('../../../controllers/user');
module.exports = {
  method: 'POST',
  path: '/users',
  handler: userController.create,
};
