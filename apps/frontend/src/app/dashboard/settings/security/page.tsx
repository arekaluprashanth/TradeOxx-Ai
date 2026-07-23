"use client";

import { useState } from 'react';
import { Key, Smartphone, Shield, Download, Trash2, Laptop } from 'lucide-react';

export default function SecuritySettingsPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Security & Privacy</h2>
        <p className="text-brand-textMuted text-sm">Keep your TradeOXX AI account secure and manage your data.</p>
      </div>

      <div className="space-y-8">
        
        {/* Authentication */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2">Authentication</h3>
          
          <div className="bg-brand-surfaceElevated border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex gap-4">
              <div className="p-3 bg-white/5 rounded-xl h-fit text-brand-textSecondary">
                <Key size={20} />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Password</h4>
                <p className="text-sm text-brand-textMuted">Last changed 3 months ago.</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white/5 text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
              Update Password
            </button>
          </div>

          <div className="bg-brand-surfaceElevated border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex gap-4">
              <div className={`p-3 rounded-xl h-fit ${twoFactorEnabled ? 'bg-brand-success/10 text-brand-success' : 'bg-white/5 text-brand-textSecondary'}`}>
                <Smartphone size={20} />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Two-Factor Authentication (2FA)</h4>
                <p className="text-sm text-brand-textMuted">Add an extra layer of security using an authenticator app.</p>
              </div>
            </div>
            <button 
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`px-4 py-2 font-medium rounded-lg transition-colors ${twoFactorEnabled ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-brand-success text-brand-bgPrimary'}`}
            >
              {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
            </button>
          </div>
        </section>

        {/* Active Sessions */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2">Active Sessions</h3>
          <p className="text-sm text-brand-textMuted mb-4">These are the devices that have logged into your account. Revoke any sessions that you do not recognize.</p>
          
          <div className="bg-brand-surfaceElevated border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
            <div className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-4">
                <Laptop size={20} className="text-brand-cyan" />
                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    Windows PC - Chrome <span className="text-[10px] bg-brand-cyan/20 text-brand-cyan px-2 py-0.5 rounded uppercase font-bold tracking-wider">Current</span>
                  </div>
                  <div className="text-xs text-brand-textMuted">New York, USA • Active now</div>
                </div>
              </div>
            </div>
            
            <div className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-4">
                <Smartphone size={20} className="text-brand-textSecondary" />
                <div>
                  <div className="font-bold text-white">iPhone 14 Pro - Safari</div>
                  <div className="text-xs text-brand-textMuted">London, UK • Last active 2 days ago</div>
                </div>
              </div>
              <button className="text-brand-danger opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold px-3 py-1 bg-brand-danger/10 rounded">
                Revoke
              </button>
            </div>
          </div>
        </section>

        {/* Data & Privacy */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2">Data & Privacy</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-brand-surfaceElevated border border-white/5 rounded-2xl p-6 border-l-4 border-l-brand-cyan">
              <Download size={24} className="text-brand-cyan mb-4" />
              <h4 className="font-bold text-white mb-2">Export Data</h4>
              <p className="text-sm text-brand-textMuted mb-4">Download a copy of your portfolios, reports, and learning history in JSON format.</p>
              <button className="text-sm font-bold text-brand-cyan hover:text-white transition-colors">Request Archive</button>
            </div>

            <div className="bg-brand-surfaceElevated border border-brand-danger/20 rounded-2xl p-6 border-l-4 border-l-brand-danger">
              <Trash2 size={24} className="text-brand-danger mb-4" />
              <h4 className="font-bold text-white mb-2">Delete Account</h4>
              <p className="text-sm text-brand-textMuted mb-4">Permanently delete your account and all associated financial data.</p>
              <button className="text-sm font-bold text-brand-danger hover:text-red-400 transition-colors">Delete Account</button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
