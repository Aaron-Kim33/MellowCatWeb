import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";


const queryClient = new QueryClient();
const location = useLocation();

  useEffect(() => {
    // navigate로 페이지가 바뀔 때마다(location 변경 시) 실행됩니다.
    ReactGA.send({ 
      hitType: "pageview", 
      page: location.pathname 
    });
  }, [location]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/help" element={<Help />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
