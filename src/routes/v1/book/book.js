const Joi = require('joi');

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
    handler(request, h) {
      return h
        .response([
          {
            title: 123,
            author: 'john smith',
            isbn: '1234567890',
            pageCount: 100,
            datePublished: '2020-02-01',
          },
          {
            title: 123,
            author: 'john smith',
            isbn: '1234567890',
            pageCount: 100,
            datePublished: '2020-02-01',
          },
          {
            title: 123,
            author: 'john smith',
            isbn: '1234567890',
            pageCount: 100,
            datePublished: '2020-02-01',
          },
        ])
        .code(201);
    },
    options: {
      response: {
        schema: Joi.array().items(bookSchema),
        failAction: 'log',
      },
    },
  },
];
