'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getErrorMessage } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin';
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    try {
      const user = await login(email, password);
      toast.success(`Welcome back, ${user.name}!`);
      router.push(redirect);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 mb-4">
            <ShieldCheck size={28} className="text-gold-500" />
          </div>
          <h1 className="font-serif text-3xl text-white mb-2">Admin Login</h1>
          <p className="text-gray-500 text-sm">Saniya Mehndi Designs — Management Portal</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">
                Admin Email
              </label>
              <input
                type="email"
                placeholder="admin@saniyamehndi.com"
                {...register('email', { required: 'Email is required' })}
                className="input-dark"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password', { required: 'Password is required' })}
                  className="input-dark pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-dark-300/30 border-t-dark-300 rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  Sign In to Admin Panel
                </>
              )}
            </button>
          </form>

          <p className="text-center text-gray-600 text-xs mt-6">
            This portal is restricted to administrators only.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
