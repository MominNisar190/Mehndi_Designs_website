const express = require('express');
const router = express.Router();
const {
  createReview,
  getDesignReviews,
  updateReview,
  deleteReview,
  getAllReviews,
  toggleApproval,
} = require('../controllers/reviewController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { uploadReviewImages } = require('../middleware/uploadMiddleware');
const { reviewValidation } = require('../utils/validators');

router.post('/', protect, uploadReviewImages, reviewValidation, createReview);
router.get('/design/:designId', getDesignReviews);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

// Admin
router.get('/', protect, adminOnly, getAllReviews);
router.put('/:id/approve', protect, adminOnly, toggleApproval);

module.exports = router;
