const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');

const ads = require('../controllers/ads.controller');

router.get('/ads', ads.allAds);
router.get('/ads/:id', ads.getById);
router.post('/ads', authMiddleware, imageUpload.array('photos', 3), ads.postAd);
router.delete('/ads/:id', authMiddleware, ads.deleteAd);
router.put('/ads/:id', authMiddleware, imageUpload.array('photos', 3), ads.putAd);
router.get('/ads/search/:searchPhrase', ads.getSearchPhrase);


module.exports = router;