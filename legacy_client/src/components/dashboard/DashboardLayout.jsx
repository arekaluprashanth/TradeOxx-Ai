import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../stores/authStore';
import TopNav from './TopNav';
import SidebarNav from './SidebarNav';
import QuickActionsFab from './QuickActionsFab';
import { Cpu, ShieldCheck, Zap, Lock, Command } from 'lucide-react';

export default function DashboardLayout() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Global Keyboard Shortcuts (Ctrl+K, Ctrl+/, Ctrl+D, Ctrl+M, Ctrl+P)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        // Focus top search input
        const searchInput = document.querySelector('input[placeholder*="Search"]');
        if (searchInput) searchInput.focus();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        // Open chatbot
        const chatBtn = document.querySelector('button[title*="Chat"]');
        if (chatBtn) chatBtn.click();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        navigate('/');
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        if (location.pathname === '/') {
          const el = document.getElementById('portfolio');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
          navigate('/#portfolio');
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        if (location.pathname === '/') {
          const el = document.getElementById('charts');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
          navigate('/#charts');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, location]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-brand-bgPrimary flex flex-col font-sans antialiased text-white">
      
      {/* Top Header Navigation */}
      <TopNav onMenuClick={() => setMobileMenuOpen(true)} />

      {/* Main Body Shell: Sidebar + Content */}
      <div className="flex-1 flex w-full overflow-hidden relative">
        
        {/* Left Collapsible Sidebar */}
        <SidebarNav 
          isCollapsed={isSidebarCollapsed} 
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        />

        {/* Main Workspace Canvas */}
        <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6 overflow-x-hidden pb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Floating Quick Actions FAB */}
      <QuickActionsFab 
        onOpenAiChat={() => {
          const chatBtn = document.querySelector('button[title*="Chat"]');
          if (chatBtn) chatBtn.click();
        }}
      />

      {/* Enterprise Bottom Live Status Bar */}
      <footer className="hidden sm:flex fixed bottom-0 left-0 right-0 z-40 bg-dark-950/90 border-t border-white/10 px-4 py-2 items-center justify-between text-[11px] font-mono text-brand-textMuted backdrop-blur-md">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-brand-success font-bold">
            <span className="w-2 h-2 rounded-full bg-brand-success animate-ping" />
            AI ENGINE: ACTIVE (1.0s / Tick)
          </span>
          <span className="flex items-center gap-1">
            <Zap size={12} className="text-brand-cyan" />
            LATENCY: &lt;1.0ms
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Command size={12} className="text-brand-purple" />
            SHORTCUTS: <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-bold">Ctrl+K</kbd> Search • <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-bold">Ctrl+/</kbd> AI
          </span>
        </div>

        <div className="flex items-center gap-2 text-brand-textSecondary">
          <Lock size={12} className="text-brand-success" />
          <span>SSL 256-BIT ENCRYPTED</span>
        </div>
      </footer>

    </div>
  );
}
