"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TrendingUp, TrendingDown, Bot, Sparkles, Newspaper, Calendar, ArrowUpRight } from "lucide-react";

export function WelcomeWidget() {
  const { user } = useAuthStore();
  const name = user?.profile?.displayName || "Trader";

  return (
    <Card className="col-span-full md:col-span-8 bg-gradient-to-br from-brand-surfaceElevated to-brand-bgPrimary border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 blur-[100px] rounded-full"></div>
      <CardContent className="p-8 relative z-10 flex flex-col justify-center h-full">
        <h2 className="text-3xl font-bold text-white mb-2">Good morning, {name}.</h2>
        <p className="text-brand-textSecondary text-lg max-w-2xl">
          Markets are showing increased volatility in the tech sector today. 
          Your AI assistant has prepared 3 new insights based on your portfolio.
        </p>
        <div className="mt-6 flex gap-4">
          <button className="px-4 py-2 bg-brand-cyan text-brand-bgPrimary rounded-lg font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2">
            <Sparkles size={16} /> View AI Insights
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export function PortfolioOverviewWidget() {
  return (
    <Card className="col-span-full md:col-span-4 flex flex-col justify-between">
      <CardHeader>
        <CardTitle>Total Balance</CardTitle>
        <CardDescription>Across all connected accounts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-heading font-black text-white mb-2">$124,592.45</div>
        <div className="flex items-center gap-2 text-brand-success font-medium text-sm">
          <TrendingUp size={16} />
          <span>+$2,450.00 (2.1%)</span>
          <span className="text-brand-textMuted ml-1">Today</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function MarketSummaryWidget() {
  const indices = [
    { name: "S&P 500", value: "5,123.41", change: "+0.8%", up: true },
    { name: "NASDAQ", value: "16,245.10", change: "+1.2%", up: true },
    { name: "DOW JONES", value: "38,901.22", change: "-0.2%", up: false },
    { name: "BTC/USD", value: "$64,210.00", change: "+3.4%", up: true },
  ];

  return (
    <Card className="col-span-full md:col-span-6">
      <CardHeader>
        <CardTitle>Market Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {indices.map((idx) => (
            <div key={idx.name} className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="text-sm text-brand-textSecondary mb-1">{idx.name}</div>
              <div className="text-lg font-bold text-white mb-1">{idx.value}</div>
              <div className={`text-xs font-medium flex items-center gap-1 ${idx.up ? 'text-brand-success' : 'text-brand-danger'}`}>
                {idx.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {idx.change}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function AIBriefWidget() {
  return (
    <Card className="col-span-full md:col-span-6 bg-brand-surfaceElevated border-brand-purple/20">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2">
          <Bot size={18} className="text-brand-purple" /> 
          AI Briefing
        </CardTitle>
        <Badge variant="secondary">Updated 10m ago</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 rounded-xl bg-brand-purple/5 border border-brand-purple/10">
          <h4 className="font-bold text-white text-sm mb-1">AAPL Earnings Play</h4>
          <p className="text-brand-textSecondary text-sm">Options market implies a 5.2% move post-earnings. Historical volatility suggests pricing is currently cheap.</p>
        </div>
        <div className="p-4 rounded-xl bg-brand-purple/5 border border-brand-purple/10">
          <h4 className="font-bold text-white text-sm mb-1">Macro: CPI Print</h4>
          <p className="text-brand-textSecondary text-sm">Core CPI expected at 0.3% MoM. A hotter print could negatively impact your long duration bond holdings.</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function NewsWidget() {
  const news = [
    { title: "Federal Reserve signals potential rate cuts by Q3", source: "Bloomberg", time: "2h ago" },
    { title: "Nvidia announces next-generation AI accelerators", source: "Reuters", time: "4h ago" },
    { title: "Oil prices surge amid geopolitical tensions in the Middle East", source: "WSJ", time: "5h ago" },
  ];

  return (
    <Card className="col-span-full md:col-span-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Newspaper size={18} /> Latest News
        </CardTitle>
        <button className="text-sm text-brand-cyan hover:text-brand-blue flex items-center gap-1 transition-colors">
          View All <ArrowUpRight size={14} />
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.map((item, i) => (
            <div key={i} className="group cursor-pointer">
              <h4 className="font-medium text-white group-hover:text-brand-cyan transition-colors line-clamp-1">{item.title}</h4>
              <div className="flex items-center gap-2 text-xs text-brand-textMuted mt-1">
                <span>{item.source}</span>
                <span>•</span>
                <span>{item.time}</span>
              </div>
              {i < news.length - 1 && <div className="h-px bg-white/5 mt-4"></div>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function CalendarWidget() {
  return (
    <Card className="col-span-full md:col-span-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar size={18} /> Economic Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
          <div>
            <div className="text-sm font-bold text-white">US Core CPI (MoM)</div>
            <div className="text-xs text-brand-textMuted">Today, 8:30 AM EST</div>
          </div>
          <Badge variant="destructive">High</Badge>
        </div>
        <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
          <div>
            <div className="text-sm font-bold text-white">Fed Chair Powell Speaks</div>
            <div className="text-xs text-brand-textMuted">Tomorrow, 2:00 PM EST</div>
          </div>
          <Badge variant="destructive">High</Badge>
        </div>
        <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
          <div>
            <div className="text-sm font-bold text-white">Initial Jobless Claims</div>
            <div className="text-xs text-brand-textMuted">Thu, 8:30 AM EST</div>
          </div>
          <Badge variant="warning">Med</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
