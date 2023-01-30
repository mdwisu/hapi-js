const User = require('../models/user');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('@hapi/jwt');
const configAuth = require('../config/auth');
const config = require('../config');
const Boom = require('@hapi/boom');
const {
  sendVerificationEmail,
} = require('../helpers/auth/sendVerificationEmail');

const Joi = require('joi');
const emailSchema = Joi.object().keys({
  email: Joi.string().email().required(),
});

module.exports = {
  register: async (request, h) => {
    let { name, email, password, confirmPassword } = request.payload;

    // check if email already exist
    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
      return { message: 'Email already exist' };
    }
    // match password
    if (password !== confirmPassword) {
      return { message: 'Password and confirm password do not match' };
    }

    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    let user = new User({ name, email, password: hash });
    return user
      .save()
      .then((user) => {
        return sendVerificationEmail(email, user._id);
      })
      .catch((err) => {
        console.error(err);
        return h
          .response({ message: 'Failed to send email', error: err.message })
          .code(500);
      });
  },
  login: (request, h) => {
    let { email, password } = request.payload;
    return User.findOne({ email })
      .then((user) => {
        if (!user) return Boom.unauthorized('Email or password is incorrect');
        if (!user.isVerified)
          return Boom.forbidden(
            'Email is not verified, please verify it before logging in'
          );
        return user.comparePassword(password).then((isMatch) => {
          if (!isMatch) return { message: 'Invalid email or password' };
          let token = jwt.token.generate(
            { _id: user._id, role: user.role },
            configAuth.jwt_secret,
            {
              expiresIn: '1d',
            }
          );
          return { message: 'Logged in successfully', token };
        });
      })
      .catch((err) => {
        console.error(err);
        return h
          .response({
            message: 'An internal server error occurred',
            error: err.message,
          })
          .code(500);
      });
  },
  logout: async (request, h) => {
    try {
      // ! Code to invalidate JWT token on the server-side / jika token di simpan di database
      // const user = await User.findOne({ _id: decoded.id });
      // if (!user) {
      //   return { isValid: false };
      // }
      // user.token = null;
      // await user.save();

      // ! Clear JWT token from client-side storage / hapus di sisi client atau di react js
      // localStorage.removeItem('token');

      return h.response({ message: 'Successfully logged out' }).code(200);
    } catch (err) {
      return Boom.badImplementation(err);
    }
  },
  verify: (request, h) => {
    let id = request.params.id;
    return User.findByIdAndUpdate(id, { isVerified: true })
      .then((user) => {
        return { message: 'Email verified successfully' };
      })
      .catch((err) => {
        return { err };
      });
  },
  resendVerify: async (request, h) => {
    const { error, value } = emailSchema.validate(request.payload);
    if (error) return h.response({ error: error.message }).code(400);
    // create unique verification token
    const verificationToken = createVerificationToken();
    // send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your_email@gmail.com',
        pass: 'your_password',
      },
    });
    const mailOptions = {
      from: 'your_email@gmail.com',
      to: value.email,
      subject: 'Verifikasi Akun Anda',
      html: `<p>Silahkan klik <a href="http://www.example.com/verify?token=${verificationToken}">link ini</a> untuk menyelesaikan proses verifikasi.</p>`,
    };
  },
};
