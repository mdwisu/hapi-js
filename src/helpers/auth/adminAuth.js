const Boom = require('@hapi/boom');

exports.adminAuth = async (request, h) => {
  if (request.auth.credentials.role !== 'user') {
    throw Boom.unauthorized('You are not authorized to access this route');
  }
  return true;
};
