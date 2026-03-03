'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import Header from '@/components/layout/Header';
import TaskCard from '@/components/tasks/TaskCard';
import TaskModal from '@/components/tasks/TaskModal';
import EmptyState from '@/components/ui/EmptyState';
import { useTasks } from '@/hooks/useTasks';
import { Task } from '@/types';

export default function PriorityPage() {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const { tasks: highTasks, isLoading: loadingHigh, refetch: refetchHigh } = useTasks({ priority: 'HIGH', sortBy: 'dueDate', sortOrder: 'asc' });
  const { tasks: mediumTasks, isLoading: loadingMedium, refetch: refetchMedium } = useTasks({ priority: 'MEDIUM', sortBy: 'dueDate', sortOrder: 'asc' });
  const { tasks: lowTasks, isLoading: loadingLow, refetch: refetchLow } = useTasks({ priority: 'LOW', sortBy: 'dueDate', sortOrder: 'asc' });

  const refetchAll = () => {
    refetchHigh();
    refetchMedium();
    refetchLow();
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(undefined);
  };

  const filterTasks = (tasks: Task[]) => {
    if (!search) return tasks;
    return tasks.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || t.description?.toLowerCase().includes(search.toLowerCase()));
  };

  return (
    <div className="min-h-screen">
      <Header title="Tasks by Priority" onMenuToggle={() => {}} searchValue={search} onSearchChange={setSearch} />

      <div className="p-6 space-y-6">
        <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={20} />
            Add Task
          </button>
        </div>

        <div>
          <h2 className="text-xl font-bold text-red-600 mb-4">High Priority</h2>
          {loadingHigh ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : filterTasks(highTasks).length === 0 ? (
            <p className="text-gray-500">No high priority tasks</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterTasks(highTasks).map((task) => (
                <TaskCard key={task.id} task={task} onRefetch={refetchAll} onEdit={handleEdit} />
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold text-yellow-600 mb-4">Medium Priority</h2>
          {loadingMedium ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : filterTasks(mediumTasks).length === 0 ? (
            <p className="text-gray-500">No medium priority tasks</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterTasks(mediumTasks).map((task) => (
                <TaskCard key={task.id} task={task} onRefetch={refetchAll} onEdit={handleEdit} />
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold text-green-600 mb-4">Low Priority</h2>
          {loadingLow ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : filterTasks(lowTasks).length === 0 ? (
            <p className="text-gray-500">No low priority tasks</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterTasks(lowTasks).map((task) => (
                <TaskCard key={task.id} task={task} onRefetch={refetchAll} onEdit={handleEdit} />
              ))}
            </div>
          )}
        </div>
      </div>

      <TaskModal isOpen={isModalOpen} onClose={handleCloseModal} task={editingTask} onSuccess={refetchAll} />
    </div>
  );
}
