"use client";

import { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Download, Printer, Share2 } from 'lucide-react';
import { Report } from '@/store/useReportStore';

export default function ReportViewer({ report }: { report: Report }) {
  const reportRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    // We rely on standard window.print() + global CSS @media print
    window.print();
  };

  return (
    <div className="relative group">
      
      {/* Floating Action Bar (Hidden when printing) */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity print:hidden">
        <button 
          onClick={handlePrint}
          className="p-2.5 bg-brand-surfaceElevated hover:bg-brand-cyan/20 border border-white/10 hover:border-brand-cyan/30 text-brand-textMuted hover:text-brand-cyan rounded-xl transition-all shadow-xl"
          title="Export as PDF"
        >
          <Download size={18} />
        </button>
        <button 
          onClick={handlePrint}
          className="p-2.5 bg-brand-surfaceElevated hover:bg-white/10 border border-white/10 text-brand-textMuted hover:text-white rounded-xl transition-all shadow-xl"
          title="Print Report"
        >
          <Printer size={18} />
        </button>
        <button className="p-2.5 bg-brand-surfaceElevated hover:bg-white/10 border border-white/10 text-brand-textMuted hover:text-white rounded-xl transition-all shadow-xl">
          <Share2 size={18} />
        </button>
      </div>

      {/* Report Document */}
      <div 
        ref={reportRef}
        className="bg-brand-surface border border-white/5 p-8 md:p-12 rounded-3xl min-h-[500px] shadow-2xl relative overflow-hidden print:bg-white print:text-black print:border-none print:shadow-none print:p-0"
      >
        {/* Subtle Watermark (Hidden when printing) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] font-black text-white/[0.02] pointer-events-none select-none print:hidden">
          TradeOXX
        </div>

        <div className="relative z-10">
          <div className="mb-12 pb-6 border-b border-white/10 print:border-black/20">
            <h1 className="text-3xl md:text-4xl font-black text-white print:text-black tracking-tight mb-4">
              {report.title}
            </h1>
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className="px-3 py-1 bg-brand-purple/20 text-brand-purple print:bg-gray-100 print:text-gray-600 rounded-lg uppercase tracking-wider">
                {report.type}
              </span>
              <span className="text-brand-textMuted print:text-gray-500">
                Generated {new Date(report.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-brand-cyan print:prose-p:text-black print:prose-headings:text-black print:prose-strong:text-black">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {report.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
