const { default: mongoose, Schema } = require('mongoose');

const articleSchema = new Schema({
  title: String,
  content: String,
  author: String,
  date: Date,
});

module.exports = mongoose.model('Article', articleSchema);
