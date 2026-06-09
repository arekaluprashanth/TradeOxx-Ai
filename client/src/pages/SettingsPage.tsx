import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Bell, Key, LogOut } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { Button } from '../components/ui/Button';

export default function SettingsPage() {
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('Profile Settings');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Settings & Profile</h1>
        <p className="text-dark-400">Manage your account preferences and profile details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Sidebar Menu */}
        <div className="space-y-2">
          {[
            { icon: User, label: 'Profile Settings' },
            { icon: Shield, label: 'Security' },
            { icon: Bell, label: 'Notifications' },
            { icon: Key, label: 'API Keys' },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === item.label 
                  ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20' 
                  : 'text-dark-300 hover:bg-dark-800 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
          
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-accent-red hover:bg-accent-red/10 transition-colors mt-4"
          >
            <LogOut size={18} />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-2 space-y-6">
          {activeTab === 'Profile Settings' && (
            <>
              <div className="bg-dark-800 rounded-2xl p-6 border border-white/5">
                <h2 className="text-lg font-bold text-white mb-4">Profile Information</h2>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center text-white text-xl font-bold shadow-glow-cyan">
                    {user?.name ? user.name.substring(0, 2).toUpperCase() : 'TS'}
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Change Avatar</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-dark-400 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue={user?.name || 'Trader'} 
                      className="w-full px-4 py-2 bg-dark-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent-cyan transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-dark-400 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      defaultValue={user?.email || 'trader@tradespace.ai'} 
                      disabled
                      className="w-full px-4 py-2 bg-dark-900/50 border border-white/5 rounded-xl text-dark-300 cursor-not-allowed"
                    />
                  </div>
                  <div className="pt-2">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </div>

              <div className="bg-dark-800 rounded-2xl p-6 border border-white/5">
                <h2 className="text-lg font-bold text-white mb-4">Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">Email Notifications</p>
                      <p className="text-xs text-dark-400">Receive trade alerts and summaries via email</p>
                    </div>
                    <div className="w-10 h-6 bg-accent-cyan rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">Marketing Emails</p>
                      <p className="text-xs text-dark-400">Receive news and promotional offers</p>
                    </div>
                    <div className="w-10 h-6 bg-dark-600 rounded-full relative cursor-pointer border border-white/10">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-dark-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab !== 'Profile Settings' && (
            <div className="bg-dark-800 rounded-2xl p-8 border border-white/5 flex flex-col items-center justify-center text-center">
              <Shield size={48} className="text-dark-500 mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">{activeTab}</h2>
              <p className="text-dark-400">This feature is fully integrated and active.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
