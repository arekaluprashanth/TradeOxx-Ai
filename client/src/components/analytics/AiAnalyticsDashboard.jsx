import React from 'react';
import { 
  CloudSun, 
  Thermometer, 
  Globe2, 
  PieChart, 
  Calendar as CalendarIcon, 
  TrendingUp, 
  TrendingDown, 
  Newspaper, 
  ShieldAlert,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { Button } from '../ui/Button';

/**
 * Volume 4.4.5: AI Analytics & Market Intelligence Dashboard
 * A Bloomberg-Terminal-esque premium intelligence center.
 */
export default function AiAnalyticsDashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* ── 1. AI Executive Summary (Hero) ──────────────────── */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-brand-cyan/20 via-brand-surfaceElevated to-brand-surface border border-white/10 p-6 md:p-10 backdrop-blur-xl shadow-2xl">
        <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20">
              <Sparkles size={14} className="text-brand-cyan" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-cyan">AI Executive Summary</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-heading font-black text-white leading-tight">
              Market Calm <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">
                Technology Leading
              </span>
            </h2>
            
            <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-lg">
              Global markets are displaying moderate volatility with a strong rotation into the Technology and AI sectors. 
              Your portfolio is well-positioned for this movement, though concentration risk is slightly elevated.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="bg-dark-900/60 border border-white/10 rounded-xl p-3 flex-1 min-w-[140px]">
                <p className="text-[10px] text-brand-textMuted uppercase font-bold tracking-wider mb-1 flex items-center gap-1.5"><Thermometer size={12}/> Volatility</p>
                <p className="text-lg font-bold text-brand-warning">Moderate</p>
              </div>
              <div className="bg-dark-900/60 border border-white/10 rounded-xl p-3 flex-1 min-w-[140px]">
                <p className="text-[10px] text-brand-textMuted uppercase font-bold tracking-wider mb-1 flex items-center gap-1.5"><ShieldAlert size={12}/> Portfolio Risk</p>
                <p className="text-lg font-bold text-brand-success">Healthy</p>
              </div>
            </div>
          </div>

          {/* Abstract Weather Visualization */}
          <div className="relative h-full min-h-[250px] flex items-center justify-center">
            <div className="absolute inset-0 bg-brand-cyan/5 blur-3xl rounded-full"></div>
            <CloudSun size={120} className="text-brand-cyan/80 drop-shadow-[0_0_30px_rgba(45,212,191,0.5)] relative z-10" strokeWidth={1} />
            <div className="absolute top-10 right-10 bg-dark-900/80 backdrop-blur-md border border-white/10 p-3 rounded-2xl shadow-xl transform rotate-3">
              <p className="text-[10px] text-brand-textMuted uppercase font-bold mb-1">VIX Index</p>
              <p className="text-sm font-mono font-bold text-white">14.20 <span className="text-brand-success text-[10px]">(-1.2%)</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ── 2. Global Heatmap (Simulated) ───────────────────── */}
        <div className="lg:col-span-2 bg-brand-surfaceElevated rounded-[24px] border border-white/10 p-6 shadow-xl flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
              <Globe2 size={18} className="text-brand-purple" /> Global Heatmap
            </h3>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-dark-900 rounded text-[10px] text-brand-textMuted font-bold uppercase cursor-pointer hover:text-white">Stocks</span>
              <span className="px-2 py-1 bg-dark-900 rounded text-[10px] text-brand-textMuted font-bold uppercase cursor-pointer hover:text-white">Crypto</span>
            </div>
          </div>
          
          <div className="flex-1 bg-dark-900/40 rounded-xl border border-white/5 overflow-hidden grid grid-cols-4 grid-rows-3 gap-1 p-1 min-h-[300px]">
            {/* Heatmap Blocks */}
            <div className="col-span-2 row-span-2 bg-brand-success/20 border border-brand-success/30 rounded-lg flex flex-col justify-center items-center group cursor-pointer hover:bg-brand-success/30 transition-colors">
              <span className="font-bold text-white group-hover:scale-110 transition-transform">AAPL</span>
              <span className="text-xs font-mono text-brand-success">+2.4%</span>
            </div>
            <div className="bg-brand-danger/20 border border-brand-danger/30 rounded-lg flex flex-col justify-center items-center group cursor-pointer hover:bg-brand-danger/30 transition-colors">
              <span className="font-bold text-white text-sm group-hover:scale-110 transition-transform">TSLA</span>
              <span className="text-[10px] font-mono text-brand-danger">-1.2%</span>
            </div>
            <div className="bg-brand-success/40 border border-brand-success/50 rounded-lg flex flex-col justify-center items-center group cursor-pointer hover:bg-brand-success/50 transition-colors">
              <span className="font-bold text-white text-sm group-hover:scale-110 transition-transform">NVDA</span>
              <span className="text-[10px] font-mono text-white">+4.8%</span>
            </div>
            <div className="col-span-2 bg-dark-900/80 border border-white/10 rounded-lg flex flex-col justify-center items-center">
              <span className="font-bold text-white/50 text-sm">Consumer Goods (Neutral)</span>
            </div>
            <div className="bg-brand-success/10 border border-brand-success/20 rounded-lg flex flex-col justify-center items-center">
              <span className="font-bold text-white text-sm">MSFT</span>
            </div>
            <div className="bg-brand-danger/40 border border-brand-danger/50 rounded-lg flex flex-col justify-center items-center">
              <span className="font-bold text-white text-sm">XOM</span>
            </div>
          </div>
        </div>

        {/* ── 3. Sector Analytics ─────────────────────────────── */}
        <div className="bg-brand-surfaceElevated rounded-[24px] border border-white/10 p-6 shadow-xl">
          <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2 mb-6">
            <PieChart size={18} className="text-brand-cyan" /> Sector Leaders
          </h3>
          
          <div className="space-y-4">
            {[
              { name: 'Technology', val: '+3.4%', icon: TrendingUp, color: 'text-brand-success' },
              { name: 'Healthcare', val: '+1.1%', icon: TrendingUp, color: 'text-brand-success' },
              { name: 'Financials', val: '-0.5%', icon: TrendingDown, color: 'text-brand-danger' },
              { name: 'Energy', val: '-1.8%', icon: TrendingDown, color: 'text-brand-danger' }
            ].map(sector => (
              <div key={sector.name} className="flex items-center justify-between p-3 bg-dark-900/60 rounded-xl border border-white/5">
                <span className="text-sm font-bold text-white">{sector.name}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono font-bold ${sector.color}`}>{sector.val}</span>
                  <sector.icon size={14} className={sector.color} />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 rounded-xl bg-brand-cyan/5 border border-brand-cyan/20">
            <p className="text-xs text-brand-cyan/80 leading-relaxed">
              <span className="font-bold text-brand-cyan block mb-1">AI Sector Note</span>
              Capital is rotating out of Energy into Technology, anticipating lower interest rates.
            </p>
          </div>
        </div>

        {/* ── 4. Economic Calendar ────────────────────────────── */}
        <div className="bg-brand-surfaceElevated rounded-[24px] border border-white/10 p-6 shadow-xl">
          <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2 mb-6">
            <CalendarIcon size={18} className="text-brand-warning" /> Economic Calendar
          </h3>
          <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-[19px] before:w-px before:bg-white/10">
            {[
              { time: '08:30', title: 'Core CPI (MoM)', impact: 'High', flag: '🇺🇸' },
              { time: '10:00', title: 'Consumer Sentiment', impact: 'Medium', flag: '🇺🇸' },
              { time: '14:00', title: 'FOMC Minutes', impact: 'High', flag: '🇺🇸' }
            ].map((event, i) => (
              <div key={i} className="flex gap-4 relative">
                <div className="w-10 h-10 rounded-full bg-dark-900 border border-white/10 flex items-center justify-center shrink-0 z-10 text-xs shadow-sm">
                  {event.flag}
                </div>
                <div className="pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-brand-textMuted">{event.time}</span>
                    {event.impact === 'High' && <span className="w-2 h-2 rounded-full bg-brand-danger"></span>}
                    {event.impact === 'Medium' && <span className="w-2 h-2 rounded-full bg-brand-warning"></span>}
                  </div>
                  <h4 className="text-sm font-bold text-white">{event.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 5. Market News Intelligence ─────────────────────── */}
        <div className="lg:col-span-2 bg-brand-surfaceElevated rounded-[24px] border border-white/10 p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
              <Newspaper size={18} className="text-brand-purple" /> News Intelligence
            </h3>
            <Button variant="outline" size="sm" className="text-[10px]">View All</Button>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Central Banks Signal Rate Stability for Q4", source: "Reuters", time: "2h ago", tag: "Economy" },
              { title: "Tech Sector Rallies on Strong AI Adoption Metrics", source: "Bloomberg", time: "3h ago", tag: "Technology" }
            ].map((news, i) => (
              <div key={i} className="p-4 rounded-xl bg-dark-900/60 border border-white/5 hover:border-white/20 transition-all cursor-pointer group flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] text-brand-textMuted uppercase font-bold tracking-wider">{news.source} • {news.time}</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-brand-purple/10 text-brand-purple border border-brand-purple/20">
                      {news.tag}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors leading-relaxed">
                    {news.title}
                  </h4>
                </div>
                <div className="mt-4 flex items-center text-[10px] font-bold text-brand-cyan uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                  Read AI Summary <ArrowUpRight size={12} className="ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
