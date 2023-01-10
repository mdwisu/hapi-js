exports.getBlogs = (request, h) => {
  h.state('username', 'tom');
  return `ini blog`;
};

exports.postBlog = (request, h) => {
  return 'Blog post added!';
};
