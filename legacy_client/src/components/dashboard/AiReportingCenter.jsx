import { useState } from 'react';
import { 
  FileText, 
  Sun, 
  Moon, 
  TrendingUp, 
  Globe, 
  BookOpen, 
  Download, 
  Share2, 
  Calendar,
  AlertCircle,
  Newspaper
} from 'lucide-react';
import { Button } from '../ui/Button';

/**
 * Volume 4.3.5: AI REPORTING SYSTEM
 * Mission: Automatically transform market info, portfolio activity, and preferences
 * into personalized, educational reports.
 */
export default function AiReportingCenter() {
  const [activeReport, setActiveReport] = useState('morning');

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* ── 1. REPORT HERO & SELECTOR ───────────────────────── */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-brand-cyan/20 via-brand-surfaceElevated to-brand-surface border border-white/10 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between">
          <div className="space-y-4 max-w-xl">
            <div>
              <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-cyan mb-1">AI Intelligence Center</p>
              <h2 className="text-3xl font-heading font-black text-white">Smart Briefings</h2>
            </div>
            <p className="text-sm text-brand-textMuted leading-relaxed">
              Personalized market intelligence reports summarizing global movements, portfolio impacts, and educational insights. Not financial advice.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-2">
              <Button 
                variant={activeReport === 'morning' ? 'primary' : 'outline'} 
                onClick={() => setActiveReport('morning')}
                className="gap-2"
              >
                <Sun size={14} /> Morning Brief
              </Button>
              <Button 
                variant={activeReport === 'evening' ? 'primary' : 'outline'} 
                onClick={() => setActiveReport('evening')}
                className="gap-2"
              >
                <Moon size={14} /> Evening Wrap-up
              </Button>
              <Button 
                variant={activeReport === 'portfolio' ? 'primary' : 'outline'} 
                onClick={() => setActiveReport('portfolio')}
                className="gap-2"
              >
                <BriefcaseIcon size={14} /> Portfolio Review
              </Button>
            </div>
          </div>
          
          <div className="flex md:flex-col gap-3 shrink-0">
            <Button variant="secondary" className="gap-2 w-full justify-start">
              <Download size={14} /> Export PDF
            </Button>
            <Button variant="secondary" className="gap-2 w-full justify-start">
              <Share2 size={14} /> Share Report
            </Button>
          </div>
        </div>
      </div>

      {/* ── 2. ACTIVE REPORT CONTENT ────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
        
        {/* Main Column */}
        <div className="space-y-6">
          {/* Today's Brief */}
          <div className="bg-brand-surfaceElevated rounded-[24px] border border-white/10 p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-brand-cyan/20 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan">
                {activeReport === 'morning' ? <Sun size={18} /> : <FileText size={18} />}
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-white">
                  {activeReport === 'morning' ? "Good Morning" : "Executive Summary"}
                </h3>
                <p className="text-xs text-brand-textMuted font-mono uppercase">Oct 24, 2023 • 09:00 AM</p>
              </div>
            </div>
            
            <div className="prose prose-invert prose-sm max-w-none space-y-4">
              <p className="text-white/80 leading-relaxed text-[15px]">
                Global markets are opening higher today following strong economic data out of Asia. 
                Technology and Financial sectors are leading the pre-market activity. 
                Your portfolio's heavy weighting in Tech suggests higher-than-average exposure to today's early volatility.
              </p>
              <div className="p-4 rounded-xl bg-brand-cyan/5 border border-brand-cyan/20">
                <h4 className="text-sm font-bold text-brand-cyan mb-2 flex items-center gap-2">
                  <TrendingUp size={16} /> Market Mood: Optimistic
                </h4>
                <p className="text-xs text-brand-cyan/80 m-0">
                  Sentiment indicators are showing 88% bullish alignment across major tracking indices.
                </p>
              </div>
            </div>
          </div>

          {/* News Intelligence */}
          <div className="bg-brand-surfaceElevated rounded-[24px] border border-white/10 p-6 shadow-xl">
            <h3 className="text-base font-heading font-bold text-white flex items-center gap-2 mb-4">
              <Newspaper size={18} className="text-brand-purple" /> News Intelligence
            </h3>
            <div className="space-y-4">
              {[
                { source: "Bloomberg", time: "2h ago", title: "Tech Sector Rallies on AI Adoption Metrics", tag: "Technology" },
                { source: "Reuters", time: "4h ago", title: "Central Banks Signal Rate Stability", tag: "Economy" },
              ].map((news, i) => (
                <div key={i} className="p-4 rounded-xl bg-dark-900/40 border border-white/5 hover:border-white/20 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] uppercase font-bold text-brand-textMuted">{news.source} • {news.time}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border border-brand-purple/20 text-brand-purple bg-brand-purple/10">
                      {news.tag}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-white group-hover:text-brand-cyan transition-colors">{news.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          
          {/* Economic Calendar */}
          <div className="bg-brand-surfaceElevated rounded-[24px] border border-white/10 p-6 shadow-xl">
            <h3 className="text-base font-heading font-bold text-white flex items-center gap-2 mb-4">
              <Calendar size={18} className="text-brand-warning" /> Upcoming Events
            </h3>
            <div className="space-y-3">
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 rounded-lg bg-dark-900 flex flex-col items-center justify-center border border-white/5">
                  <span className="text-[10px] text-brand-textMuted uppercase font-bold">Today</span>
                  <span className="text-sm font-mono font-bold text-white">10:00</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Consumer Confidence</p>
                  <p className="text-[10px] text-brand-warning font-mono uppercase mt-0.5">High Impact</p>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Corner */}
          <div className="bg-gradient-to-b from-brand-purple/10 to-brand-surfaceElevated rounded-[24px] border border-brand-purple/20 p-6 shadow-xl">
            <h3 className="text-base font-heading font-bold text-white flex items-center gap-2 mb-4">
              <BookOpen size={18} className="text-brand-purple" /> Learning Corner
            </h3>
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-brand-purple">Sector Rotation</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                The movement of money from one industry sector to another as investors anticipate changes in the economic cycle. 
                Currently, we are observing a shift towards defensive sectors.
              </p>
            </div>
          </div>

          {/* Smart Recommendations */}
          <div className="bg-brand-surfaceElevated rounded-[24px] border border-white/10 p-6 shadow-xl">
            <h3 className="text-base font-heading font-bold text-white flex items-center gap-2 mb-4">
              <AlertCircle size={18} className="text-brand-cyan" /> Suggested Review
            </h3>
            <ul className="space-y-3">
              <li className="text-xs text-white/80 flex items-start gap-2">
                <span className="text-brand-cyan">•</span>
                Compare your current allocation with last month's report.
              </li>
              <li className="text-xs text-white/80 flex items-start gap-2">
                <span className="text-brand-cyan">•</span>
                Explore how interest rates influence market liquidity.
              </li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
}

function BriefcaseIcon(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
}
