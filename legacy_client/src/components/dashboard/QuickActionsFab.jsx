import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Plus,
  X,
  AreaChart,
  DollarSign,
  FileText,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function QuickActionsFab({ onOpenAiChat }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Analyze Active Asset',
      icon: AreaChart,
      color: 'text-brand-cyan',
      onClick: () => {
        setIsOpen(false);
        const el = document.getElementById('charts');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      label: 'Ask Apexx AI Assistant',
      icon: MessageSquare,
      color: 'text-brand-purple',
      onClick: () => {
        setIsOpen(false);
        if (onOpenAiChat) onOpenAiChat();
      }
    },
    {
      label: 'Deposit Cash',
      icon: DollarSign,
      color: 'text-brand-success',
      onClick: () => {
        setIsOpen(false);
        navigate('/deposit');
      }
    },
  ];

  return (
    <div className="fixed bottom-10 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            className="mb-3 space-y-2 flex flex-col items-end"
          >
            {actions.map((act, idx) => {
              const Icon = act.icon;
              return (
                <button
                  key={idx}
                  onClick={act.onClick}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-brand-surfaceElevated border border-white/10 hover:border-brand-cyan/40 text-xs font-heading font-bold text-white shadow-2xl backdrop-blur-xl transition-all hover:scale-105 cursor-pointer"
                >
                  <span>{act.label}</span>
                  <div className={`w-7 h-7 rounded-xl bg-dark-900 flex items-center justify-center ${act.color}`}>
                    <Icon size={16} />
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 rounded-full bg-brand-gradient text-white flex items-center justify-center shadow-glow-blue hover:scale-110 active:scale-95 transition-all cursor-pointer border border-white/20"
        title="Quick Actions (FAB)"
      >
        {isOpen ? <X size={22} /> : <Zap size={22} className="animate-pulse" />}
      </button>
    </div>
  );
}
