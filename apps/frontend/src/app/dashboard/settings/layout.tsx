"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Shield, Bell, Palette, Bot, ArrowLeft } from 'lucide-react';

const SETTINGS_TABS = [
  { id: 'profile', label: 'Profile', icon: <User size={18} />, href: '/dashboard/settings/profile' },
  { id: 'personalization', label: 'Personalization', icon: <Palette size={18} />, href: '/dashboard/settings/personalization' },
  { id: 'security', label: 'Security & Privacy', icon: <Shield size={18} />, href: '/dashboard/settings/security' },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={18} />, href: '/dashboard/settings/notifications' },
  { id: 'ai', label: 'AI Preferences', icon: <Bot size={18} />, href: '/dashboard/settings/ai' },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="h-full flex flex-col md:flex-row max-w-6xl mx-auto w-full p-4 md:p-8 gap-8">
      
      {/* Settings Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0 flex flex-col gap-8">
        <div>
          <Link href="/dashboard" className="flex items-center gap-2 text-brand-textMuted hover:text-white transition-colors mb-6 text-sm font-medium">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-black text-white tracking-tight">Settings</h1>
          <p className="text-brand-textMuted text-sm mt-2">Manage your account and preferences.</p>
        </div>

        <nav className="flex flex-col gap-1">
          {SETTINGS_TABS.map(tab => {
            const isActive = pathname.includes(tab.href);
            return (
              <Link 
                key={tab.id}
                href={tab.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive 
                    ? 'bg-brand-cyan/10 text-brand-cyan' 
                    : 'text-brand-textSecondary hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Settings Content Area */}
      <div className="flex-1 bg-brand-surface border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple" />
        <div className="h-full overflow-y-auto custom-scrollbar p-6 md:p-10">
          {children}
        </div>
      </div>

    </div>
  );
}
