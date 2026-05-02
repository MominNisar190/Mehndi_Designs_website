'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function SecurityPage() {
  const { isAuthenticated, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isAdmin)) router.push('/login');
  }, [isAuthenticated, isAdmin, authLoading, router]);

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const newPassword = watch('newPassword');

  const onSubmit = async (data) => {
    try {
      await api.put('/auth/change-password', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success('Password changed successfully');
      reset();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to change password');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-lg mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/account" className="text-gray-400 hover:text-gold-500 transition-colors">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="font-serif text-2xl text-white">Security</h1>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
        <h2 className="text-white font-medium mb-5">Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Current Password</label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                {...register('currentPassword', { required: 'Current password is required' })}
                className="input-dark pr-10"
              />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.currentPassword && <p className="text-red-400 text-xs mt-1">{errors.currentPassword.message}</p>}
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">New Password</label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                {...register('newPassword', {
                  required: 'New password is required',
                  minLength: { value: 6, message: 'Min 6 characters' },
                })}
                className="input-dark pr-10"
              />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.newPassword && <p className="text-red-400 text-xs mt-1">{errors.newPassword.message}</p>}
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Confirm New Password</label>
            <input
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm password',
                validate: (v) => v === newPassword || 'Passwords do not match',
              })}
              className="input-dark"
            />
            {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" className="btn-gold w-full py-3">
            Update Password
          </button>
        </form>
      </motion.div>
    </div>
  );
}
