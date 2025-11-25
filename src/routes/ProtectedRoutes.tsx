import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/contexts/AuthContext";
import type { ReactNode } from "react";
import { Navigate } from "react-router";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoutes;
