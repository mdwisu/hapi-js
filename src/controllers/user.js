const User = require('../models/user');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('@hapi/jwt');
const configAuth = require('../config/auth');
const config = require('../config');
const {
  sendVerificationEmail,
} = require('../helpers/auth/sendVerificationEmail');

const Joi = require('joi');
const emailSchema = Joi.object().keys({
  email: Joi.string().email().required(),
});

module.exports = {
  create: (request, h) => {
    let { name, email, password } = request.payload;
    let user = new User({ name, email, password });
    return user.save();
  },
  findAll: (request, h) => {
    return User.find()
      .then((user) => {
        if (!user) {
          return h.response({ message: 'User not found' }).code(404);
        }
        // return h.view('index', { user });
        return h.response(user);
      })
      .catch((err) => {
        return h.response({ message: err.message }).code(500);
      });
  },
  findOne: (request, h) => {
    return User.findById(request.params.id);
  },
  update: (request, h) => {
    return User.findByIdAndUpdate(request.params.id, request.payload, {
      new: true,
    });
  },
  delete: (request, h) => {
    return User.findByIdAndRemove(request.params.id);
  },
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
        if (!user) return { message: 'Invalid email or password' };
        if (!user.isVerified)
          return { message: 'Please verify your email first' };
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
          .response({ message: 'Failed to send email', error: err.message })
          .code(500);
      });
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
