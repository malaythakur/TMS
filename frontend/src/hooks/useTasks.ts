import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { Task, PaginationMeta, TasksResponse } from '@/types';

interface UseTasksParams {
  page?: number;
  limit?: number;
  status?: string;
  priority?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}

export const useTasks = (params: UseTasksParams = {}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<{ data: TasksResponse }>('/tasks', { params });
      setTasks(response.data.data.tasks);
      setPagination(response.data.data.pagination);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTasks();
    }, params.search ? 300 : 0);

    return () => clearTimeout(timer);
  }, [params.page, params.limit, params.status, params.priority, params.search, params.sortBy, params.sortOrder]);

  return { tasks, pagination, isLoading, error, refetch: fetchTasks };
};
