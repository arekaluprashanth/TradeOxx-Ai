import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  Bell, 
  CreditCard, 
  LogOut, 
  CheckCircle2, 
  Smartphone,
  Key,
  Database,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function UserSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'security', label: 'Security & Login', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Plan & Billing', icon: CreditCard }
  ];

  return (
    <div className="pt-24 pb-24 max-w-6xl mx-auto px-4 sm:px-6 space-y-8 animate-fade-in text-white font-sans min-h-screen">
      
      {/* Header */}
      <div>
        <h1 className="text-4xl font-heading font-black text-white mb-2">Account Settings</h1>
        <p className="text-brand-textMuted text-sm">Manage your profile, security preferences, and subscription.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-brand-surfaceElevated text-brand-cyan border border-brand-cyan/20 shadow-sm'
                  : 'text-brand-textMuted hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
          
          <div className="pt-4 mt-4 border-t border-white/10">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-brand-danger hover:bg-brand-danger/10 transition-all border border-transparent">
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-brand-surfaceElevated/50 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 sm:p-10 shadow-2xl">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-xl font-heading font-black text-white mb-1">Profile Information</h2>
                <p className="text-xs text-brand-textMuted">Update your account details and public identity.</p>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-brand-gradient p-1 flex items-center justify-center">
                  <div className="w-full h-full bg-dark-900 rounded-full flex items-center justify-center border-4 border-dark-900 overflow-hidden">
                    <User size={32} className="text-brand-textMuted" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Button variant="secondary" size="sm">Upload Avatar</Button>
                  <p className="text-[10px] text-brand-textMuted uppercase tracking-wider">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-wider text-brand-textMuted block mb-2">First Name</label>
                  <input type="text" defaultValue="Alexander" className="w-full bg-dark-900/50 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-brand-cyan/50 transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-wider text-brand-textMuted block mb-2">Last Name</label>
                  <input type="text" defaultValue="Wright" className="w-full bg-dark-900/50 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-brand-cyan/50 transition-colors" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-brand-textMuted block mb-2">Email Address</label>
                  <input type="email" defaultValue="alexander.wright@example.com" disabled className="w-full bg-dark-900/30 border border-white/5 rounded-xl py-3 px-4 text-sm text-brand-textMuted cursor-not-allowed" />
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-end">
                <Button variant="primary">Save Changes</Button>
              </div>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === 'security' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-xl font-heading font-black text-white mb-1">Security & Login</h2>
                <p className="text-xs text-brand-textMuted">Manage your passwords and two-factor authentication.</p>
              </div>

              <div className="space-y-4">
                <div className="bg-dark-900/60 border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                      <Key size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Password</h4>
                      <p className="text-xs text-brand-textMuted">Last changed 3 months ago</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm">Update Password</Button>
                </div>

                <div className="bg-dark-900/60 border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-purple/10 flex items-center justify-center text-brand-purple">
                      <Smartphone size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        Two-Factor Authentication (2FA)
                        <span className="bg-brand-success/20 text-brand-success text-[9px] uppercase px-2 py-0.5 rounded font-bold">Enabled</span>
                      </h4>
                      <p className="text-xs text-brand-textMuted">Protect your account with an extra layer of security.</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm">Manage 2FA</Button>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h3 className="text-sm font-bold text-white mb-4 text-brand-danger">Danger Zone</h3>
                <div className="bg-brand-danger/5 border border-brand-danger/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-white">Delete Account</h4>
                    <p className="text-xs text-brand-textMuted mt-1">Permanently delete your data and everything associated with your account.</p>
                  </div>
                  <button className="px-4 py-2 rounded-xl border border-brand-danger/50 text-brand-danger text-xs font-bold hover:bg-brand-danger/10 transition-colors whitespace-nowrap">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-xl font-heading font-black text-white mb-1">Notification Preferences</h2>
                <p className="text-xs text-brand-textMuted">Choose how and when TradeOXX AI communicates with you.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-brand-textMuted border-b border-white/10 pb-2">AI Intelligence</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Morning Brief</h4>
                      <p className="text-xs text-brand-textMuted">Daily pre-market summary and portfolio impact analysis.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-dark-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-cyan border border-white/10"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Pattern Detection Alerts</h4>
                      <p className="text-xs text-brand-textMuted">Real-time alerts when AI detects chart patterns in your watchlist.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-dark-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-cyan border border-white/10"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BILLING TAB */}
          {activeTab === 'billing' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-xl font-heading font-black text-white mb-1">Plan & Billing</h2>
                <p className="text-xs text-brand-textMuted">Manage your subscription and payment methods.</p>
              </div>

              <div className="bg-brand-gradient p-[1px] rounded-2xl">
                <div className="bg-dark-900 rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="inline-flex items-center gap-1.5 bg-brand-cyan/20 text-brand-cyan px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-2">
                        <Star size={12} fill="currentColor" /> Pro Tier
                      </div>
                      <h3 className="text-2xl font-heading font-black text-white">TradeOXX AI Professional</h3>
                      <p className="text-xs text-brand-textMuted mt-1">Unlimited charts, advanced AI features, and real-time data.</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-heading font-black text-white">$49<span className="text-sm text-brand-textMuted font-sans">/mo</span></div>
                      <p className="text-xs text-brand-textMuted mt-1">Renews on Nov 24, 2026</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button variant="primary" size="sm">Manage Subscription</Button>
                    <Button variant="secondary" size="sm">View Invoices</Button>
                  </div>
                </div>
              </div>

            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}

function Star(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
