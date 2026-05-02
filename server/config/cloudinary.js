const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for design images
const designStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'saniya-mehndi/designs',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto' }],
  },
});

// Storage for review images
const reviewStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'saniya-mehndi/reviews',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, height: 800, crop: 'limit', quality: 'auto' }],
  },
});

// Storage for hand preview uploads
const previewStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'saniya-mehndi/previews',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 600, height: 600, crop: 'limit', quality: 'auto' }],
  },
});

const uploadDesign = multer({ storage: designStorage });
const uploadReview = multer({ storage: reviewStorage });
const uploadPreview = multer({ storage: previewStorage });

module.exports = { cloudinary, uploadDesign, uploadReview, uploadPreview };
