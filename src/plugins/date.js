exports.getDate = {
  pkg: require('../../package.json'),
  register: async function (server, options) {
    const currentDate = function () {
      const date = new Date();
      return options.name + options.age + date;
    };
    server.decorate('toolkit', 'getDate', currentDate);
  },
};
