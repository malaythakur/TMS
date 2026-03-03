'use client';

import AuthGuard from '@/components/auth/AuthGuard';
import Sidebar from '@/components/layout/Sidebar';
import { DashboardProvider, useDashboard } from '@/lib/dashboard-context';

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen, closeSidebar } = useDashboard();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <DashboardProvider>
        <DashboardContent>{children}</DashboardContent>
      </DashboardProvider>
    </AuthGuard>
  );
}
