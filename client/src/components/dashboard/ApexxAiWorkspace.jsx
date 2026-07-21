import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Sparkles,
  Send,
  Mic,
  Paperclip,
  X,
  Bot,
  User,
  ShieldCheck,
  Globe,
  TrendingUp,
  MessageSquare,
  ChevronRight,
  Plus,
  RefreshCcw,
  Zap,
  Info,
  Copy,
  Check
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function ApexxAiWorkspace({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Welcome to Apexx AI Intelligence Workspace 2.0. I am your real-time quantitative analyst. How can I assist your market analysis today?",
      time: "Just now",
      suggestions: ["Summarize US Tech Market Flow", "Review Portfolio Volatility Risk", "Explain RSI & MACD Divergence"]
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingStep, setThinkingStep] = useState('Idle');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  if (!isOpen) return null;

  const handleSend = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    // User Message
    const userMsg = { id: Date.now(), sender: 'user', text: query, time: 'Just now' };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsThinking(true);
    setThinkingStep('Analyzing Order Flow & Multi-Market Feeds...');

    setTimeout(() => {
      setThinkingStep('Computing Value-at-Risk (VaR) & Volatility Metrics...');
    }, 1000);

    setTimeout(() => {
      setIsThinking(false);
      let aiResponse = "Quantitative analysis indicates strong institutional order flow velocity across major tech indexes. Key support levels remain intact above 50-day moving averages.";
      
      if (query.toLowerCase().includes('portfolio') || query.toLowerCase().includes('risk')) {
        aiResponse = "Portfolio Risk Audit: Your asset allocation shows an 85/100 diversification score with a daily Value-at-Risk (95% VaR) of $1,850. Beta sensitivity remains conservative at 0.84.";
      } else if (query.toLowerCase().includes('rsi') || query.toLowerCase().includes('indicator')) {
        aiResponse = "Technical Analysis: Relative Strength Index (RSI 14) is currently printing 64.2 (Bullish momentum). MACD exhibits a positive histogram crossover, indicating sustained upward pressure.";
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: aiResponse,
          time: 'Just now',
          suggestions: ["Compare with Benchmark Index", "Export Analysis PDF", "Set Price Alert"]
        }
      ]);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-dark-950/90 backdrop-blur-2xl flex flex-col font-sans text-white animate-fade-in">
      
      {/* ── TOP NAVIGATION BAR ────────────────────────────────────── */}
      <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between bg-dark-950/90 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-cyan/20 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan shadow-glow-cyan">
            <Cpu size={20} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-heading font-black tracking-tight">Apexx AI Intelligence Workspace</h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                v2.0 ENTERPRISE
              </span>
            </div>
            <p className="text-[11px] text-brand-textMuted">Sub-Millisecond Neural Order Flow & Market Analytics</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-brand-success font-bold">
            <span className="w-2 h-2 rounded-full bg-brand-success animate-ping" />
            CORE ACTIVE
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 text-brand-textMuted hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* ── MAIN WORKSPACE BODY ──────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar Drawer */}
        <div className="hidden lg:flex w-72 border-r border-white/10 p-4 flex-col justify-between bg-dark-950/60">
          <div className="space-y-4">
            <button
              onClick={() => {
                setMessages([{
                  id: Date.now(),
                  sender: 'ai',
                  text: "New session initialized. Ask Apexx AI anything about live market flow or portfolio risk.",
                  time: "Just now",
                  suggestions: ["Summarize US Tech Market Flow", "Review Portfolio Volatility Risk"]
                }]);
                toast.success('Started new conversation');
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan font-heading font-bold text-xs uppercase hover:bg-brand-cyan/25 transition-all cursor-pointer shadow-glow-cyan"
            >
              <Plus size={16} />
              New Conversation
            </button>

            <div className="space-y-2">
              <p className="text-[10px] font-heading font-bold text-brand-textMuted uppercase tracking-wider px-2">Prompt Templates</p>
              {[
                "Market Flow Briefing",
                "Portfolio Risk Audit",
                "Technical Indicator Analysis",
                "Volatility & VaR Estimate"
              ].map((template, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(template)}
                  className="w-full p-2.5 rounded-xl bg-brand-surface/60 hover:bg-brand-surfaceElevated border border-white/5 text-left text-xs text-brand-textSecondary hover:text-white transition-all truncate cursor-pointer"
                >
                  {template}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-brand-surface/40 border border-white/5 text-[11px] text-brand-textMuted space-y-1">
            <p className="font-bold text-white flex items-center gap-1">
              <ShieldCheck size={14} className="text-brand-success" />
              AI Safety & Compliance
            </p>
            <p className="text-[10px] leading-relaxed">
              AI analysis is informational and educational. Market decisions involve risk.
            </p>
          </div>
        </div>

        {/* Main Conversation Feed */}
        <div className="flex-1 flex flex-col justify-between p-4 sm:p-6 overflow-y-auto space-y-6">
          
          <div className="max-w-3xl mx-auto w-full space-y-6 flex-1">
            
            {/* Signature Animated AI Breathing Core */}
            <div className="py-6 text-center space-y-3">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-blue blur-xl opacity-60 animate-pulse" />
                <div className="w-16 h-16 rounded-full bg-dark-900 border border-white/20 flex items-center justify-center text-brand-cyan relative z-10 shadow-2xl">
                  <Sparkles size={28} className="animate-spin-slow" />
                </div>
              </div>
              <p className="text-xs font-mono text-brand-cyan uppercase tracking-widest font-bold">Apexx Neural Core Online</p>
            </div>

            {/* Messages List */}
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-brand-purple/20 border border-brand-purple/40 text-brand-purple' : 'bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan'}`}>
                  {msg.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
                </div>

                <div className={`max-w-xl space-y-3 p-4 sm:p-5 rounded-2xl backdrop-blur-xl border ${msg.sender === 'user' ? 'bg-brand-purple/15 border-brand-purple/30 text-white' : 'bg-brand-surface/80 border-white/10 text-brand-textSecondary'}`}>
                  <p className="text-xs leading-relaxed">{msg.text}</p>
                  
                  {msg.suggestions && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                      {msg.suggestions.map((sug, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(sug)}
                          className="px-3 py-1 rounded-full bg-white/5 hover:bg-brand-cyan/20 border border-white/10 hover:border-brand-cyan/40 text-[11px] text-brand-cyan font-bold transition-all cursor-pointer"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Thinking Indicator */}
            {isThinking && (
              <div className="flex gap-4 items-center p-4 rounded-2xl bg-brand-surface/50 border border-brand-cyan/20 max-w-md">
                <RefreshCcw size={16} className="text-brand-cyan animate-spin" />
                <span className="text-xs font-mono text-brand-cyan font-bold animate-pulse">{thinkingStep}</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Bottom Prompt Composer */}
          <div className="max-w-3xl mx-auto w-full pt-4">
            <div className="relative bg-brand-surface/90 border border-white/15 rounded-2xl p-2 backdrop-blur-2xl shadow-2xl flex items-center gap-2">
              <button
                onClick={() => toast.info('Voice input feature activated')}
                className="p-2.5 rounded-xl bg-dark-900 text-brand-textMuted hover:text-brand-cyan transition-colors"
                title="Voice Input"
              >
                <Mic size={18} />
              </button>
              
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Apexx AI anything about live market flow, tickers, or portfolio..."
                className="w-full bg-transparent border-none text-xs text-white placeholder:text-brand-textMuted focus:outline-none px-2"
              />

              <button
                onClick={() => handleSend()}
                className="p-2.5 rounded-xl bg-brand-gradient text-white font-bold hover:scale-105 transition-all cursor-pointer shrink-0 shadow-glow-blue"
              >
                <Send size={16} />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
