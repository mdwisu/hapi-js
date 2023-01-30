const userController = require('../../../controllers/user');
const create = require('./create');
const _delete = require('./delete');
const update = require('./update');

module.exports = [
  {
    method: 'GET',
    path: '/v1/users',
    handler: userController.findAll,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: userController.findOne,
  },
  create,
  update,
  _delete,
];
