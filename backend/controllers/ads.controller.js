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

    const requiredFields = [
      'title', 'description', 'publishedDate', 'make', 'condition',
      'year', 'typeOfFuel', 'engineCapacity', 'horseOfPower',
      'mth', 'countryOfOrigin', 'photos', 'location',
      'phoneNumber', 'sellerInfo'
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).send({ message: `Missing field: ${field}` });
      }
    }

    const newAd = { ...req.body };
    
    const newad = new Ad(newAd);
    await newad.save();

    res.status(201).send({ message: 'Created !' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}


exports.deleteAd = async (req, res) => {
  try {

    const adtodelete = await Ad.findById({ _id: req.params.id });

    if (!adtodelete) {
      return res.status(404).send({ message: 'Ad not found with this ID' });
    }

    await Ad.deleteOne({ _id: req.params.id });

    res.status(201).send({ message: 'Deleted !'});
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

    const searchPharse = req.params.searchPharse;
    const searchScore = await Ads.find( { title: { $regex: searchPharse}});

    if (!searchPharse) {
      return res.status(404).send({ message: 'Ad not found' });
    } 
    
    res.json(searchScore);

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}