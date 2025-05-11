const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: { type: String, minLength: 5, maxLength: 15, required: true },
  description: { type: String, minLength: 20, maxLength: 50 ,required: true },
  publishedDate: { type: Date, default: Date.now, required: true },
  make: { type: String, require: true },
  condition: { type: String, require: true },
  year: { type: Number, min: 1900, max: 2025, require: true },
  typeOfFuel: { type: String, require: true },
  engineCapacity: { type: Number, min: 0, max: 9999, require: true },
  horseOfPower: { type: Number, min: 0, max: 9999, require: true },
  mth: { type: Number, min: 0, max: 999, require: true },
  countryOfOrigin: { type: String, require: true },
  photo: { type: [String], required: true },
  price: { type: Number, min: 0, required: true },
  location: { type: String, required: true },
  sellerInfo: { type: String, required: true }
});

module.exports = mongoose.model('Ad', adSchema);