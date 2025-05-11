const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  photo: { type: String, required: true}
});

module.exports = mongoose.model('Ad', adSchema);