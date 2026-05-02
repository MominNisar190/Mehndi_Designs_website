'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/booking', label: 'Book Now' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#2a2a2a]'
          : 'bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-[#2a2a2a]/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight">
            <span className="font-serif text-xl md:text-2xl text-gold-500 tracking-wide">
              Saniya
            </span>
            <span className="text-xs text-gray-400 tracking-[0.2em] uppercase">
              Mehndi Designs
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-gold-500 ${
                  pathname === link.href ? 'text-gold-500' : 'text-gray-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated && isAdmin ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-gray-300 hover:text-gold-500 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center">
                    <span className="text-gold-500 text-sm font-semibold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-2 w-48 bg-[#141414] border border-[#2a2a2a] rounded-sm shadow-xl"
                    >
                      <div className="px-4 py-3 border-b border-[#2a2a2a]">
                        <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                      <div className="py-1">
                        <Link href="/admin" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-gold-500 hover:bg-gold-500/5 transition-colors">
                          <LayoutDashboard size={14} /> Admin Panel
                        </Link>
                        <button
                          onClick={logout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-400/5 transition-colors"
                        >
                          <LogOut size={14} /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/login" className="btn-gold text-sm py-2 px-4 flex items-center gap-2">
                <User size={14} /> Admin Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-gold-500 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0a] border-b border-[#2a2a2a]"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-2 text-sm font-medium transition-colors ${
                    pathname === link.href ? 'text-gold-500' : 'text-gray-300'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-[#2a2a2a] flex flex-col gap-2">
                {isAuthenticated && isAdmin ? (
                  <>
                    <Link href="/admin" className="text-sm text-gray-300">Admin Panel</Link>
                    <button onClick={logout} className="text-left text-sm text-red-400">Logout</button>
                  </>
                ) : (
                  <Link href="/login" className="btn-gold text-sm text-center">Admin Login</Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
