'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, Calendar, Eye, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { formatTime, getCategoryLabel, getDifficultyInfo } from '@/lib/utils';
import DesignCard from '@/components/gallery/DesignCard';
import ReviewsList from '@/components/reviews/ReviewsList';
import HandPreview from '@/components/preview/HandPreview';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function DesignDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const thumbsRef = useRef(null);

  useEffect(() => {
    api.get(`/designs/${id}`)
      .then(({ data }) => setDesign(data.data))
      .catch((err) => {
        console.error(err);
        toast.error('Design not found');
        router.push('/gallery');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const goNext = () => {
    setImgLoaded(false);
    setActiveImage((p) => (p + 1) % design.images.length);
  };

  const goPrev = () => {
    setImgLoaded(false);
    setActiveImage((p) => (p - 1 + design.images.length) % design.images.length);
  };

  const selectImage = (i) => {
    setImgLoaded(false);
    setActiveImage(i);
    // Scroll thumbnail into view
    const el = thumbsRef.current?.children[i];
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
          <div className="space-y-3">
            <div className="aspect-[3/4] rounded-sm bg-[#141414] animate-pulse" />
            <div className="flex gap-2">
              {[1,2,3].map(i => <div key={i} className="w-16 h-16 rounded-sm bg-[#141414] animate-pulse" />)}
            </div>
          </div>
          <div className="space-y-4 pt-4">
            {[80,60,40,90,50].map((w,i) => (
              <div key={i} className={`h-6 rounded-sm bg-[#141414] animate-pulse`} style={{width:`${w}%`}} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!design) return null;

  const diffInfo = getDifficultyInfo(design.difficulty);

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-gold-500 transition-colors mt-6 mb-8 text-sm group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Gallery
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20">

          {/* ── Image Section ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main image */}
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-[#141414] border border-[#2a2a2a] group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src={design.images[activeImage]?.url || '/placeholder-design.jpg'}
                    alt={design.title}
                    fill
                    className="object-cover"
                    priority
                    onLoad={() => setImgLoaded(true)}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Gradient overlay bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Nav arrows */}
              {design.images.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-gold-500/80 hover:border-gold-500 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={goNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-gold-500/80 hover:border-gold-500 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}

              {/* Image counter */}
              {design.images.length > 1 && (
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full border border-white/10">
                  {activeImage + 1} / {design.images.length}
                </div>
              )}

              {/* Featured badge */}
              {design.isFeatured && (
                <div className="absolute top-3 left-3 flex items-center gap-1 bg-gold-500 text-dark-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                  <Sparkles size={9} /> Featured
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {design.images.length > 1 && (
              <div
                ref={thumbsRef}
                className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide"
                style={{ scrollbarWidth: 'none' }}
              >
                {design.images.map((img, i) => (
                  <motion.button
                    key={i}
                    onClick={() => selectImage(i)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-16 h-20 shrink-0 rounded-sm overflow-hidden border-2 transition-all duration-300 ${
                      activeImage === i
                        ? 'border-gold-500 shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                        : 'border-transparent opacity-60 hover:opacity-100 hover:border-gold-500/40'
                    }`}
                  >
                    <Image src={img.url} alt="" fill className="object-cover" />
                    {activeImage === i && (
                      <div className="absolute inset-0 bg-gold-500/10" />
                    )}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Dot indicators */}
            {design.images.length > 1 && (
              <div className="flex justify-center gap-1.5 mt-3">
                {design.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => selectImage(i)}
                    className={`rounded-full transition-all duration-300 ${
                      activeImage === i
                        ? 'w-6 h-1.5 bg-gold-500'
                        : 'w-1.5 h-1.5 bg-[#2a2a2a] hover:bg-gold-500/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* ── Details Section ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            {/* Category */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="badge-gold text-xs mb-4 inline-block">
                {getCategoryLabel(design.category)}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-5"
            >
              {design.title}
            </motion.h1>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="w-16 h-0.5 bg-gradient-to-r from-gold-500 to-transparent mb-5 origin-left"
            />

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-6"
            >
              {design.timeRequired && (
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Clock size={14} className="text-gold-500" />
                  {formatTime(design.timeRequired)}
                </div>
              )}
              <div className={`text-sm font-medium ${diffInfo.color}`}>
                {diffInfo.label} level
              </div>
              {design.averageRating > 0 && (
                <div className="flex items-center gap-1.5 text-sm">
                  <Star size={14} className="text-gold-500 fill-gold-500" />
                  <span className="text-white font-medium">{design.averageRating}</span>
                  <span className="text-gray-500">({design.reviewCount})</span>
                </div>
              )}
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-gray-300 leading-relaxed mb-8 text-sm md:text-base"
            >
              {design.description}
            </motion.p>

            {/* Tags */}
            {design.tags?.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {design.tags.map((tag) => (
                  <span key={tag} className="text-xs text-gray-500 border border-[#2a2a2a] hover:border-gold-500/30 px-3 py-1 rounded-full transition-colors">
                    #{tag}
                  </span>
                ))}
              </motion.div>
            )}

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href={`/booking?design=${design._id}`}
                className="btn-gold flex items-center justify-center gap-2 flex-1 py-4 text-base"
              >
                <Calendar size={16} />
                Book This Design
              </Link>
              <button
                onClick={() => setShowPreview(true)}
                className="btn-outline flex items-center justify-center gap-2 flex-1 py-4 text-base"
              >
                <Eye size={16} />
                Try on Hand
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <ReviewsList designId={design._id} />
        </motion.div>

        {/* Related */}
        {design.related?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-serif text-2xl md:text-3xl text-white">Related Designs</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gold-500/30 to-transparent" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {design.related.map((d, i) => (
                <DesignCard key={d._id} design={d} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {showPreview && (
        <HandPreview design={design} onClose={() => setShowPreview(false)} />
      )}
    </div>
  );
}
