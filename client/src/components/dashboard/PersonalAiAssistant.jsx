import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  MessageSquare, 
  Sun, 
  Moon, 
  TrendingUp, 
  BookOpen,
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { Button } from '../ui/Button';

/**
 * Volume 4.5: Personal AI Assistant
 * Provides Morning Briefs, Evening Wrap-ups, and interactive financial intelligence.
 */
export default function PersonalAiAssistant({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('brief'); // 'brief', 'chat', 'learn'

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-full max-w-[400px] bg-brand-surfaceElevated border border-white/10 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden flex flex-col animate-fade-in">
      
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-white/10 bg-gradient-to-r from-brand-purple/10 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center text-white shadow-glow-blue relative">
            <Sparkles size={18} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-success rounded-full border-2 border-brand-surfaceElevated animate-pulse"></span>
          </div>
          <div>
            <h3 className="text-base font-heading font-black text-white">TradeOXX AI</h3>
            <p className="text-[10px] uppercase font-bold tracking-wider text-brand-cyan">Personal Intelligence</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 text-brand-textMuted hover:text-white transition-colors rounded-full hover:bg-white/5">
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex p-2 bg-dark-900/40 border-b border-white/5">
        <button 
          onClick={() => setActiveTab('brief')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex justify-center items-center gap-1.5 ${activeTab === 'brief' ? 'bg-brand-surfaceElevated text-white shadow-sm' : 'text-brand-textMuted hover:text-white'}`}
        >
          <Sun size={14} /> Morning Brief
        </button>
        <button 
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex justify-center items-center gap-1.5 ${activeTab === 'chat' ? 'bg-brand-surfaceElevated text-white shadow-sm' : 'text-brand-textMuted hover:text-white'}`}
        >
          <MessageSquare size={14} /> Assistant
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 max-h-[500px] overflow-y-auto p-5 bg-[#0B0E14]/80">
        
        {activeTab === 'brief' && (
          <div className="space-y-6">
            <div className="text-center pb-4 border-b border-white/5">
              <h4 className="text-2xl font-heading font-black text-white mb-1">Good Morning</h4>
              <p className="text-xs text-brand-textMuted font-mono uppercase">Oct 24 • Pre-Market</p>
            </div>

            <div className="space-y-4">
              <div className="bg-brand-surfaceElevated p-4 rounded-2xl border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-success/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                <h5 className="text-sm font-bold text-white flex items-center gap-2 mb-2 relative z-10">
                  <TrendingUp size={16} className="text-brand-success" /> Market Mood
                </h5>
                <p className="text-xs text-white/80 leading-relaxed relative z-10">
                  Global indices are pointing to a moderately positive open. Focus remains on upcoming core CPI data at 08:30 AM.
                </p>
              </div>

              <div className="bg-brand-surfaceElevated p-4 rounded-2xl border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                <h5 className="text-sm font-bold text-white flex items-center gap-2 mb-2 relative z-10">
                  <Briefcase size={16} className="text-brand-cyan" /> Portfolio Impact
                </h5>
                <p className="text-xs text-white/80 leading-relaxed relative z-10">
                  Your portfolio is currently well-balanced. However, your 15% exposure to Financials may see volatility following the morning's data release.
                </p>
              </div>

              <div className="bg-gradient-to-br from-brand-purple/20 to-transparent p-4 rounded-2xl border border-brand-purple/20">
                <h5 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                  <BookOpen size={16} className="text-brand-purple" /> Today's Learning
                </h5>
                <p className="text-xs text-brand-purple/90 leading-relaxed mb-3">
                  <strong>What is CPI?</strong> The Consumer Price Index measures inflation. A higher than expected number can lead to higher interest rates, which often pressures growth stocks.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="h-[400px] flex flex-col">
            <div className="flex-1 space-y-4">
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-lg bg-brand-cyan/20 flex shrink-0 items-center justify-center text-brand-cyan">
                  <Sparkles size={14} />
                </div>
                <div className="bg-brand-surfaceElevated border border-white/10 rounded-2xl rounded-tl-sm p-3 text-xs text-white/90 leading-relaxed">
                  I've analyzed your portfolio and today's market conditions. How can I help you prepare for the trading session?
                </div>
              </div>

              {/* Quick Prompt Suggestions */}
              <div className="flex flex-col gap-2 pt-4 pl-11">
                <button className="text-left p-3 rounded-xl bg-dark-900/60 border border-white/5 hover:border-brand-cyan/30 text-xs text-white/80 hover:text-white transition-all flex items-center justify-between group">
                  Summarize tech sector news <ArrowRight size={12} className="text-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button className="text-left p-3 rounded-xl bg-dark-900/60 border border-white/5 hover:border-brand-cyan/30 text-xs text-white/80 hover:text-white transition-all flex items-center justify-between group">
                  Assess my portfolio risk <ArrowRight size={12} className="text-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button className="text-left p-3 rounded-xl bg-dark-900/60 border border-white/5 hover:border-brand-cyan/30 text-xs text-white/80 hover:text-white transition-all flex items-center justify-between group">
                  Teach me about VWAP <ArrowRight size={12} className="text-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Chat Input Area (Only visible in chat tab) */}
      {activeTab === 'chat' && (
        <div className="p-4 bg-brand-surfaceElevated border-t border-white/10">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Ask TradeOXX AI..." 
              className="w-full bg-dark-900/80 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-brand-cyan/50 transition-colors"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center text-white shadow-glow-blue">
              <ArrowRight size={16} />
            </button>
          </div>
          <p className="text-[9px] text-center text-brand-textMuted mt-3 uppercase font-bold tracking-wider">
            AI explanations are for informational purposes only.
          </p>
        </div>
      )}

    </div>
  );
}
