"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Notebook, Bookmark, Folder, Search, Plus, FileText, ChevronRight } from 'lucide-react';

export default function NotebookPage() {
  const [activeTab, setActiveTab] = useState<'NOTES' | 'BOOKMARKS'>('NOTES');

  return (
    <div className="h-full flex flex-col md:flex-row max-w-7xl mx-auto w-full">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 border-r border-white/5 p-6 flex flex-col gap-6 bg-brand-bgSecondary/50">
        <h2 className="text-xl font-bold text-white tracking-tight">Knowledge</h2>
        
        <div className="flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('NOTES')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'NOTES' ? 'bg-brand-cyan/10 text-brand-cyan' : 'hover:bg-white/5 text-brand-textSecondary hover:text-white'
            }`}
          >
            <Notebook size={18} />
            <span className="font-medium">My Notes</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('BOOKMARKS')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'BOOKMARKS' ? 'bg-brand-purple/10 text-brand-purple' : 'hover:bg-white/5 text-brand-textSecondary hover:text-white'
            }`}
          >
            <Bookmark size={18} />
            <span className="font-medium">Bookmarks</span>
          </button>
        </div>

        <div className="pt-6 border-t border-white/5">
          <div className="text-xs font-bold text-brand-textMuted uppercase tracking-wider mb-3 px-4">Folders</div>
          <button className="flex items-center gap-3 px-4 py-2 w-full text-brand-textSecondary hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <Folder size={16} />
            <span className="text-sm">Trading Strategy</span>
          </button>
          <button className="flex items-center gap-3 px-4 py-2 w-full text-brand-textSecondary hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <Folder size={16} />
            <span className="text-sm">Tax Planning</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full bg-brand-bgPrimary relative overflow-hidden">
        
        {/* Header */}
        <div className="p-8 pb-4 flex items-center justify-between border-b border-white/5 z-10">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-textMuted" size={18} />
            <input 
              type="text" 
              placeholder={`Search ${activeTab.toLowerCase()}...`}
              className="w-full bg-brand-surfaceElevated border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-brand-textMuted focus:outline-none focus:border-brand-cyan/50"
            />
          </div>
          <button className="p-2.5 bg-brand-cyan text-brand-bgPrimary hover:bg-brand-cyan/90 rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Plus size={20} />
          </button>
        </div>

        {/* Content Feed */}
        <div className="flex-1 overflow-y-auto p-8 space-y-4">
          
          {activeTab === 'NOTES' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mock Note */}
              <Card className="bg-brand-surface border-white/5 hover:border-brand-cyan/30 cursor-pointer transition-all group">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-cyan transition-colors">Options Strategy - Iron Condor</h3>
                  <p className="text-sm text-brand-textMuted line-clamp-3 mb-4">
                    Remember to close the short legs if the underlying price approaches the breakeven points before expiration to avoid assignment risk...
                  </p>
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-brand-textSecondary">Oct 12, 2026</span>
                    <span className="px-2 py-1 bg-white/5 rounded text-brand-textMuted">Trading Strategy</span>
                  </div>
                </CardContent>
              </Card>
              
              <div className="h-full min-h-[200px] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-brand-textMuted hover:border-brand-cyan/30 hover:text-brand-cyan cursor-pointer transition-colors bg-white/[0.01]">
                <Plus size={32} className="mb-2" />
                <span className="font-medium">Create New Note</span>
              </div>
            </div>
          )}

          {activeTab === 'BOOKMARKS' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-brand-surface border border-white/5 hover:border-brand-purple/30 rounded-2xl cursor-pointer group transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-brand-purple/10 text-brand-purple rounded-xl">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium group-hover:text-brand-purple transition-colors">Q3 Portfolio Performance Analysis</h3>
                    <span className="text-xs text-brand-textMuted">REPORT • Saved 2 days ago</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-brand-textMuted group-hover:text-white" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-brand-surface border border-white/5 hover:border-brand-cyan/30 rounded-2xl cursor-pointer group transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-brand-cyan/10 text-brand-cyan rounded-xl">
                    <Notebook size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium group-hover:text-brand-cyan transition-colors">Support and Resistance</h3>
                    <span className="text-xs text-brand-textMuted">LESSON • Saved 5 days ago</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-brand-textMuted group-hover:text-white" />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
