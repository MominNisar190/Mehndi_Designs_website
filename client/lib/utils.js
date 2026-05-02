import { format, parseISO } from 'date-fns';

// Format price in INR
export const formatPrice = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format time in minutes to readable string
export const formatTime = (minutes) => {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

// Format date
export const formatDate = (date) => {
  if (!date) return '';
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'dd MMM yyyy');
};

// Format date with time
export const formatDateTime = (date) => {
  if (!date) return '';
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'dd MMM yyyy, hh:mm a');
};

// Truncate text
export const truncate = (text, length = 100) => {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
};

// Get category label
export const getCategoryLabel = (category) => {
  const labels = {
    bridal: 'Bridal',
    arabic: 'Arabic',
    minimal: 'Minimal',
    'full-hand': 'Full Hand',
    'half-hand': 'Half Hand',
    festive: 'Festive',
  };
  return labels[category] || category;
};

// Get difficulty label and color
export const getDifficultyInfo = (difficulty) => {
  const info = {
    easy: { label: 'Easy', color: 'text-green-400' },
    medium: { label: 'Medium', color: 'text-yellow-400' },
    hard: { label: 'Hard', color: 'text-orange-400' },
    expert: { label: 'Expert', color: 'text-red-400' },
  };
  return info[difficulty] || { label: difficulty, color: 'text-gray-400' };
};

// Get status color
export const getStatusColor = (status) => {
  const colors = {
    pending: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    confirmed: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
    completed: 'text-green-400 bg-green-400/10 border-green-400/30',
    cancelled: 'text-red-400 bg-red-400/10 border-red-400/30',
  };
  return colors[status] || 'text-gray-400 bg-gray-400/10 border-gray-400/30';
};

// Generate star array for rating
export const getStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) => ({
    filled: i < Math.floor(rating),
    half: i === Math.floor(rating) && rating % 1 >= 0.5,
  }));
};

// Handle API error message
export const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    'Something went wrong. Please try again.'
  );
};

// Available time slots
export const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM', '07:00 PM',
];

// Package options
export const PACKAGES = [
  { value: 'basic', label: 'Basic', description: 'Simple design, one hand', multiplier: 0.8 },
  { value: 'standard', label: 'Standard', description: 'Full design as shown', multiplier: 1 },
  { value: 'premium', label: 'Premium', description: 'Extended design, both hands', multiplier: 1.3 },
  { value: 'bridal', label: 'Bridal', description: 'Full bridal package', multiplier: 2 },
];
