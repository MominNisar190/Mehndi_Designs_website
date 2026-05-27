import Link from 'next/link';
import { Sparkles, Heart, Star, Users, Award } from 'lucide-react';

export const metadata = {
  title: 'About Us',
  description: 'Learn about Saniya Mehndi Designs — premium mehndi artistry based in Nanded, Maharashtra.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">

      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="font-serif text-4xl md:text-5xl text-white mb-3">About Us</h1>
        <div className="w-16 h-0.5 bg-gold-500 mx-auto mb-4" />
        <p className="text-gray-400 max-w-xl mx-auto">
          The story behind Saniya Mehndi Designs
        </p>
      </div>

      {/* Intro */}
      <div className="bg-[#141414] border border-gold-500/20 rounded-sm p-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles size={20} className="text-gold-500" />
          <h2 className="font-serif text-2xl text-white">Who We Are</h2>
        </div>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-gold-500">Saniya Mehndi Designs</strong> is a professional mehndi artistry service
          based in Shiradhon, Nanded, Maharashtra, India. We specialize in creating beautiful, intricate mehndi
          designs for every occasion — from grand bridal ceremonies to festive celebrations and everyday elegance.
        </p>
        <p className="text-gray-300 leading-relaxed">
          Our passion lies in transforming hands into works of art. Every design we create is crafted with love,
          precision, and a deep respect for the tradition of mehndi. We believe that mehndi is not just body art —
          it is a celebration of culture, beauty, and joy.
        </p>
      </div>

      {/* Services */}
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-sm p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Heart size={20} className="text-gold-500" />
          <h2 className="font-serif text-2xl text-white">Our Services</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: 'Bridal Mehndi', desc: 'Elaborate full-hand designs for your wedding day' },
            { title: 'Arabic Mehndi', desc: 'Bold floral patterns with modern spacing' },
            { title: 'Festive Mehndi', desc: 'Perfect for Eid, Diwali, and celebrations' },
            { title: 'Minimal Mehndi', desc: 'Clean, modern designs for everyday elegance' },
            { title: 'Full Hand Mehndi', desc: 'Complete coverage from wrist to fingertips' },
            { title: 'Home Service', desc: 'We come to your location in Nanded & nearby areas' },
          ].map((s) => (
            <div key={s.title} className="flex items-start gap-3 p-3 border border-[#2a2a2a] rounded-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 shrink-0" />
              <div>
                <p className="text-white text-sm font-medium">{s.title}</p>
                <p className="text-gray-500 text-xs mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: Users, value: '1000+', label: 'Happy Clients' },
          { icon: Star, value: '5★', label: 'Average Rating' },
          { icon: Award, value: '5+', label: 'Years Experience' },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#141414] border border-[#2a2a2a] rounded-sm p-4 text-center">
            <stat.icon size={20} className="text-gold-500 mx-auto mb-2" />
            <p className="font-serif text-2xl text-gold-500">{stat.value}</p>
            <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Business Info */}
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-sm p-8 mb-8">
        <h2 className="font-serif text-2xl text-white mb-4">Business Information</h2>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3"><span className="text-gray-500 w-32 shrink-0">Business Name</span><span className="text-gray-300">Saniya Mehndi Designs</span></div>
          <div className="flex gap-3"><span className="text-gray-500 w-32 shrink-0">Owner</span><span className="text-gray-300">Saniya Momin</span></div>
          <div className="flex gap-3"><span className="text-gray-500 w-32 shrink-0">Location</span><span className="text-gray-300">Shiradhon, Nanded, Maharashtra, India — 431601</span></div>
          <div className="flex gap-3"><span className="text-gray-500 w-32 shrink-0">Phone</span><span className="text-gray-300">+91 93590 16366</span></div>
          <div className="flex gap-3"><span className="text-gray-500 w-32 shrink-0">Email</span><span className="text-gray-300">saniyamomin196@gmail.com</span></div>
          <div className="flex gap-3"><span className="text-gray-500 w-32 shrink-0">Service Area</span><span className="text-gray-300">Nanded, Maharashtra & nearby areas</span></div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-gray-400 mb-6 italic font-serif text-lg">"Let your hands tell your beautiful story"</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/gallery" className="btn-gold px-8 py-3">View Our Designs</Link>
          <Link href="/contact" className="btn-outline px-8 py-3">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
