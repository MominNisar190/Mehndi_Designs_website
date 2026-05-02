'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Sparkles } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center bg-[#141414] border border-gold-500/30 rounded-sm p-12 md:p-16 relative overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-gold-500/5 blur-3xl" />

        <div className="relative z-10">
          <Sparkles size={32} className="text-gold-500 mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-4">
            Ready to Look{' '}
            <span className="text-gold-500">Stunning?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Book your mehndi appointment today and let us create something beautiful for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="btn-gold flex items-center justify-center gap-2 text-base px-8 py-4">
              <Calendar size={18} />
              Book Appointment
            </Link>
            <Link href="/gallery" className="btn-outline flex items-center justify-center gap-2 text-base px-8 py-4">
              Browse Gallery
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
