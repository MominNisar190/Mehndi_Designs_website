const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const Design = require('../models/Design');

// @desc    Create booking
// @route   POST /api/bookings
// @access  Public (no login required)
const createBooking = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }

  const {
    design: designId,
    bookingDate,
    timeSlot,
    package: pkg,
    address,
    isHomeService,
    isUrgent,
    notes,
    customerName,
    customerEmail,
    customerPhone,
  } = req.body;

  const design = await Design.findById(designId);
  if (!design || !design.isActive) {
    res.status(404);
    throw new Error('Design not found');
  }

  const booking = await Booking.create({
    design: designId,
    bookingDate,
    timeSlot,
    package: pkg || 'standard',
    address,
    isHomeService: false,
    isUrgent: false,
    notes,
    totalAmount: 0,
    customerName,
    customerEmail,
    customerPhone,
    status: 'pending',
  });

  // Increment design booking count
  await Design.findByIdAndUpdate(designId, { $inc: { bookingCount: 1 } });

  res.status(201).json({ success: true, data: booking });
});

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
// @access  Admin
const getAllBookings = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20, date } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (date) {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);
    filter.bookingDate = { $gte: start, $lt: end };
  }

  const skip = (Number(page) - 1) * Number(limit);
  const total = await Booking.countDocuments(filter);
  const bookings = await Booking.find(filter)
    .populate('design', 'title images price')
    .sort('-createdAt')
    .skip(skip)
    .limit(Number(limit));

  res.json({
    success: true,
    data: bookings,
    pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) },
  });
});

// @desc    Get single booking (Admin)
// @route   GET /api/bookings/:id
// @access  Admin
const getBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('design', 'title images price category description');

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  res.json({ success: true, data: booking });
});

// @desc    Update booking status (Admin)
// @route   PUT /api/bookings/:id/status
// @access  Admin
const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status, adminNotes, cancellationReason } = req.body;

  const booking = await Booking.findById(req.params.id)
    .populate('design', 'title');

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  booking.status = status;
  if (adminNotes) booking.adminNotes = adminNotes;
  if (cancellationReason) booking.cancellationReason = cancellationReason;
  await booking.save();

  res.json({ success: true, data: booking });
});

// @desc    Delete booking (Admin)
// @route   DELETE /api/bookings/:id
// @access  Admin
const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }
  await booking.deleteOne();
  res.json({ success: true, message: 'Booking deleted' });
});

module.exports = {
  createBooking,
  getAllBookings,
  getBooking,
  updateBookingStatus,
  deleteBooking,
};
