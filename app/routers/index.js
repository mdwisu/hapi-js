var person = require('./person');
let blog = require('./blog');
let book = require('./book');

let helloWorld = {
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return 'Hello dwisusanto!';
  },
};

module.exports = [].concat(helloWorld, person, blog, book);
