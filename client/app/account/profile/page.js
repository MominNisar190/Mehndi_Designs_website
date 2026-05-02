'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ChevronLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user, isAuthenticated, isAdmin, loading: authLoading, updateUser } = useAuth();
  const router = useRouter();

  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm();

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isAdmin)) router.push('/login');
  }, [isAuthenticated, isAdmin, authLoading, router]);

  useEffect(() => {
    if (user) reset({ name: user.name, phone: user.phone || '' });
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      const { data: res } = await api.put('/auth/profile', data);
      updateUser(res.data);
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-lg mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/account" className="text-gray-400 hover:text-gold-500 transition-colors">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="font-serif text-2xl text-white">Edit Profile</h1>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Full Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="input-dark"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Email</label>
            <input value={user?.email || ''} disabled className="input-dark opacity-50 cursor-not-allowed" />
            <p className="text-gray-600 text-xs mt-1">Email cannot be changed</p>
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Phone</label>
            <input
              {...register('phone')}
              placeholder="+91 98765 43210"
              className="input-dark"
            />
          </div>

          <button type="submit" disabled={!isDirty} className="btn-gold w-full py-3 disabled:opacity-50">
            Save Changes
          </button>
        </form>
      </motion.div>
    </div>
  );
}
