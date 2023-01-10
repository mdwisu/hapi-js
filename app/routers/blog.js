const Joi = require('joi');
const handlers = require('../handlers/blog');

module.exports = [
  {
    method: 'GET',
    path: '/blog',
    handler: handlers.getBlogs,
  },
  {
    method: 'POST',
    path: '/blog',
    handler: handlers.postBlog,
    options: {
      validate: {
        payload: Joi.object({
          post: Joi.string().max(10),
          post2: Joi.string().min(1).max(140),
        }),
      },
    },
  },
];
