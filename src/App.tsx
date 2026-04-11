import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Whitepaper from "./pages/Whitepaper.tsx";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import { DownloadRedirect, LauncherDownloadPage } from "./pages/DownloadProduct";
import HelpRedirect, { LauncherHelpPage } from "./pages/Help";
import PaymentPage, { PaymentCancelPage, PaymentSuccessPage } from "./pages/Payment";
import { AccountPage, ForgotPasswordPage, LauncherAuthPage, LoginPage, ResetPasswordPage, SignupPage, VerifyEmailPage } from "./pages/Auth";

const queryClient = new QueryClient();

const GAListener = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  return null;
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/launcher-auth" element={<LauncherAuthPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment/success" element={<PaymentSuccessPage />} />
          <Route path="/payment/cancel" element={<PaymentCancelPage />} />
          <Route path="/download" element={<DownloadRedirect />} />
          <Route path="/download/launcher" element={<LauncherDownloadPage />} />
          <Route path="/download/openclaw" element={<Navigate to="/download/launcher" replace />} />
          <Route path="/download/claudecode" element={<Navigate to="/download/launcher" replace />} />
          <Route path="/help" element={<HelpRedirect />} />
          <Route path="/help/launcher" element={<LauncherHelpPage />} />
          <Route path="/help/openclaw" element={<Navigate to="/help/launcher" replace />} />
          <Route path="/help/claudecode" element={<Navigate to="/help/launcher" replace />} />
          <Route path="/whitepaper" element={<Whitepaper />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
