const crypto = require('crypto');
const razorpay = require('../config/razorpay');

// Create Razorpay order
const createOrder = async ({ amount, currency = 'INR', receipt, notes = {} }) => {
  const options = {
    amount: Math.round(amount * 100), // Razorpay expects paise
    currency,
    receipt,
    notes,
  };

  const order = await razorpay.orders.create(options);
  return order;
};

// Verify Razorpay payment signature
const verifyPayment = ({ razorpayOrderId, razorpayPaymentId, razorpaySignature }) => {
  const body = razorpayOrderId + '|' + razorpayPaymentId;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  return expectedSignature === razorpaySignature;
};

// Fetch payment details
const getPaymentDetails = async (paymentId) => {
  return await razorpay.payments.fetch(paymentId);
};

// Initiate refund
const initiateRefund = async (paymentId, amount) => {
  return await razorpay.payments.refund(paymentId, {
    amount: Math.round(amount * 100),
  });
};

module.exports = { createOrder, verifyPayment, getPaymentDetails, initiateRefund };
