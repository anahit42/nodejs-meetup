const bluebird = require('bluebird');
const mongoose = require('mongoose');

const Mongoose = bluebird.promisifyAll(mongoose);

const UserSchema = new Mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: String,
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  }
});

module.exports = Mongoose.model('User', UserSchema);
