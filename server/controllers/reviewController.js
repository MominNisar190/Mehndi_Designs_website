const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const Review = require('../models/Review');
const Booking = require('../models/Booking');

// @desc    Create review
// @route   POST /api/reviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }

  const { design, rating, comment, bookingId } = req.body;

  // Check if already reviewed
  const existing = await Review.findOne({ user: req.user._id, design });
  if (existing) {
    res.status(400);
    throw new Error('You have already reviewed this design');
  }

  // Check if user has a completed booking for this design (for verified badge)
  let isVerified = false;
  if (bookingId) {
    const booking = await Booking.findOne({
      _id: bookingId,
      user: req.user._id,
      design,
      status: 'completed',
    });
    isVerified = !!booking;
  } else {
    const booking = await Booking.findOne({
      user: req.user._id,
      design,
      status: 'completed',
    });
    isVerified = !!booking;
  }

  const images = req.files
    ? req.files.map((file, index) => ({
        url: file.path,
        publicId: file.filename,
        type: req.body[`imageType_${index}`] || 'general',
      }))
    : [];

  const review = await Review.create({
    user: req.user._id,
    design,
    booking: bookingId || undefined,
    rating: Number(rating),
    comment,
    images,
    isVerified,
  });

  await review.populate('user', 'name avatar');

  res.status(201).json({ success: true, data: review });
});

// @desc    Get reviews for a design
// @route   GET /api/reviews/design/:designId
// @access  Public
const getDesignReviews = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, sort = '-createdAt' } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const filter = { design: req.params.designId, isApproved: true };
  const total = await Review.countDocuments(filter);

  const reviews = await Review.find(filter)
    .populate('user', 'name avatar')
    .sort(sort)
    .skip(skip)
    .limit(Number(limit));

  // Rating breakdown
  const breakdown = await Review.aggregate([
    { $match: filter },
    { $group: { _id: '$rating', count: { $sum: 1 } } },
    { $sort: { _id: -1 } },
  ]);

  res.json({
    success: true,
    data: reviews,
    breakdown,
    pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) },
  });
});

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findOne({ _id: req.params.id, user: req.user._id });
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  const { rating, comment } = req.body;
  if (rating) review.rating = Number(rating);
  if (comment) review.comment = comment;
  await review.save();

  res.json({ success: true, data: review });
});

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findOne({
    _id: req.params.id,
    $or: [{ user: req.user._id }, { _id: req.params.id }],
  });

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  // Only owner or admin can delete
  if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to delete this review');
  }

  await review.deleteOne();
  res.json({ success: true, message: 'Review deleted' });
});

// @desc    Get all reviews (Admin)
// @route   GET /api/reviews
// @access  Admin
const getAllReviews = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, isApproved } = req.query;
  const filter = {};
  if (isApproved !== undefined) filter.isApproved = isApproved === 'true';

  const skip = (Number(page) - 1) * Number(limit);
  const total = await Review.countDocuments(filter);
  const reviews = await Review.find(filter)
    .populate('user', 'name email')
    .populate('design', 'title')
    .sort('-createdAt')
    .skip(skip)
    .limit(Number(limit));

  res.json({
    success: true,
    data: reviews,
    pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) },
  });
});

// @desc    Toggle review approval (Admin)
// @route   PUT /api/reviews/:id/approve
// @access  Admin
const toggleApproval = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  review.isApproved = !review.isApproved;
  await review.save();

  res.json({ success: true, data: review });
});

module.exports = {
  createReview,
  getDesignReviews,
  updateReview,
  deleteReview,
  getAllReviews,
  toggleApproval,
};
