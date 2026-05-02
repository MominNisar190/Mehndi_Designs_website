export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const CATEGORIES = [
  { value: 'bridal', label: 'Bridal', emoji: '👰' },
  { value: 'arabic', label: 'Arabic', emoji: '🌿' },
  { value: 'minimal', label: 'Minimal', emoji: '✨' },
  { value: 'full-hand', label: 'Full Hand', emoji: '🤲' },
  { value: 'half-hand', label: 'Half Hand', emoji: '🖐️' },
  { value: 'festive', label: 'Festive', emoji: '🎉' },
];

export const BOOKING_STATUSES = {
  pending: { label: 'Pending', color: 'yellow' },
  confirmed: { label: 'Confirmed', color: 'blue' },
  completed: { label: 'Completed', color: 'green' },
  cancelled: { label: 'Cancelled', color: 'red' },
};
