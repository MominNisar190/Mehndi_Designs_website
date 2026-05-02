const express = require('express');
const router = express.Router();
const {
  getDesigns,
  getDesign,
  createDesign,
  updateDesign,
  deleteDesign,
  deleteDesignImage,
} = require('../controllers/designController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { uploadDesignImages } = require('../middleware/uploadMiddleware');

router.get('/', getDesigns);
router.get('/:id', getDesign);
router.post('/', protect, adminOnly, uploadDesignImages, createDesign);
router.put('/:id', protect, adminOnly, uploadDesignImages, updateDesign);
router.delete('/:id', protect, adminOnly, deleteDesign);
router.delete('/:id/images/:imageId', protect, adminOnly, deleteDesignImage);

module.exports = router;
