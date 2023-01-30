const Embedly = require('embedly');
const embedly = new Embedly({ key: 'your_embedly_api_key' });

server.route({
    method: 'GET',
    path: '/embed',
    handler: (request, h) => {
        const url = request.query.url;
        return embedly.oembed({ url: url }).then((response) => {
            return response[0];
        });
    }
});