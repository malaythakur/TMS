import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { Task } from '@/types';

export const useTask = (taskId: string) => {
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get<{ data: Task }>(`/tasks/${taskId}`);
        setTask(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch task');
      } finally {
        setIsLoading(false);
      }
    };

    if (taskId) {
      fetchTask();
    }
  }, [taskId]);

  return { task, isLoading, error };
};
