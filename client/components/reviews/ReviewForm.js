'use client';

import { useState } from 'react';
import { Star, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function ReviewForm({ designId, onSuccess, onCancel }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async ({ comment }) => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post('/reviews', { design: designId, rating, comment });
      toast.success('Review submitted!');
      onSuccess(data.data);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-medium">Write a Review</h3>
        <button onClick={onCancel} className="text-gray-500 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Star rating */}
        <div>
          <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  size={24}
                  className={
                    star <= (hoverRating || rating)
                      ? 'text-gold-500 fill-gold-500'
                      : 'text-gray-600'
                  }
                />
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Your Review</label>
          <textarea
            {...register('comment', {
              required: 'Please write a review',
              minLength: { value: 10, message: 'Min 10 characters' },
            })}
            rows={4}
            placeholder="Share your experience with this design..."
            className="input-dark resize-none"
          />
          {errors.comment && <p className="text-red-400 text-xs mt-1">{errors.comment.message}</p>}
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="btn-gold flex-1 py-2 text-sm">
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
          <button type="button" onClick={onCancel} className="btn-outline py-2 px-4 text-sm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
