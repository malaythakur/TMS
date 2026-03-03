import { useState } from 'react';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';
import { Task } from '@/types';

interface CreateTaskData {
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  dueDate?: string;
}

interface UpdateTaskData extends Partial<CreateTaskData> {}

export const useTaskMutations = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createTask = async (data: CreateTaskData, onSuccess?: () => void): Promise<Task> => {
    setIsLoading(true);
    try {
      const response = await axios.post<{ data: Task }>('/tasks', data);
      toast.success('Task created successfully');
      onSuccess?.();
      return response.data.data;
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create task');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (id: string, data: UpdateTaskData, onSuccess?: () => void): Promise<Task> => {
    setIsLoading(true);
    try {
      const response = await axios.patch<{ data: Task }>(`/tasks/${id}`, data);
      toast.success('Task updated successfully');
      onSuccess?.();
      return response.data.data;
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update task');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: string, onSuccess?: () => void): Promise<void> => {
    setIsLoading(true);
    try {
      await axios.delete(`/tasks/${id}`);
      toast.success('Task deleted successfully');
      onSuccess?.();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to delete task');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTask = async (id: string, onSuccess?: () => void): Promise<Task> => {
    setIsLoading(true);
    try {
      const response = await axios.patch<{ data: Task }>(`/tasks/${id}/toggle`);
      toast.success('Task status updated');
      onSuccess?.();
      return response.data.data;
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to toggle task');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createTask, updateTask, deleteTask, toggleTask, isLoading };
};
