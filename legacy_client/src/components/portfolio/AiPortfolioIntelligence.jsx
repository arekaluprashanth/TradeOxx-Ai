import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Activity, 
  PieChart, 
  ShieldAlert, 
  TrendingUp, 
  Layers, 
  Clock, 
  Lightbulb,
  FileText,
  ChevronRight,
  Zap,
  Target
} from 'lucide-react';
import AiExplainabilityPanel from '../dashboard/AiExplainabilityPanel';
import { Button } from '../ui/Button';

/**
 * Volume 4.3.3: AI PORTFOLIO INTELLIGENCE ENGINE
 * Mission: Help users understand structure, behavior, and characteristics of their portfolio 
 * through educational explanations and transparent analysis.
 */
export default function AiPortfolioIntelligence() {
  const [activeTab, setActiveTab] = useState('summary');

  return (
    <div className="space-y-6">
      
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide border-b border-white/5">
        {[
          { id: 'summary', label: 'Intelligence Summary', icon: SparklesIcon },
          { id: 'health', label: 'Health Score', icon: Activity },
          { id: 'allocation', label: 'Allocation', icon: PieChart },
          { id: 'risk', label: 'Risk & Diversification', icon: ShieldAlert },
          { id: 'timeline', label: 'Timeline', icon: Clock }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-heading font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id 
                ? 'bg-brand-purple/10 text-brand-purple border-b-2 border-brand-purple' 
                : 'text-brand-textMuted hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[400px]">
        {activeTab === 'summary' && <IntelligenceSummaryTab />}
        {activeTab === 'health' && <HealthScoreTab />}
        {activeTab === 'allocation' && <AllocationTab />}
        {activeTab === 'risk' && <RiskDiversificationTab />}
        {activeTab === 'timeline' && <TimelineTab />}
      </div>

    </div>
  );
}

function SparklesIcon(props) {
  return <Zap {...props} />;
}

// ── 1. INTELLIGENCE SUMMARY ────────────────────────────────────────────────────────
function IntelligenceSummaryTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Summary Card */}
      <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-brand-purple/15 to-transparent border border-white/10 p-6 md:p-8 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2 space-y-6">
            <div>
              <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-purple mb-2">AI Portfolio Narrative</p>
              <h3 className="text-xl sm:text-2xl font-medium text-white leading-relaxed">
                "Your portfolio remains <span className="text-brand-success font-bold">diversified</span> across multiple sectors. Technology currently represents the largest allocation. Overall volatility appears <span className="text-brand-cyan font-bold">moderate</span> based on recent portfolio behavior."
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" size="sm" className="gap-2">
                <FileText size={14} />
                Generate Full Report
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Target size={14} />
                Run Scenario Explorer
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-dark-900/60 border border-white/5 backdrop-blur-sm">
              <p className="text-[10px] uppercase font-bold tracking-wider text-brand-textMuted mb-1">Portfolio Health</p>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-black text-brand-success">86</span>
                <span className="text-sm font-bold text-brand-success/70 mb-1">/ 100</span>
              </div>
              <p className="text-xs text-brand-success font-medium mt-1">Excellent Status</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-dark-900/60 border border-white/5">
                <p className="text-[10px] uppercase font-bold text-brand-textMuted">Daily Change</p>
                <p className="text-sm font-mono font-bold text-brand-success mt-1">+1.24%</p>
              </div>
              <div className="p-3 rounded-xl bg-dark-900/60 border border-white/5">
                <p className="text-[10px] uppercase font-bold text-brand-textMuted">Volatility</p>
                <p className="text-sm font-mono font-bold text-brand-cyan mt-1">12.4%</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <AiExplainabilityPanel 
        title="AI Narrative Context"
        confidence="High"
        dataFreshness="Live"
        dataConsidered={["Portfolio Holdings", "Sector Performance", "30-Day Price History", "Trading Volume"]}
        observedPatterns={[
          "Technology sector allocation is currently at 42%, higher than historical average.",
          "Cash reserves are stable at 15%.",
          "Recent market movements have lowered overall portfolio volatility."
        ]}
        limitations={["Portfolio history older than 1 year is excluded from this summary."]}
        educationalNotes={[
          { term: "Volatility", definition: "A statistical measure of the dispersion of returns for a given security or market index." },
          { term: "Diversification", definition: "A risk management strategy that mixes a wide variety of investments within a portfolio." }
        ]}
        followUpQuestions={["Compare my sectors", "Review my cash allocation", "Explain diversification"]}
      />
    </div>
  );
}

// ── 2. HEALTH SCORE ────────────────────────────────────────────────────────────
function HealthScoreTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      <div className="lg:col-span-1 bg-brand-surfaceElevated rounded-[24px] border border-white/10 p-6 flex flex-col items-center justify-center text-center space-y-4">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-dark-800" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset="39.5" className="text-brand-success drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-white">86</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-success mt-1">Excellent</span>
          </div>
        </div>
        <p className="text-sm text-brand-textMuted leading-relaxed">
          Your portfolio demonstrates strong health across most key metrics. Diversification and liquidity are optimal.
        </p>
      </div>

      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: "Diversification", score: "92/100", status: "Excellent", color: "text-brand-success" },
          { label: "Sector Balance", score: "78/100", status: "Good", color: "text-brand-cyan" },
          { label: "Asset Allocation", score: "85/100", status: "Excellent", color: "text-brand-success" },
          { label: "Liquidity", score: "95/100", status: "Excellent", color: "text-brand-success" },
          { label: "Volatility Control", score: "72/100", status: "Moderate", color: "text-brand-warning" },
          { label: "Concentration", score: "68/100", status: "Needs Review", color: "text-brand-warning" }
        ].map((item, i) => (
          <div key={i} className="bg-brand-surface/50 rounded-xl p-4 border border-white/5 flex items-center justify-between group hover:bg-brand-surfaceElevated transition-colors">
            <div>
              <p className="text-xs font-bold text-white mb-1">{item.label}</p>
              <p className={`text-[10px] uppercase font-bold tracking-wider ${item.color}`}>{item.status}</p>
            </div>
            <div className="text-right">
              <span className="text-sm font-mono font-bold text-white/90">{item.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 3. ALLOCATION ──────────────────────────────────────────────────────────────
function AllocationTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-brand-surfaceElevated rounded-[24px] border border-white/10 p-6 min-h-[300px] flex flex-col justify-center items-center text-center">
           {/* Placeholder for Interactive Chart */}
           <PieChart size={48} className="text-brand-cyan/20 mb-4" />
           <p className="text-sm text-brand-textMuted">Interactive Sector Allocation Chart<br/>(Simulated View)</p>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-sm font-heading font-bold text-white">Top Allocations</h4>
          {[
            { label: 'Technology', value: '42.5%', amount: '$42,500' },
            { label: 'Financials', value: '24.1%', amount: '$24,100' },
            { label: 'Healthcare', value: '18.4%', amount: '$18,400' },
            { label: 'Cash & Equivalents', value: '15.0%', amount: '$15,000' }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-dark-900/40 border border-white/5">
              <span className="text-xs font-medium text-white/80">{item.label}</span>
              <div className="text-right">
                <span className="block text-xs font-mono font-bold text-white">{item.value}</span>
                <span className="block text-[10px] text-brand-textMuted">{item.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 4. RISK & DIVERSIFICATION ──────────────────────────────────────────────────
function RiskDiversificationTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-[24px] bg-brand-warning/5 border border-brand-warning/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-brand-warning/20 flex items-center justify-center text-brand-warning">
              <ShieldAlert size={20} />
            </div>
            <h4 className="text-base font-bold text-white">Risk Observations</h4>
          </div>
          <ul className="space-y-3">
            <li className="text-sm text-white/80 leading-relaxed flex items-start gap-2">
              <span className="text-brand-warning mt-1">•</span>
              <span className="flex-1">Technology sector exposure (42.5%) creates elevated sector concentration risk.</span>
            </li>
            <li className="text-sm text-white/80 leading-relaxed flex items-start gap-2">
              <span className="text-brand-warning mt-1">•</span>
              <span className="flex-1">Portfolio volatility is tracking slightly below market average.</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-[24px] bg-brand-cyan/5 border border-brand-cyan/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan">
              <Layers size={20} />
            </div>
            <h4 className="text-base font-bold text-white">Diversification Analysis</h4>
          </div>
          <ul className="space-y-3">
            <li className="text-sm text-white/80 leading-relaxed flex items-start gap-2">
              <span className="text-brand-cyan mt-1">•</span>
              <span className="flex-1">Asset mix includes Equities, ETFs, and Cash, providing standard structural diversification.</span>
            </li>
            <li className="text-sm text-white/80 leading-relaxed flex items-start gap-2">
              <span className="text-brand-cyan mt-1">•</span>
              <span className="flex-1">Consider reviewing whether current allocation aligns with your personal long-term investment objectives.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ── 5. TIMELINE ────────────────────────────────────────────────────────────────
function TimelineTab() {
  const events = [
    { date: 'Today, 09:30 AM', title: 'Market Open', type: 'info', desc: 'Portfolio marked to market.' },
    { date: 'Yesterday, 14:15 PM', title: 'AI Report Generated', type: 'report', desc: 'Weekly portfolio summary created.' },
    { date: 'Oct 24, 2023', title: 'Allocation Changed', type: 'alert', desc: 'Technology exposure exceeded 40% threshold.' },
    { date: 'Oct 15, 2023', title: 'Asset Added', type: 'trade', desc: 'Bought 50 shares of TSLA.' }
  ];

  return (
    <div className="animate-fade-in p-6 bg-brand-surfaceElevated rounded-[24px] border border-white/10">
      <div className="relative border-l border-white/10 ml-4 space-y-8 pb-4">
        {events.map((event, i) => (
          <div key={i} className="relative pl-6">
            <div className={`absolute -left-[5px] top-1 w-[9px] h-[9px] rounded-full ring-4 ring-brand-surfaceElevated ${
              event.type === 'alert' ? 'bg-brand-warning' : 
              event.type === 'report' ? 'bg-brand-purple' : 'bg-brand-cyan'
            }`} />
            <p className="text-[10px] font-mono text-brand-textMuted uppercase mb-1">{event.date}</p>
            <h5 className="text-sm font-bold text-white">{event.title}</h5>
            <p className="text-xs text-white/60 mt-1">{event.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
