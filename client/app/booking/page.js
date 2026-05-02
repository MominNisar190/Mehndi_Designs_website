'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Calendar, Clock, AlertCircle, CheckCircle, Phone, User, Mail } from 'lucide-react';
import { TIME_SLOTS } from '@/lib/utils';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const [booking, setBooking] = useState(null);

  const designId = searchParams.get('design');
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (designId) {
      api.get(`/designs/${designId}`)
        .then(({ data }) => setDesign(data.data))
        .catch(console.error);
    }
  }, [designId]);

  const onSubmit = async (formData) => {
    if (!design) {
      toast.error('Please select a design first');
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post('/bookings', {
        design: design._id,
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerEmail: formData.customerEmail || '',
        bookingDate: formData.bookingDate,
        timeSlot: formData.timeSlot,
        notes: formData.notes || '',
        package: 'standard',
        address: { street: 'N/A', city: 'N/A', state: 'N/A', pincode: '000000' },
        totalAmount: 0,
      });
      setBooking(data.data);
      setBooked(true);
      toast.success('Booking confirmed!');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Booking failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ──
  if (booked && booking) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-10 text-center max-w-md w-full space-y-5"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto">
            <CheckCircle size={36} className="text-green-400" />
          </div>
          <h2 className="font-serif text-3xl text-white">Booking Confirmed!</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your appointment has been received. We will contact you shortly to confirm the details.
          </p>

          <div className="bg-[#1a1a1a] rounded-sm p-4 text-left space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Design</span>
              <span className="text-white font-medium">{design?.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Date</span>
              <span className="text-white">
                {new Date(booking.bookingDate).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Time</span>
              <span className="text-white">{booking.timeSlot}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button onClick={() => router.push('/gallery')} className="btn-gold w-full py-3">
              Browse More Designs
            </button>
            <button
              onClick={() => { setBooked(false); setBooking(null); }}
              className="btn-outline w-full py-3"
            >
              Book Another
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Booking form ──
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-heading text-center mb-2">Book Appointment</h1>
        <div className="gold-divider" />
        <p className="text-center text-gray-400 text-sm mt-4 mb-10">
          Fill in your details and we&apos;ll confirm your appointment
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Selected design */}
          {design ? (
            <div className="card p-4 flex items-center gap-4">
              <div className="w-14 h-14 bg-[#1a1a1a] rounded-sm overflow-hidden shrink-0">
                {design.images?.[0] && (
                  <img src={design.images[0].url} alt={design.title} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{design.title}</p>
                <p className="text-gray-500 text-xs capitalize">{design.category}</p>
              </div>
            </div>
          ) : (
            <div className="card p-4 flex items-center gap-3 border-dashed">
              <AlertCircle size={16} className="text-yellow-400 shrink-0" />
              <p className="text-gray-400 text-sm">
                No design selected.{' '}
                <a href="/gallery" className="text-gold-500 hover:underline">Browse gallery</a>
              </p>
            </div>
          )}

          {/* Name */}
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <User size={11} /> Your Name
            </label>
            <input
              placeholder="Full name"
              {...register('customerName', { required: 'Name is required' })}
              className="input-dark"
            />
            {errors.customerName && <p className="text-red-400 text-xs mt-1">{errors.customerName.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Phone size={11} /> Phone Number
            </label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              {...register('customerPhone', { required: 'Phone number is required' })}
              className="input-dark"
            />
            {errors.customerPhone && <p className="text-red-400 text-xs mt-1">{errors.customerPhone.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Mail size={11} /> Email
              <span className="text-gray-600 normal-case font-normal">(optional)</span>
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              {...register('customerEmail')}
              className="input-dark"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Calendar size={11} /> Date
              </label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                {...register('bookingDate', { required: 'Date is required' })}
                className="input-dark"
              />
              {errors.bookingDate && <p className="text-red-400 text-xs mt-1">{errors.bookingDate.message}</p>}
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Clock size={11} /> Time Slot
              </label>
              <select
                {...register('timeSlot', { required: 'Time slot is required' })}
                className="input-dark"
              >
                <option value="">Select time</option>
                {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              {errors.timeSlot && <p className="text-red-400 text-xs mt-1">{errors.timeSlot.message}</p>}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">
              Special Requests
              <span className="text-gray-600 normal-case font-normal ml-1">(optional)</span>
            </label>
            <textarea
              {...register('notes')}
              rows={3}
              placeholder="Any specific requirements or customizations..."
              className="input-dark resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full py-4 text-base flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-dark-300/30 border-t-dark-300 rounded-full animate-spin" />
                Confirming...
              </>
            ) : (
              <>
                <Calendar size={18} />
                Confirm Booking
              </>
            )}
          </button>

        </form>
      </motion.div>
    </div>
  );
}
