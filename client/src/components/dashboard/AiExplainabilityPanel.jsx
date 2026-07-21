import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrainCircuit, 
  Database, 
  LineChart, 
  AlertTriangle, 
  Clock, 
  Lightbulb, 
  HelpCircle,
  ChevronDown,
  Info,
  ShieldAlert,
  Activity,
  FileText
} from 'lucide-react';

/**
 * Volume 4.3.4: AI REASONING & EXPLAINABILITY ENGINE
 * Mission: Present clear, user-friendly explanations of what information the AI considered, 
 * why it generated an analysis, limitations, and confidence.
 */
export default function AiExplainabilityPanel({ 
  title = "AI Reasoning & Context",
  dataConsidered = [],
  observedPatterns = [],
  confidence = "Moderate", 
  dataFreshness = "Live",
  limitations = [],
  educationalNotes = [],
  followUpQuestions = [],
  defaultExpanded = false
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const getConfidenceColor = (level) => {
    switch (level.toLowerCase()) {
      case 'high': return 'text-brand-success bg-brand-success/10 border-brand-success/20';
      case 'moderate': return 'text-brand-cyan bg-brand-cyan/10 border-brand-cyan/20';
      case 'limited': return 'text-brand-warning bg-brand-warning/10 border-brand-warning/20';
      default: return 'text-brand-textMuted bg-dark-800 border-white/5';
    }
  };

  const getFreshnessColor = (status) => {
    switch (status.toLowerCase()) {
      case 'live': return 'text-brand-success';
      case 'delayed': return 'text-brand-warning';
      case 'historical': return 'text-brand-purple';
      case 'demo': return 'text-brand-cyan';
      default: return 'text-brand-textMuted';
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-brand-surface/60 backdrop-blur-md overflow-hidden transition-all duration-300">
      
      {/* Header Toggle */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-brand-surfaceElevated/40 hover:bg-brand-surfaceElevated/80 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple shadow-glow-purple">
            <BrainCircuit size={16} />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-heading font-bold text-white">{title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${getConfidenceColor(confidence)}`}>
                {confidence} Confidence
              </span>
              <span className="text-[10px] text-brand-textMuted flex items-center gap-1">
                <Clock size={10} className={getFreshnessColor(dataFreshness)} />
                {dataFreshness} Data
              </span>
            </div>
          </div>
        </div>
        <ChevronDown size={18} className={`text-brand-textMuted transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
      </button>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="p-4 sm:p-5 space-y-6 border-t border-white/5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Data Considered */}
                <div className="space-y-3">
                  <h5 className="text-xs uppercase font-heading font-bold text-brand-textMuted flex items-center gap-2 tracking-wider">
                    <Database size={14} className="text-brand-cyan" />
                    Data Considered
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {dataConsidered.map((item, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md bg-dark-800/80 border border-white/5 text-[11px] text-brand-textMuted font-mono">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Observed Patterns */}
                <div className="space-y-3">
                  <h5 className="text-xs uppercase font-heading font-bold text-brand-textMuted flex items-center gap-2 tracking-wider">
                    <Activity size={14} className="text-brand-success" />
                    Observed Patterns
                  </h5>
                  <ul className="space-y-2">
                    {observedPatterns.map((pattern, idx) => (
                      <li key={idx} className="text-xs text-white/90 flex items-start gap-2 leading-relaxed">
                        <span className="text-brand-success mt-0.5">•</span>
                        {pattern}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Confidence & Limitations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-dark-800/50 border border-white/5 space-y-2">
                  <h5 className="text-[11px] uppercase font-heading font-bold text-brand-textMuted flex items-center gap-1.5 tracking-wider">
                    <ShieldAlert size={12} />
                    Confidence Context
                  </h5>
                  <p className="text-[11px] text-white/70 leading-relaxed">
                    Confidence reflects the AI's certainty in its explanation based on available information. It does <strong className="text-white">NOT</strong> represent certainty about future market outcomes.
                  </p>
                </div>
                
                <div className="p-3.5 rounded-xl bg-brand-warning/5 border border-brand-warning/10 space-y-2">
                  <h5 className="text-[11px] uppercase font-heading font-bold text-brand-warning flex items-center gap-1.5 tracking-wider">
                    <AlertTriangle size={12} />
                    Limitations
                  </h5>
                  <ul className="space-y-1">
                    {limitations.map((limit, idx) => (
                      <li key={idx} className="text-[11px] text-brand-warning/80 flex items-start gap-1.5">
                        <span className="mt-0.5">-</span> {limit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Educational Notes */}
              {educationalNotes && educationalNotes.length > 0 && (
                <div className="space-y-3">
                  <h5 className="text-xs uppercase font-heading font-bold text-brand-purple flex items-center gap-2 tracking-wider">
                    <Lightbulb size={14} />
                    Educational Notes
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {educationalNotes.map((note, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-brand-purple/5 border border-brand-purple/10">
                        <h6 className="text-[11px] font-bold text-white mb-1">{note.term}</h6>
                        <p className="text-[11px] text-white/70 leading-relaxed">{note.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Follow Up Questions */}
              {followUpQuestions && followUpQuestions.length > 0 && (
                <div className="pt-4 border-t border-white/5">
                  <h5 className="text-[10px] uppercase font-heading font-bold text-brand-textMuted flex items-center gap-1.5 tracking-wider mb-3">
                    <HelpCircle size={12} />
                    Suggested Follow-up
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {followUpQuestions.map((q, idx) => (
                      <button key={idx} className="px-3 py-1.5 rounded-full bg-brand-surfaceElevated border border-white/10 text-[11px] text-brand-cyan hover:bg-brand-cyan/10 hover:border-brand-cyan/30 transition-colors whitespace-nowrap">
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <div className="p-3 rounded-lg bg-dark-900 border border-white/5 flex items-start gap-2">
                <Info size={14} className="text-brand-textMuted shrink-0 mt-0.5" />
                <p className="text-[10px] text-brand-textMuted leading-relaxed">
                  <strong className="text-white/80 font-medium">Transparency Notice:</strong> AI-generated analysis is informational and should not be interpreted as financial advice. Financial markets involve risk. Please verify important information independently.
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
