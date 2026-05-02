const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    design: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Design',
      required: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
      maxlength: [1000, 'Comment cannot exceed 1000 characters'],
    },
    images: [
      {
        url: String,
        publicId: String,
        type: { type: String, enum: ['before', 'after', 'general'], default: 'general' },
      },
    ],
    isVerified: {
      type: Boolean,
      default: false, // true if user has a completed booking for this design
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
    helpfulCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// One review per user per design
reviewSchema.index({ user: 1, design: 1 }, { unique: true });

// Update design rating after review save
reviewSchema.post('save', async function () {
  await updateDesignRating(this.design);
});

reviewSchema.post('remove', async function () {
  await updateDesignRating(this.design);
});

async function updateDesignRating(designId) {
  const Design = mongoose.model('Design');
  const stats = await mongoose.model('Review').aggregate([
    { $match: { design: designId, isApproved: true } },
    {
      $group: {
        _id: '$design',
        avgRating: { $avg: '$rating' },
        count: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await Design.findByIdAndUpdate(designId, {
      averageRating: Math.round(stats[0].avgRating * 10) / 10,
      reviewCount: stats[0].count,
    });
  } else {
    await Design.findByIdAndUpdate(designId, { averageRating: 0, reviewCount: 0 });
  }
}

module.exports = mongoose.model('Review', reviewSchema);
