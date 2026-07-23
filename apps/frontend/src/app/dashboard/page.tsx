"use client";

import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { 
  WelcomeWidget, 
  PortfolioOverviewWidget, 
  MarketSummaryWidget, 
  AIBriefWidget, 
  NewsWidget,
  CalendarWidget 
} from "@/components/dashboard/Widgets";
import { WelcomeChecklist } from "@/components/onboarding/WelcomeChecklist";

export default function DashboardPage() {
  const { widgets } = useWorkspaceStore();
  
  // Convert array to a map for easy lookup
  const widgetVisibility = widgets.reduce((acc, widget) => {
    acc[widget.id] = widget.visible;
    return acc;
  }, {} as Record<string, boolean>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Command Center</h1>
        <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
          Customize Layout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">
        {widgetVisibility['welcome'] && <WelcomeWidget />}
        
        {widgetVisibility['portfolio'] && <PortfolioOverviewWidget />}
        {widgetVisibility['market'] && <MarketSummaryWidget />}
        
        {widgetVisibility['ai-brief'] && <AIBriefWidget />}
        
        {widgetVisibility['news'] && <NewsWidget />}
        <CalendarWidget />
      </div>
      
      <WelcomeChecklist />
    </div>
  );
}
