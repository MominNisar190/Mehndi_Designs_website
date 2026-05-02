const { body, param, query } = require('express-validator');

const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 50 }),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

const bookingValidation = [
  body('design').isMongoId().withMessage('Valid design ID is required'),
  body('customerName').trim().notEmpty().withMessage('Your name is required'),
  body('customerPhone').trim().notEmpty().withMessage('Phone number is required'),
  body('bookingDate').isISO8601().withMessage('Valid booking date is required'),
  body('timeSlot').notEmpty().withMessage('Time slot is required'),
];

const reviewValidation = [
  body('design').isMongoId().withMessage('Valid design ID is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment')
    .trim()
    .notEmpty()
    .withMessage('Review comment is required')
    .isLength({ max: 1000 }),
];

module.exports = {
  registerValidation,
  loginValidation,
  bookingValidation,
  reviewValidation,
};
