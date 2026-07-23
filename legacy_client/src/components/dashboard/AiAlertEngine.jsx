import React, { useState } from 'react';
import { 
  Bell, 
  X, 
  AlertTriangle, 
  Info, 
  BookOpen, 
  TrendingUp, 
  Activity, 
  CheckCircle2,
  Clock,
  Filter
} from 'lucide-react';
import { Button } from '../ui/Button';

/**
 * Volume 4.5: AI Alert Engine & Notification Center
 * Handles Critical, Important, Informational, and Educational alerts with AI explanations.
 */
export default function AiAlertEngine({ isOpen, onClose }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Portfolio Volatility Spike',
      time: '10m ago',
      content: 'Your Technology sector holdings are experiencing unusually high volatility compared to their 30-day average.',
      aiExplanation: 'The sudden movement is highly correlated with the recent interest rate announcement. Tech stocks are particularly sensitive to rate expectations.',
      educational: 'Volatility measures how much an asset\'s price fluctuates over a period. High volatility means higher risk, but also potential for higher returns.',
      icon: AlertTriangle,
      color: 'text-brand-danger',
      bg: 'bg-brand-danger/10',
      border: 'border-brand-danger/20'
    },
    {
      id: 2,
      type: 'important',
      title: 'RSI Bullish Divergence on BTC',
      time: '1h ago',
      content: 'BTC has formed lower lows while the RSI formed higher lows on the 4H timeframe.',
      aiExplanation: 'This divergence suggests that downward momentum is weakening, which historically precedes a potential trend reversal or consolidation.',
      educational: 'Bullish divergence occurs when a technical indicator moves upward while the price continues downward, signaling waning bearish momentum.',
      icon: TrendingUp,
      color: 'text-brand-warning',
      bg: 'bg-brand-warning/10',
      border: 'border-brand-warning/20'
    },
    {
      id: 3,
      type: 'educational',
      title: 'Learning Opportunity: Sector Rotation',
      time: '3h ago',
      content: 'Capital is visibly moving from Energy into Healthcare today across global markets.',
      aiExplanation: 'This typically happens during late-cycle economic phases when investors seek defensive assets with stable dividends.',
      educational: 'Sector rotation is the movement of money from one industry sector to another as investors anticipate changes in the economic cycle.',
      icon: BookOpen,
      color: 'text-brand-purple',
      bg: 'bg-brand-purple/10',
      border: 'border-brand-purple/20'
    },
    {
      id: 4,
      type: 'informational',
      title: 'Market Close Summary',
      time: '5h ago',
      content: 'The S&P 500 closed up 0.4%, driven by strong earnings in the consumer discretionary sector.',
      aiExplanation: 'Market breadth was positive, with 65% of stocks advancing, indicating healthy underlying participation in today\'s rally.',
      educational: null,
      icon: Info,
      color: 'text-brand-cyan',
      bg: 'bg-brand-cyan/10',
      border: 'border-brand-cyan/20'
    }
  ];

  const filteredAlerts = activeFilter === 'All' 
    ? alerts 
    : alerts.filter(a => a.type === activeFilter.toLowerCase());

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-brand-surface/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl z-50 flex flex-col animate-slide-left">
      
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-cyan/20 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan shadow-glow-blue">
            <Bell size={18} />
          </div>
          <div>
            <h3 className="text-lg font-heading font-black text-white">Intelligence Center</h3>
            <p className="text-[10px] uppercase font-bold tracking-wider text-brand-textMuted">Volume 4.5 AI Alerts</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 text-brand-textMuted hover:text-white transition-colors rounded-full hover:bg-white/5">
          <X size={20} />
        </button>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 flex gap-2 overflow-x-auto hide-scrollbar border-b border-white/5">
        {['All', 'Critical', 'Important', 'Educational', 'Informational'].map(f => (
          <button 
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeFilter === f 
                ? 'bg-brand-surfaceElevated text-white border border-white/10 shadow-sm' 
                : 'text-brand-textMuted hover:text-white border border-transparent'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Alert List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <CheckCircle2 size={48} className="text-brand-success/50" />
            <div>
              <h4 className="text-white font-heading font-bold text-lg">You're All Caught Up</h4>
              <p className="text-brand-textMuted text-sm">No new alerts at the moment. We'll notify you when something meaningful happens.</p>
            </div>
          </div>
        ) : (
          filteredAlerts.map(alert => (
            <div key={alert.id} className={`p-5 rounded-[20px] ${alert.bg} border ${alert.border} group transition-all hover:-translate-y-1 hover:shadow-lg`}>
              <div className="flex gap-4">
                <div className="shrink-0 mt-1">
                  <alert.icon size={18} className={alert.color} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-sm font-bold text-white leading-tight">{alert.title}</h4>
                    <span className="text-[10px] font-mono text-brand-textMuted shrink-0 flex items-center gap-1">
                      <Clock size={10} /> {alert.time}
                    </span>
                  </div>
                  
                  <p className="text-xs text-white/80 leading-relaxed">
                    {alert.content}
                  </p>

                  <div className="pt-2 mt-2 border-t border-white/10 space-y-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-cyan block mb-1">AI Explanation</span>
                      <p className="text-xs text-brand-cyan/80 leading-relaxed">{alert.aiExplanation}</p>
                    </div>
                    
                    {alert.educational && (
                      <div className="bg-dark-900/40 rounded-lg p-3 mt-2 border border-white/5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-purple block mb-1 flex items-center gap-1">
                          <BookOpen size={10} /> Learning Note
                        </span>
                        <p className="text-xs text-brand-purple/80 leading-relaxed">{alert.educational}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 bg-dark-900/60 flex justify-between items-center">
        <span className="text-[10px] text-brand-textMuted flex items-center gap-1">
          <Activity size={10} /> Monitoring 48 assets actively
        </span>
        <Button variant="secondary" size="sm" className="text-xs">Mark All Read</Button>
      </div>

    </div>
  );
}
