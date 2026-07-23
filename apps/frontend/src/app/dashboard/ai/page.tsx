"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAiStore } from '@/store/useAiStore';
import { Card, CardContent } from '@/components/ui/Card';
import { Bot, Sparkles, Send, Activity, BookOpen, Search } from 'lucide-react';

const SUGGESTED_PROMPTS = [
  {
    icon: <Activity className="text-brand-cyan" size={24} />,
    title: "Market Analysis",
    prompt: "Analyze the current trend of NVDA on the 1D chart. What are the key support and resistance levels?",
    agent: "MARKET_ANALYST"
  },
  {
    icon: <BookOpen className="text-brand-purple" size={24} />,
    title: "Learn Concepts",
    prompt: "Explain how a MACD crossover works and why traders use it, using simple terms.",
    agent: "LEARNING_COACH"
  },
  {
    icon: <Search className="text-brand-success" size={24} />,
    title: "Portfolio Check",
    prompt: "Based on modern portfolio theory, how should I allocate a $100k portfolio for moderate growth?",
    agent: "GENERAL"
  }
];

export default function AiHomePage() {
  const router = useRouter();
  const { createConversation } = useAiStore();
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStartChat = async (prompt: string, agentType: string = 'GENERAL') => {
    if (!prompt.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const id = await createConversation(prompt.substring(0, 30) + '...', agentType);
      router.push(`/dashboard/ai/chat/${id}?initialPrompt=${encodeURIComponent(prompt)}`);
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleStartChat(input);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 max-w-4xl mx-auto w-full">
      
      {/* Welcome Hero */}
      <div className="text-center space-y-6 mb-12">
        <div className="inline-flex items-center justify-center p-4 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-4">
          <Bot size={48} className="text-brand-cyan" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          How can I help you <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">today?</span>
        </h1>
        <p className="text-brand-textMuted text-lg max-w-2xl mx-auto">
          TradeOXX AI is your intelligent financial companion. I can analyze markets, explain complex concepts, and help you build a better portfolio.
        </p>
      </div>

      {/* Suggested Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
        {SUGGESTED_PROMPTS.map((item, i) => (
          <Card 
            key={i} 
            className="bg-white/[0.02] hover:bg-white/[0.05] border-white/5 hover:border-brand-cyan/30 transition-all cursor-pointer group"
            onClick={() => handleStartChat(item.prompt, item.agent)}
          >
            <CardContent className="p-6 flex flex-col h-full gap-4">
              <div className="p-3 bg-white/5 rounded-xl w-fit group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div>
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-brand-textMuted line-clamp-3 leading-relaxed">"{item.prompt}"</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Input Area */}
      <div className="w-full relative">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/20 to-brand-purple/20 blur-xl opacity-50 rounded-2xl pointer-events-none" />
        <div className="relative bg-brand-bgSecondary border border-white/10 focus-within:border-brand-cyan rounded-2xl p-2 shadow-2xl transition-colors">
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about markets, trading, or your portfolio..."
            className="w-full bg-transparent text-white placeholder:text-brand-textMuted resize-none outline-none p-4 min-h-[100px]"
            disabled={isSubmitting}
          />
          <div className="flex justify-between items-center px-2 pb-2">
            <div className="flex items-center gap-2 text-xs text-brand-textMuted">
              <Sparkles size={14} className="text-brand-purple" />
              <span>V1.0 Mock LLM Engine</span>
            </div>
            <button 
              onClick={() => handleStartChat(input)}
              disabled={!input.trim() || isSubmitting}
              className="p-3 bg-brand-cyan hover:bg-brand-cyan/90 disabled:opacity-50 disabled:cursor-not-allowed text-brand-bgPrimary rounded-xl transition-colors flex items-center justify-center"
            >
              <Send size={18} className={isSubmitting ? 'animate-pulse' : ''} />
            </button>
          </div>
        </div>
        <p className="text-center text-xs text-brand-textMuted mt-4">
          TradeOXX AI provides educational information, not financial advice. Always verify important data.
        </p>
      </div>

    </div>
  );
}
