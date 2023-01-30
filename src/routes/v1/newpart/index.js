server.route({
  method: 'POST',
  path: '/articles/{id}/parts',
  handler: (request, h) => {
      const id = request.params.id;
      const newPart = request.payload;
      return Article.findByIdAndUpdate(id, { $push: { parts: newPart } });
  }
});