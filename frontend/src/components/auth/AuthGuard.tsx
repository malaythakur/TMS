'use client';

import { useAuthStore } from '@/lib/auth-store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, setAuth, clearAuth } = useAuthStore();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!user) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
            {},
            { withCredentials: true }
          );
          const { accessToken } = response.data.data;
          if (user) {
            setAuth(user, accessToken);
          } else {
            router.push('/login');
          }
        } catch {
          clearAuth();
          router.push('/login');
        }
      }
      setIsChecking(false);
    };

    checkAuth();
  }, [user, setAuth, clearAuth, router]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
