const jwt = require('jsonwebtoken');

const validateUserRole = (request, h) => {
  // Get the user's role from the JWT token
  const token = request.headers.authorization;
  const decoded = jwt.decode(token);
  const userRole = decoded.role;

  // Check if the user has the correct role to access the route
  if (
    userRole !== 'superAdmin' &&
    userRole !== 'admin' &&
    userRole !== 'user'
  ) {
    return h.response({ message: 'Unauthorized' }).code(401);
  }

  // If the user has the correct role, continue to handle the route
  return h.continue;
};
