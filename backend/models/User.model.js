const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true},
  login: { type: String, required: true },
  password: { type: String, required: true },
  googleId: { type: String }
});

module.exports = mongoose.model('User', userSchema);