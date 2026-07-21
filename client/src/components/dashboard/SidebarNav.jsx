import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  AreaChart,
  Briefcase,
  Sliders,
  Star,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Zap,
  DollarSign,
  ArrowUpRight
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

export default function SidebarNav({ isCollapsed, onToggle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const navItems = [
    { path: '/', label: 'Dashboard', sectionId: 'explore', icon: LayoutDashboard },
    { path: '/#charts', label: 'Charts & Technicals', sectionId: 'charts', icon: AreaChart },
    { path: '/#portfolio', label: 'Investments', sectionId: 'portfolio', icon: Briefcase },
    { path: '/#strategy', label: 'Strategy Lab', sectionId: 'strategy', icon: Sliders },
    { path: '/#watchlist', label: 'Watchlist', sectionId: 'watchlist', icon: Star },
    { path: '/#analytics', label: 'Analytics Engine', sectionId: 'analytics', icon: BarChart3 },
    { path: '/deposit', label: 'Deposit Cash', icon: DollarSign },
    { path: '/withdraw', label: 'Withdraw Equity', icon: ArrowUpRight },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (e, item) => {
    if (item.sectionId) {
      if (location.pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(item.sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.pushState(null, '', `#${item.sectionId}`);
        }
      } else {
        e.preventDefault();
        navigate(`/#${item.sectionId}`);
      }
    }
  };

  return (
    <aside 
      className={`hidden lg:flex flex-col justify-between bg-dark-950/90 border-r border-white/10 p-4 transition-all duration-300 relative z-30 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="space-y-6">
        {/* Toggle Collapse Button */}
        <div className="flex items-center justify-between px-2">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Cpu size={18} className="text-brand-cyan animate-pulse" />
              <span className="text-xs font-heading font-bold text-white uppercase tracking-wider">Navigation</span>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-2 rounded-xl bg-brand-surface hover:bg-brand-surfaceElevated border border-white/10 text-brand-textSecondary hover:text-white transition-all mx-auto"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (location.pathname === '/' && item.sectionId && (location.hash === `#${item.sectionId}` || (item.sectionId === 'explore' && !location.hash)));

            return (
              <a
                key={item.label}
                href={item.path}
                onClick={(e) => handleNavClick(e, item)}
                title={isCollapsed ? item.label : undefined}
                className={`flex items-center gap-3 px-3 py-3 rounded-2xl text-xs font-heading font-semibold transition-all group ${
                  isActive
                    ? 'bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30 shadow-glow-cyan font-bold'
                    : 'text-brand-textSecondary hover:text-white hover:bg-brand-surface/60 border border-transparent'
                }`}
              >
                <Icon size={18} className={`shrink-0 ${isActive ? 'text-brand-cyan' : 'group-hover:text-brand-cyan'} transition-colors`} />
                {!isCollapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="pt-4 border-t border-white/5 space-y-2">
        <button
          onClick={logout}
          title={isCollapsed ? "Logout" : undefined}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-xs font-heading font-bold text-brand-danger hover:bg-brand-danger/10 border border-transparent hover:border-brand-danger/30 transition-all"
        >
          <LogOut size={18} className="shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
