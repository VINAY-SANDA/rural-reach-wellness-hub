
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
import ProfilePage from "./pages/ProfilePage";
import { useEffect, useState } from "react";
import { supabase, initializeDatabase } from "./lib/supabase";

const queryClient = new QueryClient();

// AuthGuard component to handle protected routes
const ProtectedRoute = ({ children, allowedRoles = null }: { children: React.ReactNode, allowedRoles?: string[] | null }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const checkAuth = async () => {
      // Check if user is authenticated with Supabase
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setIsAuthenticated(true);
        
        // Get user role from profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();
        
        if (profile) {
          setUserRole(profile.role);
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
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
    // Initialize the database when the app starts
    const init = async () => {
      await initializeDatabase();
      setIsInitialized(true);
    };
    
    init();
  }, []);
  
  if (!isInitialized) {
    return <div className="flex justify-center items-center h-screen">Initializing...</div>;
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
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
              
              {/* Doctor Routes */}
              <Route element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <AppLayout />
                </ProtectedRoute>
              }>
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/profile" element={<ProfilePage />} />
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
                <Route path="/profile" element={<ProfilePage />} />
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
