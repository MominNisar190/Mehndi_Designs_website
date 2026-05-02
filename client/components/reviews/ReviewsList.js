'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, ThumbsUp } from 'lucide-react';
import { formatDate, getStars } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import ReviewForm from './ReviewForm';
import api from '@/lib/api';

export default function ReviewsList({ designId }) {
  const { isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [breakdown, setBreakdown] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [pagination, setPagination] = useState({ total: 0, pages: 1, page: 1 });

  const fetchReviews = (page = 1) => {
    api
      .get(`/reviews/design/${designId}?page=${page}`)
      .then(({ data }) => {
        setReviews(data.data);
        setBreakdown(data.breakdown);
        setPagination(data.pagination);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchReviews();
  }, [designId]);

  const handleReviewAdded = (review) => {
    setReviews((prev) => [review, ...prev]);
    setShowForm(false);
    setPagination((p) => ({ ...p, total: p.total + 1 }));
  };

  const avgRating =
    breakdown.length > 0
      ? breakdown.reduce((sum, b) => sum + b._id * b.count, 0) /
        breakdown.reduce((sum, b) => sum + b.count, 0)
      : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl text-white">
          Reviews ({pagination.total})
        </h2>
        {isAuthenticated && !showForm && (
          <button onClick={() => setShowForm(true)} className="btn-outline text-sm py-2">
            Write Review
          </button>
        )}
      </div>

      {/* Rating summary */}
      {breakdown.length > 0 && (
        <div className="card p-6 mb-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="text-center">
            <div className="font-serif text-5xl text-gold-500">{avgRating.toFixed(1)}</div>
            <div className="flex gap-1 justify-center mt-2">
              {getStars(avgRating).map((s, i) => (
                <Star
                  key={i}
                  size={14}
                  className={s.filled ? 'text-gold-500 fill-gold-500' : 'text-gray-600'}
                />
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-1">{pagination.total} reviews</p>
          </div>

          <div className="flex-1 w-full space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = breakdown.find((b) => b._id === star)?.count || 0;
              const pct = pagination.total > 0 ? (count / pagination.total) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-3 text-xs">
                  <span className="text-gray-400 w-4">{star}</span>
                  <Star size={10} className="text-gold-500 fill-gold-500" />
                  <div className="flex-1 h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold-500 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-gray-500 w-6">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Review form */}
      {showForm && (
        <ReviewForm
          designId={designId}
          onSuccess={handleReviewAdded}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Reviews list */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton h-24 rounded-sm" />
          ))}
        </div>
      ) : reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review, i) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card p-5"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center shrink-0">
                    <span className="text-gold-500 text-sm font-semibold">
                      {review.user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-white text-sm font-medium">{review.user?.name}</p>
                      {review.isVerified && (
                        <span className="flex items-center gap-1 text-xs text-green-400">
                          <CheckCircle size={10} /> Verified
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-xs">{formatDate(review.createdAt)}</p>
                  </div>
                </div>

                <div className="flex gap-0.5">
                  {getStars(review.rating).map((s, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={s.filled ? 'text-gold-500 fill-gold-500' : 'text-gray-600'}
                    />
                  ))}
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">{review.comment}</p>

              {/* Review images */}
              {review.images?.length > 0 && (
                <div className="flex gap-2 mt-3">
                  {review.images.map((img, i) => (
                    <div key={i} className="relative w-16 h-16 rounded-sm overflow-hidden">
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          <p>No reviews yet. Be the first to review!</p>
        </div>
      )}
    </div>
  );
}
