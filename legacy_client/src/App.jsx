import { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import ForgotPasswordPage from './components/auth/ForgotPasswordPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';
import UserSettingsPage from './pages/UserSettingsPage';
import PersonalizationWorkspace from './pages/PersonalizationWorkspace';
import AdminDashboardPage from './pages/AdminDashboardPage';
import BrandIdentityPage from './pages/BrandIdentityPage';
import DeveloperConsolePage from './pages/DeveloperConsolePage';
import ChartsPage from './pages/ChartsPage';
import PortfolioPage from './pages/PortfolioPage';
import StrategyPage from './pages/StrategyPage';
import AnalyticsPage from './pages/AnalyticsPage';
import WatchlistPage from './pages/WatchlistPage';
import SettingsPage from './pages/SettingsPage';
import DepositPage from './pages/DepositPage';
import WithdrawPage from './pages/WithdrawPage';
import GlobalRipple from './components/ui/GlobalRipple';
import GlobalTooltip from './components/ui/GlobalTooltip';
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
      <HashRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/brand" element={<BrandIdentityPage />} />
          <Route path="/developer" element={<DeveloperConsolePage />} />
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="charts" element={<ChartsPage />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="strategy" element={<StrategyPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="watchlist" element={<WatchlistPage />} />
            <Route path="settings" element={<UserSettingsPage />} />
            <Route path="personalization" element={<PersonalizationWorkspace />} />
            <Route path="deposit" element={<DepositPage />} />
            <Route path="withdraw" element={<WithdrawPage />} />
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
    </QueryClientProvider>
  );
}

export default App;
