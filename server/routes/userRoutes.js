const express = require('express');
const router = express.Router();
const { toggleWishlist, getWishlist, getAllUsers, toggleUserStatus } = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/wishlist', protect, getWishlist);
router.post('/wishlist/:designId', protect, toggleWishlist);

// Admin
router.get('/', protect, adminOnly, getAllUsers);
router.put('/:id/toggle-status', protect, adminOnly, toggleUserStatus);

module.exports = router;
