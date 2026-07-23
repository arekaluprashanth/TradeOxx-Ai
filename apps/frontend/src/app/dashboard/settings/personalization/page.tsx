"use client";

import { useEffect, useState } from 'react';
import { useSettingsStore } from '@/store/useSettingsStore';
import { Save, Loader2, Moon, Sun, LayoutDashboard, Check } from 'lucide-react';

export default function PersonalizationSettingsPage() {
  const { profile, fetchProfile, updateProfile, isLoading } = useSettingsStore();
  const [formData, setFormData] = useState({
    theme: 'DARK',
    density: 'COMFORTABLE'
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (profile) {
      setFormData({
        theme: profile.theme || 'DARK',
        density: profile.density || 'COMFORTABLE'
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
    return <div className="text-brand-textMuted py-8">Loading preferences...</div>;
  }

  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Personalization</h2>
        <p className="text-brand-textMuted text-sm">Customize how TradeOXX AI looks and feels.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* Theme Selection */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-brand-textSecondary uppercase tracking-wider">Appearance</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <button
              type="button"
              onClick={() => setFormData({ ...formData, theme: 'DARK' })}
              className={`p-6 rounded-xl border text-left transition-all relative ${
                formData.theme === 'DARK' ? 'bg-brand-cyan/10 border-brand-cyan' : 'bg-brand-surfaceElevated border-white/5 hover:border-white/20'
              }`}
            >
              <Moon size={24} className={formData.theme === 'DARK' ? 'text-brand-cyan' : 'text-brand-textMuted'} />
              <h3 className="text-lg font-bold text-white mt-4">Dark Mode</h3>
              <p className="text-sm text-brand-textMuted mt-1">Deep space blacks with neon accents.</p>
              {formData.theme === 'DARK' && <Check size={18} className="absolute top-6 right-6 text-brand-cyan" />}
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, theme: 'LIGHT' })}
              className={`p-6 rounded-xl border text-left transition-all relative ${
                formData.theme === 'LIGHT' ? 'bg-brand-cyan/10 border-brand-cyan' : 'bg-brand-surfaceElevated border-white/5 hover:border-white/20'
              }`}
            >
              <Sun size={24} className={formData.theme === 'LIGHT' ? 'text-brand-cyan' : 'text-brand-textMuted'} />
              <h3 className="text-lg font-bold text-white mt-4">Light Mode</h3>
              <p className="text-sm text-brand-textMuted mt-1">Clean whites with subtle shadow depth.</p>
              {formData.theme === 'LIGHT' && <Check size={18} className="absolute top-6 right-6 text-brand-cyan" />}
            </button>

          </div>
        </div>

        {/* Layout Density */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-brand-textSecondary uppercase tracking-wider">Layout Density</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <button
              type="button"
              onClick={() => setFormData({ ...formData, density: 'COMFORTABLE' })}
              className={`p-6 rounded-xl border text-left transition-all relative ${
                formData.density === 'COMFORTABLE' ? 'bg-brand-purple/10 border-brand-purple' : 'bg-brand-surfaceElevated border-white/5 hover:border-white/20'
              }`}
            >
              <LayoutDashboard size={24} className={formData.density === 'COMFORTABLE' ? 'text-brand-purple' : 'text-brand-textMuted'} />
              <h3 className="text-lg font-bold text-white mt-4">Comfortable</h3>
              <p className="text-sm text-brand-textMuted mt-1">More padding, relaxed reading experience.</p>
              {formData.density === 'COMFORTABLE' && <Check size={18} className="absolute top-6 right-6 text-brand-purple" />}
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, density: 'COMPACT' })}
              className={`p-6 rounded-xl border text-left transition-all relative ${
                formData.density === 'COMPACT' ? 'bg-brand-purple/10 border-brand-purple' : 'bg-brand-surfaceElevated border-white/5 hover:border-white/20'
              }`}
            >
              <LayoutDashboard size={24} className={formData.density === 'COMPACT' ? 'text-brand-purple' : 'text-brand-textMuted'} />
              <h3 className="text-lg font-bold text-white mt-4">Compact</h3>
              <p className="text-sm text-brand-textMuted mt-1">Fit more data on the screen. Best for traders.</p>
              {formData.density === 'COMPACT' && <Check size={18} className="absolute top-6 right-6 text-brand-purple" />}
            </button>

          </div>
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
