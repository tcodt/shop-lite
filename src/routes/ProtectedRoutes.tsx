import { Spinner } from "@/shared/components/ui/spinner";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import type { ReactNode } from "react";
import { Navigate } from "react-router";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center flex-col gap-1">
          <Spinner />
          <p className="font-semibold text-sm">Loading...</p>
        </div>
      </div>
    );

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoutes;
