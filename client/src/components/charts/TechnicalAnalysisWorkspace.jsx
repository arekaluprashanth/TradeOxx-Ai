import React, { useState } from 'react';
import ProfessionalChartEngine from './ProfessionalChartEngine';
import AiExplainabilityPanel from '../dashboard/AiExplainabilityPanel';
import { 
  TrendingUp, 
  Activity, 
  Zap, 
  Target, 
  PenTool, 
  Eye, 
  Layers, 
  Share2, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { Button } from '../ui/Button';

/**
 * Volume 4.4.2 & 4.4.3: Technical Analysis Workspace & AI Chart Intelligence
 * Wraps the professional chart with indicator tools, drawing tools, and AI Pattern detection.
 */
export default function TechnicalAnalysisWorkspace({ symbol = "BTC/USD" }) {
  const [activeTab, setActiveTab] = useState('indicators');
  const [activeIndicators, setActiveIndicators] = useState(['RSI', 'MACD']);
  const [showAiAnalysis, setShowAiAnalysis] = useState(true);

  // Mock AI Chart Explanation data
  const aiExplanationData = {
    overview: "The chart shows increased trading activity compared with recent sessions. Momentum indicators have strengthened while volatility remains moderate.",
    confidence: "High",
    confidenceDetails: "Multiple indicators confirm the momentum shift, supported by strong volume.",
    consideredData: [
      "1D Candlestick Chart (30 Days)",
      "Relative Strength Index (14)",
      "Moving Average Convergence Divergence",
      "Volume Profile"
    ],
    patterns: [
      { name: "Bullish Divergence", description: "RSI formed higher lows while price formed lower lows." },
      { name: "Volume Spike", description: "Trading volume exceeded the 20-day average by 45%." }
    ],
    limitations: [
      "Indicators may produce conflicting signals during choppy, sideways markets.",
      "Historical patterns do not guarantee future continuation."
    ],
    educationalContext: {
      term: "RSI (Relative Strength Index)",
      definition: "A momentum oscillator that measures the speed and change of price movements. Traditionally, an RSI above 70 indicates an overbought condition, while below 30 indicates an oversold condition. However, in strong trends, it can remain in these zones for extended periods."
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 animate-fade-in">
      
      {/* ── Left Column: Chart & Tools ───────────────────────── */}
      <div className="space-y-4 flex flex-col h-full">
        
        {/* Drawing & Indicator Toolbar */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-brand-surfaceElevated border border-white/10 backdrop-blur-xl">
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="gap-2">
              <PenTool size={14} /> Drawings
            </Button>
            <Button variant="secondary" size="sm" className="gap-2">
              <Layers size={14} /> Indicators ({activeIndicators.length})
            </Button>
            <Button variant={showAiAnalysis ? 'primary' : 'secondary'} size="sm" onClick={() => setShowAiAnalysis(!showAiAnalysis)} className="gap-2 bg-brand-gradient text-white border-0 shadow-glow-blue">
              <Sparkles size={14} /> AI Analysis
            </Button>
          </div>
          <div className="flex gap-2 text-brand-textMuted">
            <button className="p-1.5 hover:text-white transition-colors"><Eye size={16} /></button>
            <button className="p-1.5 hover:text-white transition-colors"><Share2 size={16} /></button>
          </div>
        </div>

        {/* The Core Chart Engine */}
        <div className="flex-1 min-h-[500px]">
          <ProfessionalChartEngine symbol={symbol} />
        </div>
      </div>

      {/* ── Right Column: AI Intelligence & Education ────────── */}
      <div className="h-full space-y-6">
        <div className="bg-brand-surface/80 rounded-[24px] border border-white/10 p-5 shadow-2xl backdrop-blur-xl h-full overflow-y-auto">
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center text-brand-purple shadow-glow-purple">
              <Activity size={18} />
            </div>
            <div>
              <h3 className="text-lg font-heading font-black text-white">AI Chart Intelligence</h3>
              <p className="text-[10px] uppercase font-bold tracking-wider text-brand-textMuted">Volume 4.4.3 Engine</p>
            </div>
          </div>

          <div className="flex gap-2 mb-6 bg-dark-900/60 p-1 rounded-xl border border-white/5">
            <button 
              onClick={() => setActiveTab('indicators')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'indicators' ? 'bg-brand-surfaceElevated text-white shadow-sm' : 'text-brand-textMuted hover:text-white'}`}
            >
              Indicators
            </button>
            <button 
              onClick={() => setActiveTab('patterns')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'patterns' ? 'bg-brand-surfaceElevated text-white shadow-sm' : 'text-brand-textMuted hover:text-white'}`}
            >
              Patterns
            </button>
          </div>

          {activeTab === 'indicators' && (
            <div className="space-y-4 mb-6">
              <h4 className="text-sm font-bold text-white mb-2">Active Technicals</h4>
              {activeIndicators.map(ind => (
                <div key={ind} className="p-4 rounded-xl bg-dark-900/40 border border-white/5 hover:border-brand-purple/30 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-brand-purple">{ind}</span>
                    <span className="text-[10px] text-brand-textMuted font-mono">1D Timeframe</span>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed">
                    {ind === 'RSI' ? "Currently reading 62.4. Momentum is bullish but approaching the overbought territory above 70." : "MACD line crossed above the signal line 2 days ago, suggesting a short-term trend reversal."}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'patterns' && (
            <div className="space-y-4 mb-6">
              <h4 className="text-sm font-bold text-white mb-2">AI Detected Patterns</h4>
              {aiExplanationData.patterns.map((pat, i) => (
                <div key={i} className="p-4 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Target size={14} className="text-brand-cyan" />
                    <span className="text-sm font-bold text-brand-cyan">{pat.name}</span>
                  </div>
                  <p className="text-xs text-brand-cyan/80 leading-relaxed">{pat.description}</p>
                </div>
              ))}
            </div>
          )}

          {showAiAnalysis && (
            <AiExplainabilityPanel
              overview={aiExplanationData.overview}
              confidence={aiExplanationData.confidence}
              confidenceDetails={aiExplanationData.confidenceDetails}
              consideredData={aiExplanationData.consideredData}
              limitations={aiExplanationData.limitations}
              educationalContext={aiExplanationData.educationalContext}
            />
          )}
          
        </div>
      </div>

    </div>
  );
}
