'use client';

import { useState } from 'react';
import AuthGuard from '@/components/auth/AuthGuard';
import Sidebar from '@/components/layout/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="flex h-screen bg-gray-50">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </AuthGuard>
  );
}
