const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getBooking,
  updateBookingStatus,
  deleteBooking,
} = require('../controllers/bookingController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { bookingValidation } = require('../utils/validators');

// Public — anyone can book
router.post('/', bookingValidation, createBooking);

// Admin only
router.get('/', protect, adminOnly, getAllBookings);
router.get('/:id', protect, adminOnly, getBooking);
router.put('/:id/status', protect, adminOnly, updateBookingStatus);
router.delete('/:id', protect, adminOnly, deleteBooking);

module.exports = router;
