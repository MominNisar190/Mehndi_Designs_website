'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import DesignCard from '@/components/gallery/DesignCard';
import GalleryFilters from '@/components/gallery/GalleryFilters';
import api from '@/lib/api';

export default function GalleryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ total: 0, pages: 1, page: 1 });
  const [search, setSearch] = useState('');

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    sort: 'latest',
    difficulty: '',
    minPrice: '',
    maxPrice: '',
    page: 1,
  });

  const fetchDesigns = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => { if (v) params.set(k, v); });
      if (search) params.set('search', search);
      params.set('limit', '12');

      const { data } = await api.get(`/designs?${params.toString()}`);
      setDesigns(data.data);
      setPagination(data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters, search]);

  useEffect(() => {
    fetchDesigns();
  }, [fetchDesigns]);

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters((f) => ({ ...f, page: 1 }));
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="section-heading">Design Gallery</h1>
        <div className="gold-divider" />
        <p className="text-gray-400 mt-4">
          {pagination.total > 0 ? `${pagination.total} designs available` : 'Explore our collection'}
        </p>
      </motion.div>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative max-w-md mx-auto">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search designs..."
            className="input-dark pl-10 pr-4"
          />
        </div>
      </form>

      {/* Filters */}
      <div className="mb-8">
        <GalleryFilters filters={filters} onChange={setFilters} />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="skeleton aspect-square rounded-sm" />
          ))}
        </div>
      ) : designs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {designs.map((design, i) => (
              <motion.div
                key={design._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <DesignCard design={design} />
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setFilters((f) => ({ ...f, page: p }))}
                  className={`w-10 h-10 rounded-sm text-sm transition-all ${
                    filters.page === p
                      ? 'bg-gold-500 text-dark-300 font-semibold'
                      : 'border border-[#2a2a2a] text-gray-400 hover:border-gold-500/50'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No designs found</p>
          <p className="text-gray-600 text-sm mt-2">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
