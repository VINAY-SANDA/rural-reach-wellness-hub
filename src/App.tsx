
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage";
import VoicePage from "./pages/VoicePage";
import MedicationsPage from "./pages/MedicationsPage";
import CommunityPage from "./pages/CommunityPage";
import BulletinPage from "./pages/BulletinPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
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
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
              <Route path="/" element={<Dashboard />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/voice" element={<VoicePage />} />
              <Route path="/medications" element={<MedicationsPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/bulletin" element={<BulletinPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
