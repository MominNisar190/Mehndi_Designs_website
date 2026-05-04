'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Phone, Mail, User, CheckCircle, XCircle, Loader, AlertCircle, Trash2 } from 'lucide-react';
import { formatDate, getStatusColor } from '@/lib/utils';
import api from '@/lib/api';
import toast from 'react-hot-toast';

const statusOptions = ['pending', 'confirmed', 'completed', 'cancelled'];

const statusIcons = {
  pending:   <AlertCircle size={12} />,
  confirmed: <Loader size={12} />,
  completed: <CheckCircle size={12} />,
  cancelled: <XCircle size={12} />,
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [pagination, setPagination] = useState({ total: 0 });

  const fetchBookings = () => {
    const params = new URLSearchParams({ limit: 20 });
    if (filter) params.set('status', filter);
    api
      .get(`/bookings?${params}`)
      .then(({ data }) => { setBookings(data.data); setPagination(data.pagination); })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchBookings(); }, [filter]);

  const handleStatusChange = async (bookingId, status) => {
    try {
      await api.put(`/bookings/${bookingId}/status`, { status });
      setBookings((prev) => prev.map((b) => b._id === bookingId ? { ...b, status } : b));
      toast.success(`Status updated to ${status}`);
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (bookingId) => {
    if (!confirm('Delete this booking? This cannot be undone.')) return;
    try {
      await api.delete(`/bookings/${bookingId}`);
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      setPagination((p) => ({ ...p, total: p.total - 1 }));
      toast.success('Booking deleted');
    } catch {
      toast.error('Failed to delete booking');
    }
  };

  const counts = statusOptions.reduce((acc, s) => {
    acc[s] = bookings.filter((b) => b.status === s).length;
    return acc;
  }, {});

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-white">Bookings</h1>
          <p className="text-gray-400 text-sm mt-1">{pagination.total} total bookings</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statusOptions.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(filter === s ? '' : s)}
            className={`p-3 rounded-sm border text-left transition-all ${
              filter === s
                ? 'border-gold-500 bg-gold-500/10'
                : 'border-[#2a2a2a] bg-[#141414] hover:border-gold-500/30'
            }`}
          >
            <p className={`text-lg font-semibold ${
              s === 'pending' ? 'text-yellow-400' :
              s === 'confirmed' ? 'text-blue-400' :
              s === 'completed' ? 'text-green-400' : 'text-red-400'
            }`}>
              {counts[s] || 0}
            </p>
            <p className="text-gray-500 text-xs capitalize mt-0.5">{s}</p>
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-20 rounded-sm" />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="card p-16 text-center">
          <Calendar size={32} className="text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No bookings found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking, i) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="card p-4"
            >
              <div className="flex flex-col gap-4">

                {/* Customer */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center shrink-0">
                    <span className="text-gold-500 text-xs font-semibold">
                      {booking.customerName?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm">{booking.customerName}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <a href={`https://wa.me/${booking.customerPhone?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        booking.status === 'confirmed'
                          ? `Assalamu Alaikum ${booking.customerName}! 🌸\n\nYour mehndi appointment has been *CONFIRMED* ✅\n\n📅 Date: ${new Date(booking.bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}\n⏰ Time: ${booking.timeSlot}\n💎 Design: ${booking.design?.title || 'Selected Design'}\n\nWe look forward to seeing you!\n\n✨ *Saniya Mehndi Designs*`
                          : booking.status === 'completed'
                          ? `Assalamu Alaikum ${booking.customerName}! 🌸\n\nThank you for choosing *Saniya Mehndi Designs* 💛\n\nWe hope you loved your mehndi! 😊\nPlease share your feedback and photos with us.\n\n✨ *Saniya Mehndi Designs*`
                          : booking.status === 'cancelled'
                          ? `Assalamu Alaikum ${booking.customerName},\n\nWe regret to inform you that your booking has been *cancelled*.\n\nPlease contact us to reschedule.\n📞 +91 93590 16366\n\n✨ *Saniya Mehndi Designs*`
                          : `Assalamu Alaikum ${booking.customerName}! 🌸\n\nWe have received your booking request.\n\n📅 Date: ${new Date(booking.bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}\n⏰ Time: ${booking.timeSlot}\n💎 Design: ${booking.design?.title || 'Selected Design'}\n\nWe will confirm your appointment shortly. 🙏\n\n✨ *Saniya Mehndi Designs*`
                      )}`} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-green-400 hover:text-green-300 text-xs transition-colors">
                        <Phone size={10} /> {booking.customerPhone}
                      </a>
                      {booking.customerEmail && (
                        <a href={`mailto:${booking.customerEmail}?subject=${encodeURIComponent('Your Mehndi Appointment — Saniya Mehndi Designs')}&body=${encodeURIComponent(
                          `Dear ${booking.customerName},\n\nAppointment Details:\nDate: ${new Date(booking.bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}\nTime: ${booking.timeSlot}\nDesign: ${booking.design?.title || 'Selected Design'}\nStatus: ${booking.status.toUpperCase()}\n\nWarm regards,\nSaniya Mehndi Designs\n+91 93590 16366`
                        )}`}
                          className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs transition-colors">
                          <Mail size={10} /> {booking.customerEmail}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Design + Date + Status row */}
                <div className="flex flex-wrap items-center gap-3 ml-11">
                  {/* Design */}
                  <div className="flex items-center gap-2">
                    {booking.design?.images?.[0] && (
                      <img src={booking.design.images[0].url} alt="" className="w-8 h-8 rounded-sm object-cover shrink-0" />
                    )}
                    <p className="text-gray-300 text-xs">{booking.design?.title || '—'}</p>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <Calendar size={10} className="text-gold-500" />
                    {formatDate(booking.bookingDate)}
                    <Clock size={10} className="text-gold-500 ml-1" />
                    {booking.timeSlot}
                  </div>

                  {/* Status */}
                  <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium ${getStatusColor(booking.status)}`}>
                    {statusIcons[booking.status]}
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 ml-11">
                  <select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                    className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300 text-xs px-2 py-2 rounded-sm focus:outline-none focus:border-gold-500 cursor-pointer"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="p-2 border border-[#2a2a2a] text-red-400 hover:bg-red-400/10 hover:border-red-400/50 rounded-sm transition-colors shrink-0"
                    title="Delete booking"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

              </div>

              {/* Notes */}
              {booking.notes && (
                <div className="mt-3 pt-3 border-t border-[#2a2a2a]">
                  <p className="text-gray-500 text-xs">
                    <span className="text-gray-400 font-medium">Note: </span>
                    {booking.notes}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
