
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/use-auth";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage";
import VoicePage from "./pages/VoicePage";
import MedicationsPage from "./pages/MedicationsPage";
import CommunityPage from "./pages/CommunityPage";
import BulletinPage from "./pages/BulletinPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import DoctorDashboard from "./pages/DoctorDashboard";
import CommunityDashboard from "./pages/CommunityDashboard";
import DoctorConsultationPage from "./pages/DoctorConsultationPage";
import RegisterPage from "./pages/RegisterPage";
import HealthProgramsPage from "./pages/HealthProgramsPage";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedRoles = null }: { children: React.ReactNode, allowedRoles?: string[] | null }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('userRole');
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    if (userRole === 'patient') {
      return <Navigate to="/" replace />;
    } else if (userRole === 'doctor') {
      return <Navigate to="/doctor-dashboard" replace />;
    } else if (userRole === 'community') {
      return <Navigate to="/community-dashboard" replace />;
    }
  }
  
  return <>{children}</>;
};

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    // Check for stored authentication data on initial load
    setIsInitialized(true);
  }, []);
  
  if (!isInitialized) {
    return null; // Or a loading spinner
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Patient Routes */}
              <Route element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <AppLayout />
                </ProtectedRoute>
              }>
                <Route path="/" element={<Dashboard />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/voice" element={<VoicePage />} />
                <Route path="/medications" element={<MedicationsPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/bulletin" element={<BulletinPage />} />
                <Route path="/consultation" element={<DoctorConsultationPage />} />
              </Route>
              
              {/* Doctor Routes */}
              <Route element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <AppLayout />
                </ProtectedRoute>
              }>
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route path="/chat" element={<ChatPage />} />
              </Route>
              
              {/* Community Admin Routes */}
              <Route element={
                <ProtectedRoute allowedRoles={['community']}>
                  <AppLayout />
                </ProtectedRoute>
              }>
                <Route path="/community-dashboard" element={<CommunityDashboard />} />
                <Route path="/bulletin" element={<BulletinPage />} />
                <Route path="/programs" element={<HealthProgramsPage />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
