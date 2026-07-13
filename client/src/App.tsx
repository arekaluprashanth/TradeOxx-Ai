import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import ForgotPasswordPage from './components/auth/ForgotPasswordPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import ChartsPage from './pages/ChartsPage';
import PortfolioPage from './pages/PortfolioPage';
import StrategyPage from './pages/StrategyPage';
import AnalyticsPage from './pages/AnalyticsPage';
import WatchlistPage from './pages/WatchlistPage';
import SettingsPage from './pages/SettingsPage';
import GlobalRipple from './components/ui/GlobalRipple';
import GlobalTooltip from './components/ui/GlobalTooltip';
import IntroOverlay from './components/ui/IntroOverlay';
import LoadingOverlay from './components/ui/LoadingOverlay';
import { useAuthStore } from './stores/authStore';
import { useUiStore } from './stores/uiStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000,
    },
  },
});

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const theme = useUiStore((state) => state.theme);

  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem('tradeoxx_intro_seen');
  });
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroOverlay 
            onComplete={() => {
              sessionStorage.setItem('tradeoxx_intro_seen', 'true');
              setShowIntro(false);
              setShowLoading(true);
            }} 
          />
        )}
        {showLoading && (
          <LoadingOverlay 
            onComplete={() => setShowLoading(false)} 
          />
        )}
      </AnimatePresence>

      {!showIntro && !showLoading && (
        <>
          <HashRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/" element={<DashboardLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="charts" element={<ChartsPage />} />
                <Route path="portfolio" element={<PortfolioPage />} />
                <Route path="strategy" element={<StrategyPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="watchlist" element={<WatchlistPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
            </Routes>
          </HashRouter>
          <GlobalRipple />
          <GlobalTooltip />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#111627',
                color: '#e2e8f0',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                backdropFilter: 'blur(20px)',
              },
              success: {
                iconTheme: { primary: '#10b981', secondary: '#111627' },
              },
              error: {
                iconTheme: { primary: '#ef4444', secondary: '#111627' },
              },
            }}
          />
        </>
      )}
    </QueryClientProvider>
  );
}

export default App;
