'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { formatDate, formatPrice, getStatusColor } from '@/lib/utils';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function MyBookingsPage() {
  const { isAuthenticated, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isAdmin)) router.push('/login');
  }, [isAuthenticated, isAdmin, authLoading, router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const params = filter ? `?status=${filter}` : '';
    api
      .get(`/bookings/my${params}`)
      .then(({ data }) => setBookings(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isAuthenticated, filter]);

  const handleCancel = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await api.put(`/bookings/${bookingId}/cancel`, { reason: 'Cancelled by user' });
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: 'cancelled' } : b))
      );
      toast.success('Booking cancelled');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to cancel');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/account" className="text-gray-400 hover:text-gold-500 transition-colors">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="font-serif text-2xl text-white">My Bookings</h1>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['', 'pending', 'confirmed', 'completed', 'cancelled'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 text-sm rounded-sm border whitespace-nowrap transition-all ${
              filter === s
                ? 'bg-gold-500 text-dark-300 border-gold-500 font-semibold'
                : 'border-[#2a2a2a] text-gray-400 hover:border-gold-500/50'
            }`}
          >
            {s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton h-24 rounded-sm" />
          ))}
        </div>
      ) : bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking, i) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              {/* Design image */}
              <div className="w-16 h-16 bg-[#1a1a1a] rounded-sm overflow-hidden shrink-0">
                {booking.design?.images?.[0] && (
                  <img
                    src={booking.design.images[0].url}
                    alt={booking.design.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{booking.design?.title}</p>
                <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={10} /> {formatDate(booking.bookingDate)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={10} /> {booking.timeSlot}
                  </span>
                  <span className="text-gold-500">{formatPrice(booking.totalAmount)}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
                {['pending', 'confirmed'].includes(booking.status) && (
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Calendar size={40} className="text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No bookings found</p>
          <Link href="/gallery" className="btn-gold mt-4 inline-block">
            Browse Designs
          </Link>
        </div>
      )}
    </div>
  );
}
