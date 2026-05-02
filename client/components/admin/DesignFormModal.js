'use client';

import { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import toast from 'react-hot-toast';

const categories = ['bridal', 'arabic', 'minimal', 'full-hand', 'half-hand', 'festive'];
const difficulties = ['easy', 'medium', 'hard', 'expert'];

export default function DesignFormModal({ design, onClose, onSaved }) {
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState(design?.images || []);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: design
      ? {
          title: design.title,
          category: design.category,
          description: design.description,
          timeRequired: design.timeRequired,
          difficulty: design.difficulty,
          tags: design.tags?.join(', '),
          isFeatured: design.isFeatured,
          isActive: design.isActive,
        }
      : { difficulty: 'medium', isActive: true },
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    setImagePreviews(files.map((f) => ({ url: URL.createObjectURL(f) })));
  };

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const fd = new FormData();
      // Add price=0 as placeholder since model still has it
      fd.append('price', 0);
      Object.entries(formData).forEach(([k, v]) => {
        if (v !== undefined && v !== null) fd.append(k, v);
      });
      imageFiles.forEach((file) => fd.append('images', file));

      if (design) {
        await api.put(`/designs/${design._id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Design updated');
      } else {
        await api.post('/designs', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Design created');
      }
      onSaved();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to save design');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="bg-[#141414] border border-[#2a2a2a] rounded-sm w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between p-5 border-b border-[#2a2a2a]">
            <h2 className="font-serif text-xl text-white">
              {design ? 'Edit Design' : 'Add New Design'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">

            {/* Images */}
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">
                Images (max 5)
              </label>
              <label className="flex items-center gap-3 p-3 border border-dashed border-[#2a2a2a] hover:border-gold-500/50 rounded-sm cursor-pointer transition-colors">
                <Upload size={16} className="text-gray-500" />
                <span className="text-gray-400 text-sm">
                  {imageFiles.length > 0 ? `${imageFiles.length} file(s) selected` : 'Click to upload images'}
                </span>
                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
              {imagePreviews.length > 0 && (
                <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                  {imagePreviews.map((img, i) => (
                    <img key={i} src={img.url} alt="" className="w-16 h-16 object-cover rounded-sm shrink-0" />
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Title */}
              <div className="sm:col-span-2">
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Title</label>
                <input
                  {...register('title', { required: 'Title is required' })}
                  className="input-dark"
                  placeholder="Design title"
                />
                {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
              </div>

              {/* Category */}
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Category</label>
                <select {...register('category', { required: true })} className="input-dark">
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c.charAt(0).toUpperCase() + c.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty */}
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Difficulty</label>
                <select {...register('difficulty')} className="input-dark">
                  {difficulties.map((d) => (
                    <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
                  ))}
                </select>
              </div>

              {/* Time */}
              <div className="sm:col-span-2">
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">
                  Time Required (minutes)
                </label>
                <input
                  type="number"
                  {...register('timeRequired', { required: 'Time is required', min: 15 })}
                  className="input-dark"
                  placeholder="60"
                />
                {errors.timeRequired && <p className="text-red-400 text-xs mt-1">{errors.timeRequired.message}</p>}
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Description</label>
                <textarea
                  {...register('description', { required: 'Description is required' })}
                  rows={3}
                  className="input-dark resize-none"
                  placeholder="Describe this design..."
                />
                {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
              </div>

              {/* Tags */}
              <div className="sm:col-span-2">
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">
                  Tags <span className="text-gray-600 normal-case font-normal">(comma separated)</span>
                </label>
                <input
                  {...register('tags')}
                  className="input-dark"
                  placeholder="bridal, floral, traditional"
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register('isFeatured')} className="accent-gold-500 w-4 h-4" />
                <span className="text-gray-300 text-sm">Featured</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register('isActive')} className="accent-gold-500 w-4 h-4" />
                <span className="text-gray-300 text-sm">Active</span>
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={loading} className="btn-gold flex-1 py-3">
                {loading ? 'Saving...' : design ? 'Update Design' : 'Create Design'}
              </button>
              <button type="button" onClick={onClose} className="btn-outline py-3 px-6">
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
