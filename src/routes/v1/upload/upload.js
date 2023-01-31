const Multer = require('multer');
const upload = Multer({ dest: 'uploads/' });

module.exports = {
  method: 'POST',
  path: '/upload',
  config: {
    payload: {
      output: 'stream',
      parse: true,
      allow: 'multipart/form-data',
    },
    handler: (request, h) => {
      const data = request.payload;
      if (data.file) {
        const name = data.file.hapi.filename;
        const path = __dirname + '/uploads/' + name;
        const file = fs.createWriteStream(path);

        file.on('error', (err) => {
          console.error(err);
        });

        data.file.pipe(file);

        data.file.on('end', (err) => {
          const ret = {
            filename: data.file.hapi.filename,
            headers: data.file.hapi.headers,
          };
          return ret;
        });
      }
    },
  },
};
