module.exports = [
  {
    method: '*',
    path: '/auth/twitter', // The callback endpoint registered with the provider
    handler: (request, h) => {
      if (!request.auth.isAuthenticated) {
        return `Authentication failed due to: ${request.auth.error.message}`;
      }

      // Perform any account lookup or registration, setup local session,
      // and redirect to the application. The third-party credentials are
      // stored in request.auth.credentials. Any query parameters from
      // the initial request are passed back via request.auth.credentials.query.

      return h.redirect('/home');
    },
    options: {
      auth: {
        strategy: 'twitter',
        mode: 'try',
      },
    },
  },
];
