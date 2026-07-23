"use client";

import { useEffect } from 'react';
import { useNewsStore } from '@/store/useNewsStore';
import { Card, CardContent } from '@/components/ui/Card';
import { Newspaper, TrendingUp, AlertCircle, Bookmark } from 'lucide-react';

export default function NewsIntelligencePage() {
  const { news, fetchNews, isLoading } = useNewsStore();

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-black text-white tracking-tight">News Intelligence</h1>
        <p className="text-brand-textMuted text-lg max-w-2xl">
          Curated market summaries and economic events powered by TradeOXX AI.
        </p>
      </div>

      {/* Featured News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <div className="col-span-3 text-center text-brand-textMuted p-12">Loading intelligence...</div>
        ) : (
          news.map((article, i) => (
            <Card 
              key={article.id} 
              className={`bg-brand-surfaceElevated border-white/5 overflow-hidden flex flex-col group ${i === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}
            >
              <CardContent className="p-6 md:p-8 flex flex-col h-full gap-6 relative">
                
                {/* Background Glow */}
                <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none transition-opacity group-hover:opacity-40 ${
                  article.sentiment === 'BULLISH' ? 'bg-brand-success' : 
                  article.sentiment === 'BEARISH' ? 'bg-brand-danger' : 
                  'bg-brand-cyan'
                }`} />

                {/* Meta */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex gap-2">
                    {article.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-white/5 text-brand-textSecondary rounded text-xs font-bold uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="text-brand-textMuted hover:text-white transition-colors">
                    <Bookmark size={18} />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 z-10">
                  <h2 className={`${i === 0 ? 'text-3xl' : 'text-2xl'} font-bold text-white mb-4 group-hover:text-brand-cyan transition-colors`}>
                    {article.title}
                  </h2>
                  <p className={`text-brand-textMuted leading-relaxed ${i === 0 ? 'text-lg' : 'text-base'}`}>
                    {article.summary}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto z-10">
                  <div className="flex items-center gap-2 text-sm text-brand-textSecondary">
                    <Newspaper size={16} />
                    <span>{article.source}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {article.sentiment === 'BULLISH' && <TrendingUp size={16} className="text-brand-success" />}
                    {article.sentiment === 'BEARISH' && <AlertCircle size={16} className="text-brand-danger" />}
                    <span className={`text-xs font-bold ${
                      article.sentiment === 'BULLISH' ? 'text-brand-success' : 
                      article.sentiment === 'BEARISH' ? 'text-brand-danger' : 
                      'text-brand-textMuted'
                    }`}>
                      {article.sentiment}
                    </span>
                  </div>
                </div>

              </CardContent>
            </Card>
          ))
        )}
      </div>

    </div>
  );
}
