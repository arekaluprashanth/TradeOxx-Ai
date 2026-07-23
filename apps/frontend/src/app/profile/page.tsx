"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { User, Settings, Shield, Bell, LogOut } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-[#02050E] pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-heading font-black text-white mb-8">Account Settings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-2">
            {[
              { icon: User, label: "Profile", active: true },
              { icon: Settings, label: "Preferences", active: false },
              { icon: Shield, label: "Security", active: false },
              { icon: Bell, label: "Notifications", active: false }
            ].map((item, i) => (
              <button
                key={i}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                  item.active 
                    ? 'bg-brand-cyan/10 text-brand-cyan' 
                    : 'text-brand-textSecondary hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon size={18} /> {item.label}
              </button>
            ))}
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm text-brand-danger hover:bg-brand-danger/10 mt-8"
            >
              <LogOut size={18} /> Sign Out
            </button>
          </div>

          {/* Content */}
          <div className="md:col-span-3 space-y-6">
            <div className="bg-brand-surfaceElevated border border-white/10 rounded-3xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">Personal Information</h2>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center text-3xl font-bold text-white">
                  {user?.profile?.displayName?.[0]?.toUpperCase() || "U"}
                </div>
                <div>
                  <button className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
                    Change Avatar
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-brand-textSecondary mb-1.5">Display Name</label>
                  <input
                    type="text"
                    defaultValue={user?.profile?.displayName || ""}
                    className="block w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-brand-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-textSecondary mb-1.5">Email Address</label>
                  <input
                    type="email"
                    disabled
                    defaultValue={user?.email || ""}
                    className="block w-full px-4 py-3 border border-white/5 rounded-xl bg-white/5 text-brand-textMuted cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button className="px-6 py-2.5 bg-brand-cyan text-brand-bgPrimary rounded-lg font-bold hover:opacity-90 transition-opacity">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
