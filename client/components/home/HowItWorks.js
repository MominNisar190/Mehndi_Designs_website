'use client';

import { motion } from 'framer-motion';
import { Search, Calendar, Sparkles, Star } from 'lucide-react';

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Browse Designs',
    description: 'Explore our curated gallery of 500+ mehndi designs across all categories.',
  },
  {
    icon: Sparkles,
    step: '02',
    title: 'Preview on Hand',
    description: 'Upload your hand photo and see exactly how the design will look on you.',
  },
  {
    icon: Calendar,
    step: '03',
    title: 'Book Appointment',
    description: 'Choose your date, time, and package. Pay a small advance to confirm.',
  },
  {
    icon: Star,
    step: '04',
    title: 'Get Beautified',
    description: 'Our artist arrives at your location or you visit us. Pure magic happens.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">How It Works</h2>
          <div className="gold-divider" />
          <p className="text-gray-400 mt-4">Four simple steps to your perfect mehndi</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-1/2 w-full h-px bg-gradient-to-r from-gold-500/50 to-transparent" />
              )}

              <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                <div className="absolute inset-0 rounded-full border border-gold-500/30 bg-gold-500/5" />
                <step.icon size={28} className="text-gold-500 relative z-10" />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold-500 text-dark-300 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>

              <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
