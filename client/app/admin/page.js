'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Calendar, Clock, Star } from 'lucide-react';
import { formatDate, getStatusColor } from '@/lib/utils';
import api from '@/lib/api';

function StatCard({ icon: Icon, label, value, sub, color = 'text-gold-500' }) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{label}</p>
          <p className={`font-serif text-3xl ${color}`}>{value}</p>
          {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
        </div>
        <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center">
          <Icon size={18} className="text-gold-500" />
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/admin/stats')
      .then(({ data }) => setStats(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-28 rounded-sm" />
          ))}
        </div>
      </div>
    );
  }

  const { overview, recentBookings, popularDesigns } = stats || {};

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-white mb-1">Dashboard</h1>
        <p className="text-gray-400 text-sm">Welcome back, Admin</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={Calendar} label="Total Bookings" value={overview?.totalBookings || 0} sub={`+${overview?.monthBookings || 0} this month`} />
        <StatCard icon={Users} label="Total Users" value={overview?.totalUsers || 0} sub={`+${overview?.newUsersThisMonth || 0} new`} />
        <StatCard icon={Clock} label="Pending" value={overview?.pendingBookings || 0} sub="Awaiting confirmation" color="text-yellow-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent bookings */}
        <div className="card p-6">
          <h2 className="font-serif text-xl text-white mb-4">Recent Bookings</h2>
          {recentBookings?.length > 0 ? (
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div key={booking._id} className="flex items-center gap-3 py-2 border-b border-[#2a2a2a] last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm truncate">{booking.user?.name}</p>
                    <p className="text-gray-500 text-xs truncate">{booking.design?.title}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No recent bookings</p>
          )}
        </div>

        {/* Popular designs */}
        <div className="card p-6">
          <h2 className="font-serif text-xl text-white mb-4">Popular Designs</h2>
          {popularDesigns?.length > 0 ? (
            <div className="space-y-3">
              {popularDesigns.map((design, i) => (
                <div key={design._id} className="flex items-center gap-3 py-2 border-b border-[#2a2a2a] last:border-0">
                  <span className="text-gold-500 font-semibold text-sm w-5">{i + 1}</span>
                  <div className="w-10 h-10 bg-[#1a1a1a] rounded-sm overflow-hidden shrink-0">
                    {design.images?.[0] && (
                      <img src={design.images[0].url} alt="" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm truncate">{design.title}</p>
                    <p className="text-gray-500 text-xs">{design.bookingCount} bookings</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gold-500">
                    <Star size={10} className="fill-gold-500" />
                    {design.averageRating || '—'}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No data yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
