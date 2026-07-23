"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Bot, Sparkles, TrendingUp, AlertTriangle } from 'lucide-react';

interface AIAnalysisPanelProps {
  symbol: string;
}

export function AIAnalysisPanel({ symbol }: AIAnalysisPanelProps) {
  return (
    <div className="space-y-4 h-full flex flex-col">
      <Card className="bg-gradient-to-b from-brand-cyan/10 to-transparent border-brand-cyan/20 flex-1">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-brand-cyan">
            <Bot size={20} />
            AI Market Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="space-y-2">
            <h4 className="flex items-center gap-2 text-sm font-bold text-white">
              <Sparkles size={16} className="text-brand-purple" />
              Technical Summary
            </h4>
            <p className="text-sm text-brand-textMuted leading-relaxed">
              Based on the 1D timeframe, {symbol} is currently showing a strong bullish divergence on the MACD. 
              The price has recently crossed above its 50-day SMA, suggesting a potential shift in momentum.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="flex items-center gap-2 text-sm font-bold text-white">
              <TrendingUp size={16} className="text-brand-success" />
              Trend & Volatility
            </h4>
            <ul className="text-sm text-brand-textMuted space-y-1 ml-6 list-disc marker:text-brand-success">
              <li><strong>Trend:</strong> Upward (Short-term)</li>
              <li><strong>Volatility:</strong> Low (ATR is contracting)</li>
              <li><strong>RSI (14):</strong> 58 (Neutral/Bullish)</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-brand-warning/10 border border-brand-warning/20">
            <h4 className="flex items-center gap-2 text-sm font-bold text-brand-warning mb-2">
              <AlertTriangle size={16} />
              Educational Note
            </h4>
            <p className="text-xs text-brand-warning/80 leading-relaxed">
              This analysis is based on historical mathematical indicators and does not predict future performance. 
              Markets are highly unpredictable. Always combine technical analysis with fundamental research.
            </p>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
