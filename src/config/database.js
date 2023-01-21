require('dotenv').config();
module.exports = {
  url: process.env.MONGO_URL || 'mongodb://127.0.0.1/dwi',
};
