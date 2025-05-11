const fs = require('fs');
const path = require('node:path');

const Ad = require('../models/ad.model');

exports.allAds = async (req, res) => {
  try {
    return res.json(await Ad.find({}));
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


exports.getById = async (req, res) => {
  try {
    const ad = await Ad.findById({ _id: req.params.id });
    if (ad) {
      return res.json(ad);
    } else {
      res.status(404).send({ message: 'Not found' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}


exports.postAd = async (req, res) => {
  try {

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}


exports.deleteAd = async (req, res) => {
  try {

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}


exports.putAd = async (req, res) => {
  try {

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}


exports.getSearchPharse = async (req, res) => {
  try {

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}