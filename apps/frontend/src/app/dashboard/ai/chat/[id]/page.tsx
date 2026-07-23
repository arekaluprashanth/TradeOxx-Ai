"use client";

import { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useAiStore } from '@/store/useAiStore';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Bot, User, Send, StopCircle, RefreshCw } from 'lucide-react';

export default function AiChatPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const initialPrompt = searchParams.get('initialPrompt');

  const { activeConversation, fetchConversation, sendMessage, isStreaming } = useAiStore();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    fetchConversation(id);
  }, [id, fetchConversation]);

  // Handle initial prompt from the AI Home page
  useEffect(() => {
    if (activeConversation && initialPrompt && !initialized.current) {
      initialized.current = true;
      // Small timeout to ensure state is settled before sending
      setTimeout(() => {
        sendMessage(id, initialPrompt, activeConversation.agentType);
      }, 500);
    }
  }, [activeConversation, initialPrompt, id, sendMessage]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages, isStreaming]);

  const handleSend = () => {
    if (!input.trim() || isStreaming || !activeConversation) return;
    sendMessage(id, input, activeConversation.agentType);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!activeConversation) {
    return (
      <div className="h-full flex items-center justify-center">
        <RefreshCw className="animate-spin text-brand-cyan" size={32} />
      </div>
    );
  }

  // Filter out SYSTEM messages for the UI
  const displayMessages = activeConversation.messages.filter(m => m.role !== 'SYSTEM');

  return (
    <div className="flex flex-col h-full relative max-w-4xl mx-auto w-full">
      
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-brand-bgPrimary/80 backdrop-blur-md z-10">
        <div>
          <h2 className="font-bold text-white">{activeConversation.title}</h2>
          <p className="text-xs text-brand-textMuted uppercase tracking-wider">{activeConversation.agentType.replace('_', ' ')} AGENT</p>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth">
        {displayMessages.map((msg, i) => {
          const isAi = msg.role === 'AI';
          return (
            <div key={msg.id || i} className={`flex gap-4 md:gap-6 ${isAi ? '' : 'flex-row-reverse'}`}>
              
              {/* Avatar */}
              <div className={`w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center mt-1 ${isAi ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'bg-white/10 text-white'}`}>
                {isAi ? <Bot size={20} /> : <User size={20} />}
              </div>

              {/* Message Content */}
              <div className={`flex flex-col ${isAi ? 'max-w-[85%]' : 'max-w-[75%] items-end'}`}>
                <div className={`text-xs font-bold mb-1.5 ${isAi ? 'text-brand-textSecondary' : 'text-white/50'}`}>
                  {isAi ? 'TradeOXX AI' : 'You'}
                </div>
                <div 
                  className={`prose prose-invert max-w-none text-sm md:text-base leading-relaxed ${
                    isAi 
                      ? 'prose-p:text-brand-textSecondary prose-headings:text-white prose-strong:text-white prose-a:text-brand-cyan prose-code:text-brand-purple prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-white/10' 
                      : 'bg-brand-cyan/10 text-white px-5 py-3 rounded-2xl rounded-tr-sm border border-brand-cyan/20'
                  }`}
                >
                  {isAi ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content || '...'}
                    </ReactMarkdown>
                  ) : (
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {isStreaming && (
          <div className="flex gap-4 md:gap-6">
            <div className="w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center mt-1 bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
              <Bot size={20} className="animate-pulse" />
            </div>
            <div className="flex items-center gap-1 mt-4">
              <div className="w-2 h-2 bg-brand-cyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-brand-cyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-brand-cyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-8 pt-0 z-10">
        <div className="relative bg-brand-bgSecondary border border-white/10 focus-within:border-brand-cyan rounded-2xl p-2 shadow-2xl transition-colors">
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="w-full bg-transparent text-white placeholder:text-brand-textMuted resize-none outline-none p-4 min-h-[60px] max-h-[200px]"
            disabled={isStreaming}
            rows={1}
          />
          <div className="flex justify-between items-center px-2 pb-1">
            <div className="text-xs text-brand-textMuted flex items-center gap-2">
              <span className="hidden md:inline">Shift + Enter for new line</span>
            </div>
            {isStreaming ? (
              <button 
                disabled
                className="p-2.5 bg-brand-danger/20 text-brand-danger rounded-xl flex items-center justify-center"
              >
                <StopCircle size={18} />
              </button>
            ) : (
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-2.5 bg-brand-cyan hover:bg-brand-cyan/90 disabled:opacity-50 disabled:cursor-not-allowed text-brand-bgPrimary rounded-xl transition-colors flex items-center justify-center"
              >
                <Send size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
