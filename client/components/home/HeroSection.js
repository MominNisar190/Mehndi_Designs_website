'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, Calendar } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        {/* Decorative gold circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gold-500/5 blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 md:pt-28">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 badge-gold mb-8"
        >
          <Sparkles size={12} />
          <span>Premium Mehndi Artistry</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-tight mb-6"
        >
          Let Your Hands
          <br />
          <span className="text-gold-500">Tell Your</span>
          <br />
          Beautiful Story
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Exquisite mehndi designs crafted for your most precious moments.
          Bridal, festive, and everyday elegance — all in one place.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/booking" className="btn-gold flex items-center justify-center gap-2 text-base px-8 py-4">
            <Calendar size={18} />
            Book Now
          </Link>
          <Link href="/gallery" className="btn-outline flex items-center justify-center gap-2 text-base px-8 py-4">
            <Sparkles size={18} />
            Explore Designs
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 mb-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: '500+', label: 'Designs' },
            { value: '1000+', label: 'Happy Clients' },
            { value: '5★', label: 'Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-2xl md:text-3xl text-gold-500">{stat.value}</div>
              <div className="text-gray-500 text-xs mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      
    </section>
  );
}
