import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { AuthModal } from "@/components/auth/AuthModal";
import { ProjectDashboard } from "@/components/project/ProjectDashboard";
import { CanvasWorkspace } from "@/components/canvas/CanvasWorkspace";
import { useProjectStore, Project } from "@/stores/projectStore";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const { isAuthenticated } = useAuthStore();
  const [showAuthModal, setShowAuthModal] = useState(!isAuthenticated);
  const [currentView, setCurrentView] = useState<'dashboard' | 'canvas'>('dashboard');
  const { currentProject } = useProjectStore();

  const handleSelectProject = (project: Project) => {
    setCurrentView('canvas');
  };

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
          <div className="h-screen bg-background flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Welcome to Canvas AI</h1>
              <p className="text-muted-foreground">Please sign in to continue</p>
            </div>
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                currentView === 'dashboard' ? (
                  <ProjectDashboard onSelectProject={handleSelectProject} />
                ) : (
                  <CanvasWorkspace />
                )
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;