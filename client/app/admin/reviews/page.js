'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, XCircle } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const params = new URLSearchParams({ limit: 50 });
    if (filter !== '') params.set('isApproved', filter);
    api
      .get(`/reviews?${params}`)
      .then(({ data }) => setReviews(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [filter]);

  const handleToggleApproval = async (reviewId, current) => {
    try {
      await api.put(`/reviews/${reviewId}/approve`);
      setReviews((prev) =>
        prev.map((r) => (r._id === reviewId ? { ...r, isApproved: !current } : r))
      );
      toast.success(`Review ${!current ? 'approved' : 'hidden'}`);
    } catch {
      toast.error('Failed to update review');
    }
  };

  const handleDelete = async (reviewId) => {
    if (!confirm('Delete this review?')) return;
    try {
      await api.delete(`/reviews/${reviewId}`);
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      toast.success('Review deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-white">Reviews</h1>
        <p className="text-gray-400 text-sm mt-1">Manage customer reviews</p>
      </div>

      <div className="flex gap-2">
        {[['', 'All'], ['true', 'Approved'], ['false', 'Pending']].map(([val, label]) => (
          <button
            key={val}
            onClick={() => setFilter(val)}
            className={`px-4 py-2 text-sm rounded-sm border transition-all ${
              filter === val
                ? 'bg-gold-500 text-dark-300 border-gold-500 font-semibold'
                : 'border-[#2a2a2a] text-gray-400 hover:border-gold-500/50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton h-20 rounded-sm" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-white text-sm font-medium">{review.user?.name}</span>
                    <span className="text-gray-500 text-xs">on</span>
                    <span className="text-gold-500 text-xs truncate">{review.design?.title}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} size={10} className="text-gold-500 fill-gold-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm line-clamp-2">{review.comment}</p>
                  <p className="text-gray-600 text-xs mt-1">{formatDate(review.createdAt)}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${
                    review.isApproved
                      ? 'text-green-400 bg-green-400/10 border-green-400/30'
                      : 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30'
                  }`}>
                    {review.isApproved ? 'Approved' : 'Pending'}
                  </span>
                  <button
                    onClick={() => handleToggleApproval(review._id, review.isApproved)}
                    className="text-gray-400 hover:text-gold-500 transition-colors"
                    title={review.isApproved ? 'Hide review' : 'Approve review'}
                  >
                    {review.isApproved ? <XCircle size={16} /> : <CheckCircle size={16} />}
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="text-gray-400 hover:text-red-400 transition-colors text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          {reviews.length === 0 && (
            <div className="text-center py-12 text-gray-500">No reviews found</div>
          )}
        </div>
      )}
    </div>
  );
}
