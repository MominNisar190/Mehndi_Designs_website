'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Bride',
    rating: 5,
    comment:
      'Absolutely stunning bridal mehndi! Saniya\'s work is beyond beautiful. Every guest at my wedding was asking about my mehndi artist. Highly recommend!',
    date: 'October 2024',
  },
  {
    name: 'Fatima Khan',
    role: 'Regular Client',
    rating: 5,
    comment:
      'I\'ve been getting mehndi done here for every Eid for 3 years. The quality is consistently amazing and the booking process is so smooth now.',
    date: 'November 2024',
  },
  {
    name: 'Ananya Patel',
    role: 'Bride\'s Sister',
    rating: 5,
    comment:
      'The AR preview feature is genius! I could see exactly how the design would look before committing. The actual result was even better than the preview.',
    date: 'December 2024',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="section-heading">What Our Clients Say</h2>
        <div className="gold-divider" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="card p-6 relative"
          >
            <Quote size={24} className="text-gold-500/30 absolute top-4 right-4" />

            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} size={14} className="text-gold-500 fill-gold-500" />
              ))}
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
              &ldquo;{t.comment}&rdquo;
            </p>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center">
                <span className="text-gold-500 font-semibold text-sm">
                  {t.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-white text-sm font-medium">{t.name}</p>
                <p className="text-gray-500 text-xs">{t.role} · {t.date}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
