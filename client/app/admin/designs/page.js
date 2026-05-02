'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Star, Eye } from 'lucide-react';
import { formatTime, getCategoryLabel } from '@/lib/utils';
import DesignFormModal from '@/components/admin/DesignFormModal';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function AdminDesignsPage() {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editDesign, setEditDesign] = useState(null);

  const fetchDesigns = () => {
    api
      .get('/designs?limit=50&sort=latest')
      .then(({ data }) => setDesigns(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchDesigns(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this design? This cannot be undone.')) return;
    try {
      await api.delete(`/designs/${id}`);
      setDesigns((prev) => prev.filter((d) => d._id !== id));
      toast.success('Design deleted');
    } catch {
      toast.error('Failed to delete design');
    }
  };

  const handleToggleFeatured = async (design) => {
    try {
      await api.put(`/designs/${design._id}`, { isFeatured: !design.isFeatured });
      setDesigns((prev) =>
        prev.map((d) => (d._id === design._id ? { ...d, isFeatured: !d.isFeatured } : d))
      );
    } catch {
      toast.error('Failed to update');
    }
  };

  const handleSaved = () => {
    setShowModal(false);
    setEditDesign(null);
    fetchDesigns();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-white">Designs</h1>
          <p className="text-gray-400 text-sm mt-1">{designs.length} designs total</p>
        </div>
        <button
          onClick={() => { setEditDesign(null); setShowModal(true); }}
          className="btn-gold flex items-center gap-2"
        >
          <Plus size={16} /> Add Design
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-48 rounded-sm" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {designs.map((design) => (
            <motion.div
              key={design._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card overflow-hidden"
            >
              <div className="relative aspect-video bg-[#1a1a1a]">
                {design.images?.[0] && (
                  <img
                    src={design.images[0].url}
                    alt={design.title}
                    className="w-full h-full object-cover"
                  />
                )}
                {design.isFeatured && (
                  <div className="absolute top-2 left-2 badge-gold text-xs">Featured</div>
                )}
                {!design.isActive && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-red-400 text-sm font-medium">Inactive</span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="mb-2">
                  <h3 className="text-white text-sm font-medium line-clamp-1">{design.title}</h3>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>{getCategoryLabel(design.category)}</span>
                  <span>{formatTime(design.timeRequired)}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => { setEditDesign(design); setShowModal(true); }}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs border border-[#2a2a2a] text-gray-400 hover:border-gold-500/50 hover:text-gold-500 rounded-sm transition-colors"
                  >
                    <Edit size={12} /> Edit
                  </button>
                  <button
                    onClick={() => handleToggleFeatured(design)}
                    className={`flex items-center justify-center gap-1 py-1.5 px-2 text-xs border rounded-sm transition-colors ${
                      design.isFeatured
                        ? 'border-gold-500 text-gold-500'
                        : 'border-[#2a2a2a] text-gray-400 hover:border-gold-500/50'
                    }`}
                    title="Toggle featured"
                  >
                    <Star size={12} />
                  </button>
                  <button
                    onClick={() => handleDelete(design._id)}
                    className="flex items-center justify-center gap-1 py-1.5 px-2 text-xs border border-[#2a2a2a] text-red-400 hover:border-red-400/50 rounded-sm transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {showModal && (
        <DesignFormModal
          design={editDesign}
          onClose={() => { setShowModal(false); setEditDesign(null); }}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
