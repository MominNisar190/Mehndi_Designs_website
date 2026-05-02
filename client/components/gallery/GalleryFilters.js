'use client';

import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';

const categories = [
  { value: '', label: 'All' },
  { value: 'bridal', label: 'Bridal' },
  { value: 'arabic', label: 'Arabic' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'full-hand', label: 'Full Hand' },
  { value: 'half-hand', label: 'Half Hand' },
  { value: 'festive', label: 'Festive' },
];

const sortOptions = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

const difficulties = [
  { value: '', label: 'All Levels' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
  { value: 'expert', label: 'Expert' },
];

export default function GalleryFilters({ filters, onChange }) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value, page: 1 });
  };

  const clearFilters = () => {
    onChange({ category: '', sort: 'latest', difficulty: '', minPrice: '', maxPrice: '', page: 1 });
  };

  const hasActiveFilters =
    filters.category || filters.difficulty || filters.minPrice || filters.maxPrice;

  return (
    <div className="space-y-4">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleChange('category', cat.value)}
            className={`px-4 py-2 text-sm rounded-sm border transition-all duration-200 ${
              filters.category === cat.value
                ? 'bg-gold-500 text-dark-300 border-gold-500 font-semibold'
                : 'border-[#2a2a2a] text-gray-400 hover:border-gold-500/50 hover:text-gold-500'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Sort + Advanced toggle */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <select
            value={filters.sort}
            onChange={(e) => handleChange('sort', e.target.value)}
            className="input-dark text-sm py-2 w-auto"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-2 px-3 py-2 text-sm border rounded-sm transition-colors ${
              showAdvanced
                ? 'border-gold-500 text-gold-500'
                : 'border-[#2a2a2a] text-gray-400 hover:border-gold-500/50'
            }`}
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors"
          >
            <X size={12} /> Clear filters
          </button>
        )}
      </div>

      {/* Advanced filters */}
      {showAdvanced && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[#141414] border border-[#2a2a2a] rounded-sm">
          <div>
            <label className="text-xs text-gray-400 mb-2 block uppercase tracking-wider">
              Difficulty
            </label>
            <select
              value={filters.difficulty}
              onChange={(e) => handleChange('difficulty', e.target.value)}
              className="input-dark text-sm py-2"
            >
              {difficulties.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-2 block uppercase tracking-wider">
              Min Price (₹)
            </label>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleChange('minPrice', e.target.value)}
              placeholder="0"
              className="input-dark text-sm py-2"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-2 block uppercase tracking-wider">
              Max Price (₹)
            </label>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleChange('maxPrice', e.target.value)}
              placeholder="10000"
              className="input-dark text-sm py-2"
            />
          </div>
        </div>
      )}
    </div>
  );
}
