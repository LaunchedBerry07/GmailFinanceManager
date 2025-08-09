import { useLocation } from "wouter";
import { useEffect, useState } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
}

// Mock authentication state - in production this would connect to your auth system
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking authentication status
    const checkAuth = () => {
      const token = localStorage.getItem('auth-token');
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  return { isAuthenticated, isLoading };
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 gradient-pink-magenta rounded-2xl flex items-center justify-center animate-pulse">
            <span className="text-2xl font-bold text-white">B</span>
          </div>
          <p className="text-purple-300">Loading DataBerry...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return <>{children}</>;
}