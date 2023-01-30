const glob = require('glob');

glob
  .sync(
    './routes/**/*.js'
    // { ignore: './routes/**/index.js' }
  )
  .forEach((file) => {
    const route = require(file);
    console.log(route);
    // server.route(route);
  });
