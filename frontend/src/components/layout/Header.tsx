'use client';

import { Menu, Search } from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';

interface HeaderProps {
  title: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

import { useDashboard } from '@/lib/dashboard-context';

export default function Header({ title, onMenuToggle, searchValue, onSearchChange }: HeaderProps) {
  const { user } = useAuthStore();
  const { toggleSidebar } = useDashboard();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={toggleSidebar} className="lg:hidden text-gray-600 hover:text-gray-900">
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          {onSearchChange && (
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
          )}
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            {user?.username.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
