'use client';

import { useState } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export function useBooking() {
  const [loading, setLoading] = useState(false);

  const createBooking = async (bookingData) => {
    setLoading(true);
    try {
      const { data } = await api.post('/bookings', bookingData);
      return data.data;
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Booking failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId, reason) => {
    setLoading(true);
    try {
      await api.put(`/bookings/${bookingId}/cancel`, { reason });
      toast.success('Booking cancelled');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Cancellation failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createBooking, cancelBooking, loading };
}
