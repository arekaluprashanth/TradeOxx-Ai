"use client";

import { useState } from 'react';
import { CheckCircle2, Circle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function WelcomeChecklist() {
  const [isVisible, setIsVisible] = useState(true);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Connect a Portfolio', completed: true },
    { id: 2, title: 'Analyze a stock chart', completed: false },
    { id: 3, title: 'Ask the AI Assistant a question', completed: false },
    { id: 4, title: 'Complete your first lesson', completed: false },
  ]);

  const progress = (tasks.filter(t => t.completed).length / tasks.length) * 100;
  const isAllDone = progress === 100;

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed bottom-6 right-6 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden"
      >
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-800/50">
          <h3 className="font-semibold text-white">Getting Started</h3>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{Math.round(progress)}% Complete</span>
              <span>{tasks.filter(t => t.completed).length} of {tasks.length}</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            {tasks.map(task => (
              <div key={task.id} className="flex items-start space-x-3 group">
                <button 
                  onClick={() => setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t))}
                  className="mt-0.5 focus:outline-none"
                >
                  {task.completed ? (
                    <CheckCircle2 size={18} className="text-emerald-500" />
                  ) : (
                    <Circle size={18} className="text-slate-500 group-hover:text-amber-500 transition-colors" />
                  )}
                </button>
                <span className={`text-sm transition-colors ${task.completed ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                  {task.title}
                </span>
              </div>
            ))}
          </div>

          {isAllDone && (
            <div className="mt-6 p-3 bg-emerald-950/30 border border-emerald-500/20 rounded-lg text-center">
              <span className="text-emerald-400 text-sm font-medium">🎉 You're all set!</span>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
