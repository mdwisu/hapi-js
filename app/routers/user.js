
module.exports = [
  {
    method: 'GET',
    path: '/user',
    handler: function (request, h) {
      const user = {
        firstName: 'John',
        lastName: 'Doe',
        userName: 'JohnDoe',
        id: 123,
      };

      return user;
    },
  },
];
