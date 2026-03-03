'use client';

import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import Header from '@/components/layout/Header';
import TaskCard from '@/components/tasks/TaskCard';
import TaskModal from '@/components/tasks/TaskModal';
import EmptyState from '@/components/ui/EmptyState';
import { useTasks } from '@/hooks/useTasks';
import { Task } from '@/types';

export default function DashboardPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string | undefined>();
  const [priority, setPriority] = useState<string | undefined>();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const { tasks, pagination, isLoading, refetch } = useTasks({
    page,
    limit: 12,
    status,
    priority,
    search,
    sortBy,
    sortOrder,
  });

  const stats = useMemo(() => {
    return {
      total: pagination?.total || 0,
      todo: tasks.filter((t) => t.status === 'TODO').length,
      inProgress: tasks.filter((t) => t.status === 'IN_PROGRESS').length,
      done: tasks.filter((t) => t.status === 'DONE').length,
    };
  }, [tasks, pagination]);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(undefined);
  };

  return (
    <div className="min-h-screen">
      <Header title="Dashboard" onMenuToggle={() => {}} searchValue={search} onSearchChange={setSearch} />

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">Total Tasks</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">To Do</p>
            <p className="text-3xl font-bold text-gray-600">{stats.todo}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">In Progress</p>
            <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">Done</p>
            <p className="text-3xl font-bold text-green-600">{stats.done}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex gap-2">
              <button
                onClick={() => setStatus(undefined)}
                className={`px-4 py-2 rounded-lg ${!status ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                All
              </button>
              <button
                onClick={() => setStatus('TODO')}
                className={`px-4 py-2 rounded-lg ${status === 'TODO' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                To Do
              </button>
              <button
                onClick={() => setStatus('IN_PROGRESS')}
                className={`px-4 py-2 rounded-lg ${status === 'IN_PROGRESS' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                In Progress
              </button>
              <button
                onClick={() => setStatus('DONE')}
                className={`px-4 py-2 rounded-lg ${status === 'DONE' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Done
              </button>
            </div>

            <select
              value={priority || ''}
              onChange={(e) => setPriority(e.target.value || undefined)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">All Priorities</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>

            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [by, order] = e.target.value.split('-');
                setSortBy(by);
                setSortOrder(order);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="createdAt-desc">Newest</option>
              <option value="createdAt-asc">Oldest</option>
              <option value="dueDate-asc">Due Date</option>
              <option value="priority-desc">Priority</option>
            </select>

            <button
              onClick={() => setIsModalOpen(true)}
              className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-6 w-20 bg-gray-200 rounded"></div>
                  <div className="h-6 w-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <EmptyState
            message="No tasks found"
            subMessage="Create your first task to get started"
            actionLabel="Add Task"
            onAction={() => setIsModalOpen(true)}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} onRefetch={refetch} onEdit={handleEdit} />
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={!pagination.hasPrev}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={!pagination.hasNext}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <TaskModal isOpen={isModalOpen} onClose={handleCloseModal} task={editingTask} onSuccess={refetch} />
    </div>
  );
}
