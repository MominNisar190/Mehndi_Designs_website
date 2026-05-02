const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Design = require('../models/Design');

// @desc    Toggle wishlist
// @route   POST /api/users/wishlist/:designId
// @access  Private
const toggleWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const designId = req.params.designId;

  const design = await Design.findById(designId);
  if (!design) {
    res.status(404);
    throw new Error('Design not found');
  }

  const isWishlisted = user.wishlist.includes(designId);

  if (isWishlisted) {
    user.wishlist = user.wishlist.filter((id) => id.toString() !== designId);
  } else {
    user.wishlist.push(designId);
  }

  await user.save();

  res.json({
    success: true,
    message: isWishlisted ? 'Removed from wishlist' : 'Added to wishlist',
    isWishlisted: !isWishlisted,
  });
});

// @desc    Get wishlist
// @route   GET /api/users/wishlist
// @access  Private
const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate(
    'wishlist',
    'title images price category averageRating slug'
  );

  res.json({ success: true, data: user.wishlist });
});

// @desc    Get all users (Admin)
// @route   GET /api/users
// @access  Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, search } = req.query;
  const filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const total = await User.countDocuments(filter);
  const users = await User.find(filter)
    .select('-password')
    .sort('-createdAt')
    .skip(skip)
    .limit(Number(limit));

  res.json({
    success: true,
    data: users,
    pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) },
  });
});

// @desc    Toggle user active status (Admin)
// @route   PUT /api/users/:id/toggle-status
// @access  Admin
const toggleUserStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user.role === 'admin') {
    res.status(400);
    throw new Error('Cannot deactivate admin accounts');
  }

  user.isActive = !user.isActive;
  await user.save();

  res.json({
    success: true,
    message: `User ${user.isActive ? 'activated' : 'deactivated'}`,
    data: user,
  });
});

module.exports = { toggleWishlist, getWishlist, getAllUsers, toggleUserStatus };
