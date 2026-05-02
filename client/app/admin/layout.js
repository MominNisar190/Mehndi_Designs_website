'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Image, Calendar, Users, Star, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

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

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      router.push('/login');
    }
  }, [isAuthenticated, isAdmin, loading, router]);

  if (loading || !isAdmin) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0a]">

      {/* ── Sidebar ── */}
      <aside className="w-60 shrink-0 bg-[#0d0d0d] border-r border-[#2a2a2a] flex flex-col h-screen sticky top-0">

        {/* Logo */}
        <div className="px-5 py-5 border-b border-[#2a2a2a]">
          <p className="font-serif text-gold-500 text-base leading-tight">Saniya Admin</p>
          <p className="text-gray-600 text-xs mt-0.5">Management Panel</p>
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

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {adminLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-all duration-150 group ${
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
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="h-14 shrink-0 bg-[#0d0d0d] border-b border-[#2a2a2a] flex items-center px-6 gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Admin</span>
            {pathname !== '/admin' && (
              <>
                <ChevronRight size={12} />
                <span className="text-gray-300 capitalize">
                  {pathname.split('/').pop()}
                </span>
              </>
            )}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-gray-500">Live</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
