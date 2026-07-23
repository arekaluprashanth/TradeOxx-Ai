"use client";

import { useEffect, useState } from 'react';
import { useSettingsStore } from '@/store/useSettingsStore';
import { Save, Loader2, BellRing, Mail, Smartphone } from 'lucide-react';

export default function NotificationSettingsPage() {
  const { profile, fetchProfile, updateProfile, isLoading } = useSettingsStore();
  const [formData, setFormData] = useState({
    securityAlerts: true,
    marketingEmails: false,
    portfolioUpdates: true,
    priceAlerts: true,
    aiReports: true
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        securityAlerts: profile.securityAlerts ?? true,
        marketingEmails: profile.marketingEmails ?? false,
      }));
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateProfile({
      securityAlerts: formData.securityAlerts,
      marketingEmails: formData.marketingEmails
    });
    setIsSaving(false);
  };

  if (isLoading && !profile) {
    return <div className="text-brand-textMuted py-8">Loading notification preferences...</div>;
  }

  const Toggle = ({ checked, onChange, label, description, icon: Icon }: any) => (
    <div className="flex items-center justify-between p-6 bg-brand-surfaceElevated border border-white/5 rounded-2xl transition-all hover:border-white/10">
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-xl mt-1 ${checked ? 'bg-brand-cyan/10 text-brand-cyan' : 'bg-white/5 text-brand-textMuted'}`}>
          <Icon size={20} />
        </div>
        <div>
          <div className="font-bold text-white mb-1">{label}</div>
          <div className="text-sm text-brand-textMuted max-w-sm">{description}</div>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-cyan"></div>
      </label>
    </div>
  );

  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Notifications</h2>
        <p className="text-brand-textMuted text-sm">Choose what you want to be notified about.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-brand-textSecondary uppercase tracking-wider mb-2">Delivery Methods</h3>
          
          <Toggle 
            checked={true}
            onChange={() => {}}
            label="In-App Notifications"
            description="Receive alerts directly inside TradeOXX AI."
            icon={BellRing}
          />
          <Toggle 
            checked={true}
            onChange={() => {}}
            label="Email Notifications"
            description="Receive summaries and alerts to your registered email."
            icon={Mail}
          />
          <Toggle 
            checked={false}
            onChange={() => {}}
            label="Push Notifications"
            description="Receive alerts on your mobile device (Requires iOS/Android app)."
            icon={Smartphone}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-brand-textSecondary uppercase tracking-wider mb-2">Alert Types</h3>
          
          <Toggle 
            checked={formData.securityAlerts}
            onChange={(e: any) => setFormData({ ...formData, securityAlerts: e.target.checked })}
            label="Security Alerts"
            description="Get notified about new logins and password changes."
            icon={ShieldAlertIcon}
          />
          <Toggle 
            checked={formData.portfolioUpdates}
            onChange={(e: any) => setFormData({ ...formData, portfolioUpdates: e.target.checked })}
            label="Portfolio Updates"
            description="Get notified about significant drawdowns or ATHs."
            icon={BellRing}
          />
          <Toggle 
            checked={formData.marketingEmails}
            onChange={(e: any) => setFormData({ ...formData, marketingEmails: e.target.checked })}
            label="Product Updates"
            description="Receive emails about new TradeOXX AI features."
            icon={Mail}
          />
        </div>

        <div className="pt-6 border-t border-white/5 flex justify-end">
          <button 
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-brand-cyan text-brand-bgPrimary font-bold rounded-xl hover:bg-brand-cyan/90 disabled:opacity-50 transition-colors"
          >
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Save Preferences
          </button>
        </div>

      </form>
    </div>
  );
}

const ShieldAlertIcon = ({ size, className }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
    <path d="M12 8v4"/>
    <path d="M12 16h.01"/>
  </svg>
);
