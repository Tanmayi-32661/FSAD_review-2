import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen";
import { useAppAuth } from "@/context/AppAuthContext";
import type { Role } from "@/types";

const AppProtectedRoute = ({
  children,
  allowedRoles,
  requireResume = false,
}: {
  children: React.ReactNode;
  allowedRoles?: Role[];
  requireResume?: boolean;
}) => {
  const { user, isAuthenticated, loading } = useAppAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  if (
    requireResume &&
    user.role === "student" &&
    !user.resumeUploaded &&
    location.pathname !== "/student/resume"
  ) {
    return <Navigate to="/student/resume" replace />;
  }

  return <>{children}</>;
};

export default AppProtectedRoute;
