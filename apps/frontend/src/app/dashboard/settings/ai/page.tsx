"use client";

import { useEffect, useState } from 'react';
import { useSettingsStore } from '@/store/useSettingsStore';
import { Save, Loader2, Brain, Database, ShieldAlert } from 'lucide-react';

export default function AISettingsPage() {
  const { profile, fetchProfile, updateProfile, isLoading } = useSettingsStore();
  const [formData, setFormData] = useState({
    aiMemory: 'STANDARD',
    aiLevel: 'INTERMEDIATE'
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (profile) {
      setFormData({
        aiMemory: profile.aiMemory || 'STANDARD',
        aiLevel: profile.aiLevel || 'INTERMEDIATE'
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
    return <div className="text-brand-textMuted py-8">Loading AI preferences...</div>;
  }

  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">AI Preferences</h2>
        <p className="text-brand-textMuted text-sm">Tune the TradeOXX AI engine to match your expertise and privacy needs.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* Expertise Level */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-brand-textSecondary uppercase tracking-wider flex items-center gap-2">
            <Brain size={16} /> Financial Expertise Level
          </label>
          <div className="bg-brand-surfaceElevated border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
            
            <label className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/5 transition-colors">
              <input 
                type="radio" 
                name="aiLevel" 
                value="BEGINNER"
                checked={formData.aiLevel === 'BEGINNER'}
                onChange={(e) => setFormData({ ...formData, aiLevel: e.target.value })}
                className="w-4 h-4 text-brand-cyan bg-brand-bgSecondary border-white/20 focus:ring-brand-cyan"
              />
              <div>
                <div className="font-bold text-white">Beginner (Explain it simply)</div>
                <div className="text-sm text-brand-textMuted">AI will avoid complex jargon and break down concepts step-by-step.</div>
              </div>
            </label>

            <label className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/5 transition-colors">
              <input 
                type="radio" 
                name="aiLevel" 
                value="INTERMEDIATE"
                checked={formData.aiLevel === 'INTERMEDIATE'}
                onChange={(e) => setFormData({ ...formData, aiLevel: e.target.value })}
                className="w-4 h-4 text-brand-cyan bg-brand-bgSecondary border-white/20 focus:ring-brand-cyan"
              />
              <div>
                <div className="font-bold text-white">Intermediate (Standard)</div>
                <div className="text-sm text-brand-textMuted">Balanced responses with standard financial terminology.</div>
              </div>
            </label>

            <label className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/5 transition-colors">
              <input 
                type="radio" 
                name="aiLevel" 
                value="ADVANCED"
                checked={formData.aiLevel === 'ADVANCED'}
                onChange={(e) => setFormData({ ...formData, aiLevel: e.target.value })}
                className="w-4 h-4 text-brand-cyan bg-brand-bgSecondary border-white/20 focus:ring-brand-cyan"
              />
              <div>
                <div className="font-bold text-white">Advanced (Professional)</div>
                <div className="text-sm text-brand-textMuted">Highly technical analysis designed for institutional traders and quants.</div>
              </div>
            </label>

          </div>
        </div>

        {/* Data Retention */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-brand-textSecondary uppercase tracking-wider flex items-center gap-2">
            <Database size={16} /> AI Memory & Context Retention
          </label>
          <div className="bg-brand-surfaceElevated border border-white/5 rounded-2xl p-6 space-y-4">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold">Standard Memory</h3>
                <p className="text-sm text-brand-textMuted max-w-md">The AI remembers your past conversations and portfolio to provide highly personalized advice.</p>
              </div>
              <button 
                type="button"
                onClick={() => setFormData({ ...formData, aiMemory: 'STANDARD' })}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${formData.aiMemory === 'STANDARD' ? 'bg-brand-cyan text-brand-bgPrimary' : 'bg-white/5 text-white hover:bg-white/10'}`}
              >
                {formData.aiMemory === 'STANDARD' ? 'Active' : 'Select'}
              </button>
            </div>

            <div className="w-full h-px bg-white/5" />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold flex items-center gap-2">
                  Zero Data Retention <ShieldAlert size={14} className="text-brand-warning" />
                </h3>
                <p className="text-sm text-brand-textMuted max-w-md">Conversations are deleted instantly. The AI will not remember previous prompts.</p>
              </div>
              <button 
                type="button"
                onClick={() => setFormData({ ...formData, aiMemory: 'NONE' })}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${formData.aiMemory === 'NONE' ? 'bg-brand-warning text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}
              >
                {formData.aiMemory === 'NONE' ? 'Active' : 'Select'}
              </button>
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
            Save AI Settings
          </button>
        </div>

      </form>
    </div>
  );
}
