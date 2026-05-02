const express = require('express');
const router = express.Router();
const { getDashboardStats, getCalendarData } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/stats', protect, adminOnly, getDashboardStats);
router.get('/calendar', protect, adminOnly, getCalendarData);

module.exports = router;
