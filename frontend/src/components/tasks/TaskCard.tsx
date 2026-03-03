'use client';

import { useState } from 'react';
import { Task } from '@/types';
import { Calendar, Edit, Trash2, CheckCircle } from 'lucide-react';
import { useTaskMutations } from '@/hooks/useTaskMutations';
import DeleteConfirmDialog from './DeleteConfirmDialog';

interface TaskCardProps {
  task: Task;
  onRefetch: () => void;
  onEdit: (task: Task) => void;
}

export default function TaskCard({ task, onRefetch, onEdit }: TaskCardProps) {
  const { toggleTask, deleteTask, isLoading } = useTaskMutations();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const statusColors = {
    TODO: 'bg-gray-100 text-gray-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    DONE: 'bg-green-100 text-green-800',
  };

  const priorityColors = {
    LOW: 'bg-green-100 text-green-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    HIGH: 'bg-red-100 text-red-800',
  };

  const handleToggle = async () => {
    await toggleTask(task.id, onRefetch);
  };

  const handleDelete = async () => {
    await deleteTask(task.id, () => {
      onRefetch();
      setShowDeleteDialog(false);
    });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'DONE';

  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h3 className={`font-semibold text-lg ${task.status === 'DONE' ? 'line-through text-gray-500' : ''}`}>
          {task.title}
        </h3>
        <div className="flex gap-2">
          <button onClick={handleToggle} className="text-blue-600 hover:text-blue-800">
            <CheckCircle size={20} />
          </button>
          <button onClick={() => onEdit(task)} className="text-gray-600 hover:text-gray-800">
            <Edit size={20} />
          </button>
          <button onClick={() => setShowDeleteDialog(true)} className="text-red-600 hover:text-red-800">
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{task.description}</p>
      )}

      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[task.status]}`}>
          {task.status.replace('_', ' ')}
        </span>
        <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {task.dueDate && (
        <div className={`flex items-center gap-1 text-sm ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
          <Calendar size={16} />
          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
      )}

      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        taskTitle={task.title}
        isDeleting={isLoading}
      />
    </div>
  );
}
