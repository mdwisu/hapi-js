const { default: mongoose } = require('mongoose');
const db = require('../../config/database');

exports.connectToMongo = async () => {
  try {
    await mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.log(err);
  }
};
