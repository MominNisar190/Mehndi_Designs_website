'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, UserCheck, UserX } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({ total: 0 });

  const fetchUsers = () => {
    const params = new URLSearchParams({ limit: 50 });
    if (search) params.set('search', search);
    api
      .get(`/users?${params}`)
      .then(({ data }) => {
        setUsers(data.data);
        setPagination(data.pagination);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, [search]);

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      await api.put(`/users/${userId}/toggle-status`);
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, isActive: !currentStatus } : u))
      );
      toast.success('User status updated');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-white">Users</h1>
          <p className="text-gray-400 text-sm mt-1">{pagination.total} registered users</p>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="input-dark pl-9 py-2 text-sm w-64"
          />
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2a2a2a]">
                {['User', 'Email', 'Phone', 'Joined', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-gray-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-[#1a1a1a] hover:bg-white/2 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center shrink-0">
                        <span className="text-gold-500 text-xs font-semibold">
                          {user.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{user.email}</td>
                  <td className="px-4 py-3 text-gray-400">{user.phone || '—'}</td>
                  <td className="px-4 py-3 text-gray-400">{formatDate(user.createdAt)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${
                      user.isActive
                        ? 'text-green-400 bg-green-400/10 border-green-400/30'
                        : 'text-red-400 bg-red-400/10 border-red-400/30'
                    }`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {user.role !== 'admin' && (
                      <button
                        onClick={() => handleToggleStatus(user._id, user.isActive)}
                        className={`flex items-center gap-1 text-xs px-2 py-1 rounded-sm border transition-colors ${
                          user.isActive
                            ? 'border-red-400/30 text-red-400 hover:bg-red-400/5'
                            : 'border-green-400/30 text-green-400 hover:bg-green-400/5'
                        }`}
                      >
                        {user.isActive ? <UserX size={12} /> : <UserCheck size={12} />}
                        {user.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {users.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-500">No users found</div>
        )}
      </div>
    </div>
  );
}
