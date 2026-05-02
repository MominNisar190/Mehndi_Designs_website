'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const categories = [
  { slug: 'bridal', label: 'Bridal', emoji: '👰', description: 'Elaborate designs for your special day' },
  { slug: 'arabic', label: 'Arabic', emoji: '🌿', description: 'Bold floral patterns with open spaces' },
  { slug: 'minimal', label: 'Minimal', emoji: '✨', description: 'Clean, modern, understated elegance' },
  { slug: 'full-hand', label: 'Full Hand', emoji: '🤲', description: 'Complete coverage from wrist to fingertips' },
  { slug: 'half-hand', label: 'Half Hand', emoji: '🖐️', description: 'Elegant designs up to the wrist' },
  { slug: 'festive', label: 'Festive', emoji: '🎉', description: 'Perfect for Eid, Diwali & celebrations' },
];

export default function FeaturedCategories() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="section-heading">Browse by Category</h2>
        <div className="gold-divider" />
        <p className="text-gray-400 mt-4 max-w-xl mx-auto">
          From intricate bridal patterns to minimalist everyday designs — find your perfect style.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Link
              href={`/gallery?category=${cat.slug}`}
              className="card flex flex-col items-center text-center p-6 group cursor-pointer block"
            >
              <span className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {cat.emoji}
              </span>
              <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-gold-500 transition-colors">
                {cat.label}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed hidden lg:block">
                {cat.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
