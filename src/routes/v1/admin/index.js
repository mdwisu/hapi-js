const Boom = require('@hapi/boom');
const auth = require('../../../config/auth');
const admin = require('../../../controllers/admin');
const { adminAuth } = require('../../../helpers/auth/adminAuth');
module.exports = [
  {
    method: 'GET',
    path: '/v1/admin',
    config: {
      auth: {
        strategy: 'admin',
      },
      pre: [
        {
          method: adminAuth,
        },
      ],
    },
    handler: admin.admin,
  },
  {
    method: 'GET',
    path: '/admin/dwi',
    config: {
      auth: {
        strategy: 'admin',
      },
      pre: [
        {
          method: adminAuth,
        },
      ],
    },
    handler: admin.admin,
  },
];
