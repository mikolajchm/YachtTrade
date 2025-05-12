const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');

const auth = require('../controllers/auth.controller');

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login-failed' }),
  (req, res) => {
    res.redirect('/home');
  }
);

router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/user', authMiddleware, auth.user);
router.delete('/logout', authMiddleware, auth.logout);

module.exports = router;