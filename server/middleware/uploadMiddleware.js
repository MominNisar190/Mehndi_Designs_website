const { uploadDesign, uploadReview, uploadPreview } = require('../config/cloudinary');

// Upload multiple design images (max 5)
const uploadDesignImages = uploadDesign.array('images', 5);

// Upload single design image
const uploadDesignImage = uploadDesign.single('image');

// Upload review images (max 3)
const uploadReviewImages = uploadReview.array('images', 3);

// Upload hand preview image
const uploadHandImage = uploadPreview.single('handImage');

// Error wrapper
const handleUpload = (uploadFn) => (req, res, next) => {
  uploadFn(req, res, (err) => {
    if (err) {
      res.status(400);
      return next(new Error(`Upload failed: ${err.message}`));
    }
    next();
  });
};

module.exports = {
  uploadDesignImages: handleUpload(uploadDesignImages),
  uploadDesignImage: handleUpload(uploadDesignImage),
  uploadReviewImages: handleUpload(uploadReviewImages),
  uploadHandImage: handleUpload(uploadHandImage),
};
