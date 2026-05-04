'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Image, Calendar, Users, Star, LogOut, ChevronRight, Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const adminLinks = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/designs', icon: Image, label: 'Designs' },
  { href: '/admin/bookings', icon: Calendar, label: 'Bookings' },
  { href: '/admin/users', icon: Users, label: 'Users' },
  { href: '/admin/reviews', icon: Star, label: 'Reviews' },
];

export default function AdminLayout({ children }) {
  const { isAuthenticated, isAdmin, loading, logout, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      router.push('/login');
    }
  }, [isAuthenticated, isAdmin, loading, router]);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (loading || !isAdmin) return null;

  const currentPage = adminLinks.find(l => l.href === pathname)?.label || 'Admin';

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0a]">

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/70 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar ── */}
      <AnimatePresence>
        {(sidebarOpen) && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed top-0 left-0 h-full w-64 bg-[#0d0d0d] border-r border-[#2a2a2a] flex flex-col z-40 lg:hidden"
          >
            <SidebarContent user={user} pathname={pathname} logout={logout} onClose={() => setSidebarOpen(false)} />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Desktop Sidebar (always visible) ── */}
      <aside className="hidden lg:flex w-60 shrink-0 bg-[#0d0d0d] border-r border-[#2a2a2a] flex-col h-screen sticky top-0">
        <SidebarContent user={user} pathname={pathname} logout={logout} />
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="h-14 shrink-0 bg-[#0d0d0d] border-b border-[#2a2a2a] flex items-center px-4 gap-3">
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-400 hover:text-gold-500 transition-colors p-1"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="hidden sm:block">Admin</span>
            {pathname !== '/admin' && (
              <>
                <ChevronRight size={12} className="hidden sm:block" />
                <span className="text-gray-300 capitalize font-medium">{currentPage}</span>
              </>
            )}
          </div>

          {/* Live indicator */}
          <div className="ml-auto flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-gray-500 hidden sm:block">Live</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarContent({ user, pathname, logout, onClose }) {
  return (
    <>
      {/* Logo + close */}
      <div className="px-5 py-4 border-b border-[#2a2a2a] flex items-center justify-between">
        <div>
          <p className="font-serif text-gold-500 text-base leading-tight">Saniya Admin</p>
          <p className="text-gray-600 text-xs mt-0.5">Management Panel</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors lg:hidden">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Admin info */}
      <div className="px-5 py-3 border-b border-[#2a2a2a] flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center shrink-0">
          <span className="text-gold-500 text-sm font-semibold">
            {user?.name?.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-white text-xs font-medium truncate">{user?.name}</p>
          <p className="text-gray-600 text-xs truncate">{user?.email}</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {adminLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-all duration-150 ${
                isActive
                  ? 'bg-gold-500/10 text-gold-500 border border-gold-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <link.icon size={15} className="shrink-0" />
              <span className="flex-1">{link.label}</span>
              {isActive && <ChevronRight size={12} className="text-gold-500/60" />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-[#2a2a2a]">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:bg-red-400/5 rounded-sm transition-colors border border-transparent hover:border-red-400/20"
        >
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </>
  );
}
