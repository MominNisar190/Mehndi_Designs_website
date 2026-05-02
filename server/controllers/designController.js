const asyncHandler = require('express-async-handler');
const Design = require('../models/Design');
const { deleteImages } = require('../services/cloudinaryService');

// @desc    Get all designs (with filters)
// @route   GET /api/designs
// @access  Public
const getDesigns = asyncHandler(async (req, res) => {
  const {
    category,
    difficulty,
    minPrice,
    maxPrice,
    minTime,
    maxTime,
    sort = '-createdAt',
    page = 1,
    limit = 12,
    search,
    featured,
  } = req.query;

  const filter = { isActive: true };

  if (category) filter.category = category;
  if (difficulty) filter.difficulty = difficulty;
  if (featured === 'true') filter.isFeatured = true;

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  if (minTime || maxTime) {
    filter.timeRequired = {};
    if (minTime) filter.timeRequired.$gte = Number(minTime);
    if (maxTime) filter.timeRequired.$lte = Number(maxTime);
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } },
    ];
  }

  // Sort options
  const sortMap = {
    popular: '-popularity',
    latest: '-createdAt',
    'price-asc': 'price',
    'price-desc': '-price',
    rating: '-averageRating',
  };
  const sortQuery = sortMap[sort] || sort;

  const skip = (Number(page) - 1) * Number(limit);
  const total = await Design.countDocuments(filter);
  const designs = await Design.find(filter)
    .sort(sortQuery)
    .skip(skip)
    .limit(Number(limit))
    .select('-__v');

  res.json({
    success: true,
    data: designs,
    pagination: {
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      limit: Number(limit),
    },
  });
});

// @desc    Get single design
// @route   GET /api/designs/:id
// @access  Public
const getDesign = asyncHandler(async (req, res) => {
  const design = await Design.findOne({
    _id: req.params.id,
    isActive: true,
  });

  if (!design) {
    res.status(404);
    throw new Error('Design not found');
  }

  // Increment popularity
  await Design.findByIdAndUpdate(design._id, { $inc: { popularity: 1 } });

  // Get related designs
  const related = await Design.find({
    category: design.category,
    _id: { $ne: design._id },
    isActive: true,
  })
    .limit(4)
    .select('title images price category averageRating slug');

  res.json({
    success: true,
    data: { ...design.toJSON(), related },
  });
});

// @desc    Create design (Admin)
// @route   POST /api/designs
// @access  Admin
const createDesign = asyncHandler(async (req, res) => {
  const { title, category, description, price, timeRequired, difficulty, tags, isFeatured } =
    req.body;

  const images = req.files
    ? req.files.map((file, index) => ({
        url: file.path,
        publicId: file.filename,
        isPrimary: index === 0,
      }))
    : [];

  const design = await Design.create({
    title,
    category,
    description,
    price: Number(price),
    timeRequired: Number(timeRequired),
    difficulty,
    tags: tags ? JSON.parse(tags) : [],
    isFeatured: isFeatured === 'true',
    images,
  });

  res.status(201).json({ success: true, data: design });
});

// @desc    Update design (Admin)
// @route   PUT /api/designs/:id
// @access  Admin
const updateDesign = asyncHandler(async (req, res) => {
  const design = await Design.findById(req.params.id);
  if (!design) {
    res.status(404);
    throw new Error('Design not found');
  }

  const updates = { ...req.body };
  if (updates.tags && typeof updates.tags === 'string') {
    updates.tags = JSON.parse(updates.tags);
  }
  if (updates.price) updates.price = Number(updates.price);
  if (updates.timeRequired) updates.timeRequired = Number(updates.timeRequired);

  // Add new images if uploaded
  if (req.files && req.files.length > 0) {
    const newImages = req.files.map((file) => ({
      url: file.path,
      publicId: file.filename,
      isPrimary: false,
    }));
    updates.images = [...design.images, ...newImages];
  }

  const updated = await Design.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });

  res.json({ success: true, data: updated });
});

// @desc    Delete design (Admin)
// @route   DELETE /api/designs/:id
// @access  Admin
const deleteDesign = asyncHandler(async (req, res) => {
  const design = await Design.findById(req.params.id);
  if (!design) {
    res.status(404);
    throw new Error('Design not found');
  }

  // Delete images from Cloudinary
  const publicIds = design.images.map((img) => img.publicId).filter(Boolean);
  await deleteImages(publicIds);

  await design.deleteOne();

  res.json({ success: true, message: 'Design deleted successfully' });
});

// @desc    Delete specific image from design (Admin)
// @route   DELETE /api/designs/:id/images/:imageId
// @access  Admin
const deleteDesignImage = asyncHandler(async (req, res) => {
  const design = await Design.findById(req.params.id);
  if (!design) {
    res.status(404);
    throw new Error('Design not found');
  }

  const image = design.images.id(req.params.imageId);
  if (!image) {
    res.status(404);
    throw new Error('Image not found');
  }

  if (image.publicId) {
    const { deleteImage } = require('../services/cloudinaryService');
    await deleteImage(image.publicId);
  }

  design.images.pull(req.params.imageId);
  await design.save();

  res.json({ success: true, data: design });
});

module.exports = { getDesigns, getDesign, createDesign, updateDesign, deleteDesign, deleteDesignImage };
