'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatTime, getCategoryLabel } from '@/lib/utils';

export default function DesignCard({ design }) {
  const primaryImage = design.images?.find((img) => img.isPrimary) || design.images?.[0];
  const imageUrl = primaryImage?.url || '/placeholder-design.jpg';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="card group overflow-hidden"
    >
      <Link href={`/design/${design._id}`}>
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-[#1a1a1a]">
          <Image
            src={imageUrl}
            alt={design.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex items-center gap-2 text-white text-sm">
              <Eye size={16} />
              <span>View Design</span>
            </div>
          </div>

          {/* Featured badge */}
          {design.isFeatured && (
            <div className="absolute top-3 left-3 badge-gold text-xs">
              <Star size={10} className="fill-gold-500" /> Featured
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-white font-medium text-sm leading-tight group-hover:text-gold-500 transition-colors line-clamp-2 mb-2">
            {design.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-xs capitalize">
              {getCategoryLabel(design.category)}
            </span>
            <div className="flex items-center gap-3 text-gray-500 text-xs">
              {design.timeRequired && (
                <span className="flex items-center gap-1">
                  <Clock size={10} />
                  {formatTime(design.timeRequired)}
                </span>
              )}
              {design.averageRating > 0 && (
                <span className="flex items-center gap-1">
                  <Star size={10} className="text-gold-500 fill-gold-500" />
                  {design.averageRating}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
