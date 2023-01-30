const Prism = require('prismjs');

server.route({
    method: 'POST',
    path: '/highlight',
    handler: (request, h) => {
        const code = request.payload.code;
        const language = request.payload.language;
        const highlightedCode = Prism.highlight(code, Prism.languages[language]);
        return highlightedCode;
    }
});