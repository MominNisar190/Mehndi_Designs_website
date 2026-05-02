'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import DesignCard from '@/components/gallery/DesignCard';
import api from '@/lib/api';

export default function FeaturedDesigns() {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/designs?featured=true&limit=6')
      .then(({ data }) => setDesigns(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="section-heading">Featured Designs</h2>
        <div className="gold-divider" />
        <p className="text-gray-400 mt-4">Our most loved and booked designs</p>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-80 rounded-sm" />
          ))}
        </div>
      ) : designs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.map((design, i) => (
            <motion.div
              key={design._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <DesignCard design={design} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500">
          <p>No featured designs yet. Check back soon!</p>
        </div>
      )}

      <div className="text-center mt-10">
        <Link href="/gallery" className="btn-outline">
          View All Designs
        </Link>
      </div>
    </section>
  );
}
