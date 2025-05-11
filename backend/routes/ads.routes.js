const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');

const ads = require('../controllers/ads.controller');

router.get('/ads', ads.allAds);
router.get('/ads/:id', ads.getById);
router.post('/ads', authMiddleware, ads.postAd);
router.delete('/ads/:id', authMiddleware, ads.deleteAd);
router.put('/ads/:id', authMiddleware, ads.putAd);
router.get('/ads/search/:searchPharse', ads.getSearchPharse);

module.exports = router;