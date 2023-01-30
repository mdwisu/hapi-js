const { adminAuth } = require('../../../helpers/auth/adminAuth');
const Article = require('../../../models/article');

module.exports = [
  {
    method: 'GET',
    path: '/v1/articles',
    handler: (request, h) => {
      return Article.find();
    },
  },
  {
    method: 'POST',
    path: '/v1/articles',
    handler: (request, h) => {
      const newArticle = new Article({
        title: request.payload.title,
        content: request.payload.content,
        author: request.payload.author,
        date: new Date(),
      });
      return newArticle.save();
    },
    config: {
      auth: {
        strategy: 'jwt',
      },
      pre: [
        {
          method: adminAuth,
        },
      ],
    },
  },
];
