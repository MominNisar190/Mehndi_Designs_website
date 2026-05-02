const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');
const Design = require('../models/Design');
const User = require('../models/User');
const Review = require('../models/Review');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Admin
const getDashboardStats = asyncHandler(async (req, res) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  const [
    totalBookings,
    monthBookings,
    lastMonthBookings,
    totalRevenue,
    monthRevenue,
    totalUsers,
    newUsersThisMonth,
    totalDesigns,
    pendingBookings,
    recentBookings,
    popularDesigns,
  ] = await Promise.all([
    Booking.countDocuments(),
    Booking.countDocuments({ createdAt: { $gte: startOfMonth } }),
    Booking.countDocuments({ createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth } }),
    Booking.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]),
    Booking.aggregate([
      { $match: { createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]),
    User.countDocuments({ role: 'user' }),
    User.countDocuments({ role: 'user', createdAt: { $gte: startOfMonth } }),
    Design.countDocuments({ isActive: true }),
    Booking.countDocuments({ status: 'pending' }),
    Booking.find()
      .populate('user', 'name email')
      .populate('design', 'title images')
      .sort('-createdAt')
      .limit(5),
    Design.find({ isActive: true }).sort('-bookingCount').limit(5).select('title images bookingCount averageRating'),
  ]);

  // Monthly revenue chart (last 6 months)
  const revenueChart = await Booking.aggregate([
    {
      $match: {
        status: { $ne: 'cancelled' },
        createdAt: { $gte: new Date(now.getFullYear(), now.getMonth() - 5, 1) },
      },
    },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        revenue: { $sum: '$totalAmount' },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ]);

  // Booking status breakdown
  const statusBreakdown = await Booking.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  res.json({
    success: true,
    data: {
      overview: {
        totalBookings,
        monthBookings,
        bookingGrowth: lastMonthBookings
          ? Math.round(((monthBookings - lastMonthBookings) / lastMonthBookings) * 100)
          : 100,
        totalRevenue: totalRevenue[0]?.total || 0,
        monthRevenue: monthRevenue[0]?.total || 0,
        totalUsers,
        newUsersThisMonth,
        totalDesigns,
        pendingBookings,
      },
      recentBookings,
      popularDesigns,
      revenueChart,
      statusBreakdown,
    },
  });
});

// @desc    Get bookings calendar data
// @route   GET /api/admin/calendar
// @access  Admin
const getCalendarData = asyncHandler(async (req, res) => {
  const { year, month } = req.query;
  const y = Number(year) || new Date().getFullYear();
  const m = Number(month) || new Date().getMonth() + 1;

  const start = new Date(y, m - 1, 1);
  const end = new Date(y, m, 0, 23, 59, 59);

  const bookings = await Booking.find({
    bookingDate: { $gte: start, $lte: end },
    status: { $ne: 'cancelled' },
  })
    .populate('user', 'name')
    .populate('design', 'title')
    .select('bookingDate timeSlot status user design');

  res.json({ success: true, data: bookings });
});

module.exports = { getDashboardStats, getCalendarData };
