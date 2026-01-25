import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Overview from "./pages/Overview";
import AIInventory from "./pages/AIInventory";
import Governance from "./pages/Governance";
import RiskManagement from "./pages/RiskManagement";
import OperationalControls from "./pages/OperationalControls";
import Monitoring from "./pages/Monitoring";
import Incidents from "./pages/Incidents";
import Audit from "./pages/Audit";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/inventory" element={<AIInventory />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/risks" element={<RiskManagement />} />
          <Route path="/controls" element={<OperationalControls />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/audit" element={<Audit />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
