"use client";

import { useEffect, useState } from 'react';
import { useReportStore } from '@/store/useReportStore';
import ReportViewer from '@/components/reports/ReportViewer';
import { FileText, Plus, Search, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export default function ReportsPage() {
  const { reports, fetchReports, generateReport, isLoading } = useReportStore();
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleGenerateMockReport = async () => {
    setIsGenerating(true);
    // Simulate user generating a new Portfolio Report
    const report = await generateReport('Q3 Portfolio Performance Analysis', 'PORTFOLIO');
    if (report) setSelectedReportId(report.id);
    setIsGenerating(false);
  };

  const selectedReport = reports.find(r => r.id === selectedReportId);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 flex flex-col md:flex-row gap-8">
      
      {/* Left Sidebar: Report List */}
      <div className="w-full md:w-1/3 flex flex-col gap-6 h-[calc(100vh-8rem)]">
        
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-white tracking-tight">Reports</h1>
          <button 
            onClick={handleGenerateMockReport}
            disabled={isGenerating}
            className="p-2 bg-brand-cyan/10 hover:bg-brand-cyan/20 text-brand-cyan rounded-lg transition-colors disabled:opacity-50"
            title="Generate New Report"
          >
            {isGenerating ? <div className="w-5 h-5 border-2 border-brand-cyan border-t-transparent rounded-full animate-spin" /> : <Plus size={20} />}
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-textMuted" size={16} />
            <input 
              type="text" 
              placeholder="Search reports..."
              className="w-full bg-brand-surfaceElevated border border-white/5 rounded-xl py-2 pl-9 pr-4 text-sm text-white placeholder:text-brand-textMuted focus:outline-none focus:border-brand-cyan/50"
            />
          </div>
          <button className="p-2 bg-brand-surfaceElevated border border-white/5 rounded-xl text-brand-textMuted hover:text-white transition-colors">
            <Filter size={18} />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
          {isLoading ? (
            <div className="text-brand-textMuted text-center py-8">Loading reports...</div>
          ) : reports.length === 0 ? (
            <div className="text-brand-textMuted text-center py-8 text-sm">No reports found. Generate one to get started.</div>
          ) : (
            reports.map(report => (
              <Card 
                key={report.id}
                onClick={() => setSelectedReportId(report.id)}
                className={`cursor-pointer transition-all ${selectedReportId === report.id ? 'bg-brand-cyan/5 border-brand-cyan/30' : 'bg-brand-surface border-white/5 hover:border-white/20'}`}
              >
                <CardContent className="p-4 flex gap-4">
                  <div className={`p-3 rounded-xl flex-shrink-0 flex items-center justify-center ${
                    report.type === 'PORTFOLIO' ? 'bg-brand-blue/10 text-brand-blue' :
                    report.type === 'MARKET' ? 'bg-brand-success/10 text-brand-success' :
                    'bg-brand-purple/10 text-brand-purple'
                  }`}>
                    <FileText size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-sm truncate mb-1">{report.title}</h3>
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-brand-textMuted">{new Date(report.createdAt).toLocaleDateString()}</span>
                      <span className="text-brand-textMuted uppercase tracking-wider">{report.type}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Right Content: Report Viewer */}
      <div className="w-full md:w-2/3 h-full">
        {selectedReport ? (
          <ReportViewer report={selectedReport} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-brand-textMuted border border-dashed border-white/10 rounded-3xl p-12 bg-brand-surface/30">
            <FileText size={48} className="mb-4 opacity-50" />
            <p className="text-lg font-medium text-white mb-2">No Report Selected</p>
            <p className="text-sm">Select a report from the sidebar or generate a new one.</p>
          </div>
        )}
      </div>

    </div>
  );
}
