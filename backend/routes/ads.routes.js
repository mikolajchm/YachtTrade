const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');

const ads = require('../controllers/ads.controller');

router.get('/', ads.allAds);
router.get('/:id', ads.getById);
router.post('/', authMiddleware, imageUpload.array('photos', 3), ads.postAd);
router.delete('/:id', authMiddleware, ads.deleteAd);
router.put('/:id', authMiddleware, imageUpload.array('photos', 3), ads.putAd);
router.get('/search/:searchPharse', ads.getSearchPharse);

module.exports = router;