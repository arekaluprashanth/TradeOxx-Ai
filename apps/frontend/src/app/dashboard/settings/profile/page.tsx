"use client";

import { useEffect, useState } from 'react';
import { useSettingsStore } from '@/store/useSettingsStore';
import { Camera, Save, Loader2 } from 'lucide-react';

export default function ProfileSettingsPage() {
  const { profile, fetchProfile, updateProfile, isLoading } = useSettingsStore();
  const [formData, setFormData] = useState({
    displayName: '',
    timezone: '',
    currency: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (profile) {
      setFormData({
        displayName: profile.displayName || '',
        timezone: profile.timezone || 'UTC',
        currency: profile.currency || 'USD'
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateProfile(formData);
    setIsSaving(false);
  };

  if (isLoading && !profile) {
    return <div className="text-brand-textMuted py-8">Loading profile...</div>;
  }

  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Public Profile</h2>
        <p className="text-brand-textMuted text-sm">Manage how you appear to others on TradeOXX AI.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Avatar Upload */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-brand-surfaceElevated border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-brand-textMuted hover:border-brand-cyan hover:text-brand-cyan transition-colors cursor-pointer overflow-hidden relative group">
            {profile?.avatarUrl ? (
              <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <Camera size={24} />
            )}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-bold text-white">Upload</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white mb-1">Profile Picture</h3>
            <p className="text-xs text-brand-textMuted">We support PNG, JPG, or GIF under 5MB.</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-brand-textSecondary uppercase tracking-wider">Display Name</label>
            <input 
              type="text" 
              value={formData.displayName}
              onChange={e => setFormData({ ...formData, displayName: e.target.value })}
              className="bg-brand-bgSecondary border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan/50 transition-colors"
              placeholder="e.g. Satoshi Nakamoto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-brand-textSecondary uppercase tracking-wider">Timezone</label>
              <select 
                value={formData.timezone}
                onChange={e => setFormData({ ...formData, timezone: e.target.value })}
                className="bg-brand-bgSecondary border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan/50 transition-colors appearance-none"
              >
                <option value="UTC">UTC (Universal Coordinated Time)</option>
                <option value="EST">EST (Eastern Standard Time)</option>
                <option value="PST">PST (Pacific Standard Time)</option>
                <option value="IST">IST (Indian Standard Time)</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-brand-textSecondary uppercase tracking-wider">Base Currency</label>
              <select 
                value={formData.currency}
                onChange={e => setFormData({ ...formData, currency: e.target.value })}
                className="bg-brand-bgSecondary border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan/50 transition-colors appearance-none"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex justify-end">
          <button 
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-brand-cyan text-brand-bgPrimary font-bold rounded-xl hover:bg-brand-cyan/90 disabled:opacity-50 transition-colors"
          >
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Save Changes
          </button>
        </div>

      </form>
    </div>
  );
}
