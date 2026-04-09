import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppAuthProvider } from "@/context/AppAuthContext";
import AppRoutes from "@/routes/AppRoutes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppAuthProvider>
        <Toaster />
        <Sonner />
        <AppRoutes />
      </AppAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
