import React, { useState } from 'react';
import { 
  LayoutTemplate, Palette, BrainCircuit, MonitorSmartphone, 
  Keyboard, Settings2, Bookmark, Share2, Plus, GripHorizontal,
  X, Check
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function PersonalizationWorkspace() {
  const [activeTab, setActiveTab] = useState('layouts');

  const tabs = [
    { id: 'layouts', label: 'Saved Layouts', icon: LayoutTemplate },
    { id: 'theme', label: 'Theme & Appearance', icon: Palette },
    { id: 'memory', label: 'AI Memory & Data', icon: BrainCircuit },
    { id: 'dashboard', label: 'Dashboard Widgets', icon: Settings2 },
    { id: 'accessibility', label: 'Accessibility', icon: MonitorSmartphone },
  ];

  return (
    <div className="pt-24 pb-24 max-w-6xl mx-auto px-4 sm:px-6 space-y-8 animate-fade-in text-white font-sans min-h-screen">
      
      {/* Header */}
      <div>
        <h1 className="text-4xl font-heading font-black text-white mb-2">Workspace & Personalization</h1>
        <p className="text-brand-textMuted text-sm max-w-2xl">
          Customize your TradeOXX AI intelligence environment. Configure layouts, themes, widgets, and manage how the AI remembers your workflows.
        </p>
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
                  ? 'bg-brand-surfaceElevated text-brand-purple border border-brand-purple/20 shadow-sm'
                  : 'text-brand-textMuted hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-brand-surfaceElevated/50 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 sm:p-10 shadow-2xl">
          
          {/* SAVED LAYOUTS */}
          {activeTab === 'layouts' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-xl font-heading font-black text-white mb-1">Workspace Layouts</h2>
                  <p className="text-xs text-brand-textMuted">Manage your saved chart templates and dashboard configurations.</p>
                </div>
                <Button variant="primary" size="sm" className="gap-2">
                  <Plus size={16} /> New Layout
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'Day Trading Setup', desc: '4-Chart Grid with Volume Profile and MACD', active: true },
                  { name: 'Crypto Swing', desc: '2-Chart Split with RSI and Bollinger Bands', active: false },
                  { name: 'Macro Analysis', desc: 'Single large chart with Economic overlays', active: false },
                ].map((layout, i) => (
                  <div key={i} className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    layout.active 
                      ? 'bg-brand-purple/10 border-brand-purple/30' 
                      : 'bg-dark-900/50 border-white/5 hover:border-white/20'
                  }`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-xl bg-dark-900 flex items-center justify-center text-brand-textMuted">
                        <LayoutTemplate size={20} />
                      </div>
                      {layout.active && (
                        <span className="bg-brand-purple/20 text-brand-purple text-[9px] uppercase px-2 py-0.5 rounded font-bold">Active</span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">{layout.name}</h4>
                    <p className="text-xs text-brand-textMuted">{layout.desc}</p>
                    
                    <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
                      <button className="text-xs font-bold text-brand-cyan hover:text-white transition-colors">Apply</button>
                      <button className="text-xs font-bold text-brand-textMuted hover:text-white transition-colors">Edit</button>
                      <button className="text-xs font-bold text-brand-danger hover:text-white transition-colors ml-auto">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* THEMES */}
          {activeTab === 'theme' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-xl font-heading font-black text-white mb-1">Theme & Appearance</h2>
                <p className="text-xs text-brand-textMuted">Personalize the visual identity of your workspace.</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs uppercase font-bold tracking-wider text-brand-textMuted">Base Theme</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: 'Dark Luxury', color: '#0B0E14', active: true },
                    { name: 'Midnight Blue', color: '#0A1128', active: false },
                    { name: 'Graphite', color: '#1E1E1E', active: false },
                    { name: 'High Contrast', color: '#000000', active: false },
                  ].map((theme, i) => (
                    <div key={i} className={`p-4 rounded-xl border text-center cursor-pointer transition-all ${
                      theme.active ? 'border-brand-cyan bg-brand-cyan/5' : 'border-white/10 bg-dark-900/50 hover:border-white/30'
                    }`}>
                      <div className="w-full h-12 rounded-lg mb-3 border border-white/10" style={{ backgroundColor: theme.color }}></div>
                      <span className="text-xs font-bold text-white">{theme.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/10">
                <h3 className="text-xs uppercase font-bold tracking-wider text-brand-textMuted">Accent Color</h3>
                <div className="flex gap-4">
                  {['#00E5FF', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'].map((color, i) => (
                    <button 
                      key={i} 
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${i === 0 ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0B0E14]' : ''}`}
                      style={{ backgroundColor: color }}
                    >
                      {i === 0 && <Check size={16} className="text-dark-900" />}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4 pt-6 border-t border-white/10">
                <h3 className="text-xs uppercase font-bold tracking-wider text-brand-textMuted">Glassmorphism Intensity</h3>
                <input type="range" min="0" max="100" defaultValue="70" className="w-full accent-brand-cyan" />
                <div className="flex justify-between text-xs text-brand-textMuted">
                  <span>Solid</span>
                  <span>Glass</span>
                </div>
              </div>
            </div>
          )}

          {/* AI MEMORY */}
          {activeTab === 'memory' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-xl font-heading font-black text-white mb-1">AI Memory & Data</h2>
                <p className="text-xs text-brand-textMuted">Control what TradeOXX AI learns about your trading habits.</p>
              </div>

              <div className="bg-brand-surfaceElevated/80 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0">
                    <BrainCircuit size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Active AI Memory</h4>
                    <p className="text-xs text-brand-textMuted mt-1">The AI is currently learning your preferences to provide personalized Morning Briefs and pattern suggestions.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-dark-900/50 rounded-xl border border-white/5">
                    <div>
                      <h5 className="text-sm font-bold text-white">Favorite Assets Learned</h5>
                      <p className="text-xs text-brand-textMuted">AAPL, TSLA, BTC, ETH</p>
                    </div>
                    <button className="text-xs text-brand-danger font-bold hover:underline">Forget</button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-dark-900/50 rounded-xl border border-white/5">
                    <div>
                      <h5 className="text-sm font-bold text-white">Preferred Indicators Learned</h5>
                      <p className="text-xs text-brand-textMuted">MACD, VWAP, Volume Profile</p>
                    </div>
                    <button className="text-xs text-brand-danger font-bold hover:underline">Forget</button>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
                  <button className="text-xs text-brand-textMuted hover:text-white transition-colors">Download Memory Log (JSON)</button>
                  <Button variant="danger" size="sm">Clear All AI Memory</Button>
                </div>
              </div>
            </div>
          )}

          {/* DASHBOARD WIDGETS */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-xl font-heading font-black text-white mb-1">Dashboard Widgets</h2>
                <p className="text-xs text-brand-textMuted">Customize the visibility and layout of your main dashboard.</p>
              </div>

              <div className="space-y-2">
                {[
                  { name: 'AI Morning Brief', enabled: true },
                  { name: 'Market Overview (Indices)', enabled: true },
                  { name: 'Portfolio Performance', enabled: true },
                  { name: 'Active Watchlist', enabled: true },
                  { name: 'Recent News Sentiment', enabled: false },
                  { name: 'Economic Calendar', enabled: false },
                ].map((widget, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-dark-900/50 rounded-xl border border-white/5 cursor-move hover:border-white/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <GripHorizontal size={16} className="text-brand-textMuted" />
                      <span className="text-sm font-bold text-white">{widget.name}</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={widget.enabled} />
                      <div className="w-9 h-5 bg-dark-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-cyan border border-white/10"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
