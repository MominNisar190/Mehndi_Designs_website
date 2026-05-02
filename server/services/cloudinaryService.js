const { cloudinary } = require('../config/cloudinary');

// Delete image from Cloudinary
const deleteImage = async (publicId) => {
  if (!publicId) return;
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error(`Failed to delete image ${publicId}:`, error.message);
  }
};

// Delete multiple images
const deleteImages = async (publicIds) => {
  if (!publicIds || publicIds.length === 0) return;
  const promises = publicIds.map((id) => deleteImage(id));
  return Promise.allSettled(promises);
};

// Upload base64 image (for canvas preview)
const uploadBase64 = async (base64String, folder = 'saniya-mehndi/previews') => {
  const result = await cloudinary.uploader.upload(base64String, {
    folder,
    resource_type: 'image',
  });
  return { url: result.secure_url, publicId: result.public_id };
};

module.exports = { deleteImage, deleteImages, uploadBase64 };
