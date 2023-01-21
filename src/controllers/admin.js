const Boom = require('@hapi/boom');

module.exports = {
  admin: (request, h) => {
    // if ('admin' === request.auth.credentials.role) {
    //   return 'Welcome Admin';
    // } else {
    //   return Boom.unauthorized('You are not authorized to access this route');
    // }
    return 'Welcome Admin';
  },
};
