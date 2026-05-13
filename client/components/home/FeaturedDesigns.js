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
    // Always show latest 6 designs — featured ones first, then rest
    api
      .get('/designs?limit=6&sort=latest')
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
        <h2 className="section-heading">Our Designs</h2>
        <div className="gold-divider" />
        <p className="text-gray-400 mt-4">Explore our most loved mehndi designs</p>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] skeleton rounded-sm" />
          ))}
        </div>
      ) : designs.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {designs.map((design, i) => (
            <DesignCard key={design._id} design={design} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">No designs added yet.</p>
          <Link href="/admin/designs" className="btn-gold text-sm">
            Add Designs
          </Link>
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
