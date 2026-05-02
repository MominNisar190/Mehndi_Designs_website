const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    design: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Design',
      required: true,
    },
    // Customer details (no login required)
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    customerEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    customerPhone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    bookingDate: {
      type: Date,
      required: [true, 'Booking date is required'],
    },
    timeSlot: {
      type: String,
      required: [true, 'Time slot is required'],
    },
    package: {
      type: String,
      enum: ['basic', 'standard', 'premium', 'bridal'],
      default: 'standard',
    },
    address: {
      street: { type: String, default: 'N/A' },
      city:   { type: String, default: 'N/A' },
      state:  { type: String, default: 'N/A' },
      pincode:{ type: String, default: '000000' },
    },
    isHomeService: {
      type: Boolean,
      default: false,
    },
    isUrgent: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    cancellationReason: String,
    adminNotes: String,
  },
  { timestamps: true }
);

bookingSchema.index({ bookingDate: 1, status: 1 });
bookingSchema.index({ customerPhone: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
