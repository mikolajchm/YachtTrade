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

    const ad = await Ad.findById( req.params.id );

    if (ad) {
      return res.json(ad);
    } else {
      res.status(404).send({ message: 'Not found' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


exports.postAd = async (req, res) => {
  try {

    const requiredFields = [
      'title', 'description', 'make', 'condition',
      'year', 'typeOfFuel', 'engineCapacity', 'horseOfPower',
      'mth', 'countryOfOrigin', 'location',
      'phoneNumber'
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).send({ message: `Missing field: ${field}` });
      }
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ message: 'Missing photos' });
    }

    const invalidFiles = req.files.filter(file => {
      const [, ext] = file.originalname.split('.');
      return !['jpg', 'jpeg', 'png'].includes(ext.toLowerCase());
    });

    if (invalidFiles.length > 0) {
      for (const file of req.files) {
        fs.unlinkSync(file.path);
      }
      return res.status(400).send({ message: 'Photo must be a jpg, jpeg or png file type!' });
    }

    const newAd = {
      ...req.body,
      photos: req.files.map(file => file.filename),
      sellerInfo: req.session.user.id
    };

    const newad = new Ad(newAd);
    await newad.save();
    
    res.status(201).send({
      newad 
    });

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


exports.deleteAd = async (req, res) => {
  try {
    
    const ad = await Ad.findById(req.params.id);

    if (!ad) {
      return res.status(404).send({ message: 'Ad not found with this ID' });
    }

  
    for (const filename of ad.photos) {
      const filepath = path.join(__dirname, '../public/uploads', filename);
      if (fs.existsSync(filepath)) {
        try {
          fs.unlinkSync(filepath);
        } catch (fileErr) {
          console.warn(`Cannot delete file ${filepath}:`, fileErr);
        }
      }
    }

    await Ad.deleteOne({ _id: req.params.id });

    return res.status(200).send({ message: 'Deleted!' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};


exports.putAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);

    if (!ad) {
      return res.status(404).send({ message: 'Ad not found' });
    }

    if (req.files && req.files.length > 0) {
      for (const filename of ad.photos) {
        const filepath = path.join(__dirname, '../public/uploads', filename);
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
      }
      ad.photos = req.files.map(file => file.filename);
    }

    Object.assign(ad, req.body);

    await ad.save();
    res.status(200).send({
      message: 'Updated!'
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


exports.getSearchPharse = async (req, res) => {
  try {

    const searchPhrase = req.params.searchPharse;
    const ads = await Ad.find({
      make: { $regex: searchPhrase, $options: 'i' } // ignoruj wielkość liter
    });

    if (!ads.length) {
      return res.status(404).json({ message: 'No ads found' });
    }

    return res.status(200).json(ads); 

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};