'use client';

import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';

export function useDesigns(initialFilters = {}) {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ total: 0, pages: 1, page: 1 });
  const [filters, setFilters] = useState({ limit: 12, sort: 'latest', ...initialFilters });

  const fetchDesigns = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => { if (v) params.set(k, v); });
      const { data } = await api.get(`/designs?${params}`);
      setDesigns(data.data);
      setPagination(data.pagination);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load designs');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchDesigns(); }, [fetchDesigns]);

  return { designs, loading, error, pagination, filters, setFilters, refetch: fetchDesigns };
}
