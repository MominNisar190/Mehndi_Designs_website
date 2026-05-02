'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Heart, User, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const accountLinks = [
  { href: '/account/bookings', icon: Calendar, label: 'My Bookings', description: 'View and manage your appointments' },
  { href: '/account/wishlist', icon: Heart, label: 'Wishlist', description: 'Saved designs you love' },
  { href: '/account/profile', icon: User, label: 'Profile', description: 'Update your personal information' },
  { href: '/account/security', icon: Lock, label: 'Security', description: 'Change password' },
];

export default function AccountPage() {
  const { isAuthenticated, isAdmin, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) router.push('/login');
  }, [isAuthenticated, isAdmin, loading, router]);

  if (loading || !user) return null;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Profile header */}
        <div className="flex items-center gap-6 mb-10">
          <div className="w-16 h-16 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center">
            <span className="font-serif text-2xl text-gold-500">{user.name?.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <h1 className="font-serif text-2xl text-white">{user.name}</h1>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {accountLinks.map((link) => (
            <Link key={link.href} href={link.href} className="card p-6 flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
                <link.icon size={20} className="text-gold-500" />
              </div>
              <div>
                <p className="text-white font-medium group-hover:text-gold-500 transition-colors">{link.label}</p>
                <p className="text-gray-500 text-xs mt-0.5">{link.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
