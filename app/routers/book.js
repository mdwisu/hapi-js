const Joi = require('joi');
const handlers = require('../handlers/blog');

const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  isbn: Joi.string().length(10),
  pageCount: Joi.number(),
  datePublished: Joi.date().iso(),
});

module.exports = [
  {
    method: 'GET',
    path: '/books',
    handler: async function (request, h) {
      return await getBooks();
    },
    options: {
      response: {
        schema: Joi.array().items(bookSchema),
        failAction: 'log',
      },
    },
  },
];
