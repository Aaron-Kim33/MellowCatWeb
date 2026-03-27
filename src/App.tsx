import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Whitepaper from "./pages/Whitepaper.tsx";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import { ClaudeCodeDownloadPage, OpenClawDownloadPage } from "./pages/DownloadProduct";
import HelpRedirect, { ClaudeCodeHelpPage, OpenClawHelpPage } from "./pages/Help";
import PaymentPage, { PaymentCancelPage, PaymentSuccessPage } from "./pages/Payment";



const queryClient = new QueryClient();
// 1. 페이지 뷰를 추적하는 별도의 컴포넌트 생성
const GAListener = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ 
      hitType: "pageview", 
      page: location.pathname + location.search 
    });
  }, [location]);

  return null; // 화면에 아무것도 그리지 않음
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <GAListener />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment/success" element={<PaymentSuccessPage />} />
          <Route path="/payment/cancel" element={<PaymentCancelPage />} />
          <Route path="/download/openclaw" element={<OpenClawDownloadPage />} />
          <Route path="/download/claudecode" element={<ClaudeCodeDownloadPage />} />
          <Route path="/help" element={<HelpRedirect />} />
          <Route path="/help/openclaw" element={<OpenClawHelpPage />} />
          <Route path="/help/claudecode" element={<ClaudeCodeHelpPage />} />
          <Route path="/whitepaper" element={<Whitepaper />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
