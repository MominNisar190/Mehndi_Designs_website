'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import DesignCard from '@/components/gallery/DesignCard';
import api from '@/lib/api';

export default function WishlistPage() {
  const { isAuthenticated, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isAdmin)) router.push('/login');
  }, [isAuthenticated, isAdmin, authLoading, router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    api
      .get('/users/wishlist')
      .then(({ data }) => setWishlist(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/account" className="text-gray-400 hover:text-gold-500 transition-colors">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="font-serif text-2xl text-white">My Wishlist</h1>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton aspect-square rounded-sm" />
          ))}
        </div>
      ) : wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((design, i) => (
            <motion.div
              key={design._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <DesignCard design={design} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Heart size={40} className="text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">Your wishlist is empty</p>
          <Link href="/gallery" className="btn-gold mt-4 inline-block">
            Explore Designs
          </Link>
        </div>
      )}
    </div>
  );
}
