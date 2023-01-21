const bcrypt = require('bcrypt');

exports.comparePassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, isMatch) => {
            if (err) reject(err);
            resolve(isMatch);
        });
    });
}