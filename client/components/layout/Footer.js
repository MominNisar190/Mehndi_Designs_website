import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#2a2a2a] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-2xl text-gold-500 mb-2">Saniya Mehndi Designs</h3>
            <p className="text-gray-500 text-sm italic mb-4">
              &ldquo;Let your hands tell your beautiful story&rdquo;
            </p>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Premium mehndi artistry for every occasion — bridal, festive, and everyday elegance.
              Crafted with passion, delivered with perfection.
            </p>
          
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/booking', label: 'Book Now' },
                { href: '/account', label: 'My Account' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-gold-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <Phone size={14} className="text-gold-500 mt-0.5 shrink-0" />
                <a
                  href="https://wa.me/919359016366"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-500 transition-colors"
                >
                  +91 93590 16366
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <Mail size={14} className="text-gold-500 mt-0.5 shrink-0" />
                <a
                  href="mailto:saniyamomin196@gmail.com"
                  className="hover:text-gold-500 transition-colors"
                >
                  saniyamomin196@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin size={14} className="text-gold-500 mt-0.5 shrink-0" />
                <span>Shiradhon, Nanded, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#2a2a2a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} Saniya Mehndi Designs. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-gray-600 text-xs hover:text-gold-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-600 text-xs hover:text-gold-500 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
