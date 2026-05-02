const express = require('express');
const router = express.Router();
const { login, getMe, updateProfile, changePassword } = require('../controllers/authController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { loginValidation } = require('../utils/validators');

// Only admin login — no public register
router.post('/login', loginValidation, login);
router.get('/me', protect, adminOnly, getMe);
router.put('/profile', protect, adminOnly, updateProfile);
router.put('/change-password', protect, adminOnly, changePassword);

module.exports = router;
