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
import ProjectPage from "./pages/ProjectPage";
import { PortfolioLanguageProvider, usePortfolioLanguage } from "./lib/portfolio-language";
import { projects } from "./lib/portfolio";

const queryClient = new QueryClient();

const GAListener = () => {
  const location = useLocation();
  const { language } = usePortfolioLanguage();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  useEffect(() => {
    const pathname = location.pathname.replace(/\/$/, "") || "/";
    const project = projects.find((item) => item.path === pathname);
    const title = project ? `${project.title} | MellowCat` : "MellowCat | Independent projects";
    const description = project
      ? project.seoDescription[language]
      : language === "ko"
        ? "MellowCat Launcher와 Lumber Rush를 만드는 개인 개발 프로젝트 포트폴리오입니다."
        : "An independent portfolio featuring MellowCat Launcher and Lumber Rush.";
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    const url = `https://mellowcat.xyz${project?.path ?? "/"}`;
    const image = `https://mellowcat.xyz${project?.image ?? "/launcher-icon.png"}`;
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", url);
    document.querySelector('meta[property="og:image"]')?.setAttribute("content", image);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
  }, [language, location.pathname]);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }
    const frame = window.requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PortfolioLanguageProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GAListener />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects/mellowcat-launcher" element={<ProjectPage id="mellowcat-launcher" />} />
          <Route path="/projects/lumber-rush" element={<ProjectPage id="lumber-rush" />} />
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
    </PortfolioLanguageProvider>
  </QueryClientProvider>
);

export default App;
