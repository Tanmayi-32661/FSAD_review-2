import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppProtectedRoute from "@/components/AppProtectedRoute";
import LoadingScreen from "@/components/LoadingScreen";
import { useAppAuth } from "@/context/AppAuthContext";
import HomePage from "@/pages/app/HomePage";
import LoginPage from "@/pages/app/LoginPage";
import RegisterPage from "@/pages/app/RegisterPage";
import StudentDashboardPage from "@/pages/app/student/StudentDashboardPage";
import StudentResumePage from "@/pages/app/student/StudentResumePage";
import StudentJobsPage from "@/pages/app/student/StudentJobsPage";
import StudentApplicationsPage from "@/pages/app/student/StudentApplicationsPage";
import StudentProfilePage from "@/pages/app/student/StudentProfilePage";
import EmployerDashboardPage from "@/pages/app/employer/EmployerDashboardPage";
import EmployerJobsPage from "@/pages/app/employer/EmployerJobsPage";
import EmployerApplicationsPage from "@/pages/app/employer/EmployerApplicationsPage";
import EmployerProfilePage from "@/pages/app/employer/EmployerProfilePage";
import OfficerDashboardPage from "@/pages/app/officer/OfficerDashboardPage";
import OfficerReportsPage from "@/pages/app/officer/OfficerReportsPage";
import OfficerInteractionsPage from "@/pages/app/officer/OfficerInteractionsPage";
import OfficerUsersPage from "@/pages/app/officer/OfficerUsersPage";
import NotFound from "@/pages/NotFound";

const RootRedirect = () => {
  const { user, loading } = useAppAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <HomePage />;
  }

  return <Navigate to={`/${user.role}`} replace />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/student" element={<AppProtectedRoute allowedRoles={["student"]} requireResume><StudentDashboardPage /></AppProtectedRoute>} />
        <Route path="/student/resume" element={<AppProtectedRoute allowedRoles={["student"]}><StudentResumePage /></AppProtectedRoute>} />
        <Route path="/student/jobs" element={<AppProtectedRoute allowedRoles={["student"]} requireResume><StudentJobsPage /></AppProtectedRoute>} />
        <Route path="/student/applications" element={<AppProtectedRoute allowedRoles={["student"]} requireResume><StudentApplicationsPage /></AppProtectedRoute>} />
        <Route path="/student/profile" element={<AppProtectedRoute allowedRoles={["student"]} requireResume><StudentProfilePage /></AppProtectedRoute>} />

        <Route path="/employer" element={<AppProtectedRoute allowedRoles={["employer"]}><EmployerDashboardPage /></AppProtectedRoute>} />
        <Route path="/employer/jobs" element={<AppProtectedRoute allowedRoles={["employer"]}><EmployerJobsPage /></AppProtectedRoute>} />
        <Route path="/employer/applications" element={<AppProtectedRoute allowedRoles={["employer"]}><EmployerApplicationsPage /></AppProtectedRoute>} />
        <Route path="/employer/profile" element={<AppProtectedRoute allowedRoles={["employer"]}><EmployerProfilePage /></AppProtectedRoute>} />

        <Route path="/officer" element={<AppProtectedRoute allowedRoles={["officer"]}><OfficerDashboardPage /></AppProtectedRoute>} />
        <Route path="/officer/reports" element={<AppProtectedRoute allowedRoles={["officer"]}><OfficerReportsPage /></AppProtectedRoute>} />
        <Route path="/officer/interactions" element={<AppProtectedRoute allowedRoles={["officer"]}><OfficerInteractionsPage /></AppProtectedRoute>} />
        <Route path="/officer/users" element={<AppProtectedRoute allowedRoles={["officer"]}><OfficerUsersPage /></AppProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
