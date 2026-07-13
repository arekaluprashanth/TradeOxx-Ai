import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, HardDrive, Wifi } from 'lucide-react';

interface LoadingOverlayProps {
  onComplete?: () => void;
}

export default function LoadingOverlay({ onComplete }: LoadingOverlayProps) {
  const [percent, setPercent] = useState(0);
  const [activeLog, setActiveLog] = useState(0);

  const logs = [
    { text: 'Booting TradeOxx AI cores...', icon: <Cpu className="text-accent-cyan" size={14} /> },
    { text: 'Establishing secure websocket handshake...', icon: <Wifi className="text-accent-purple" size={14} /> },
    { text: 'Fetching encrypted portfolio records...', icon: <HardDrive className="text-accent-green" size={14} /> },
    { text: 'Loading quantitative telemetry indicators...', icon: <ShieldCheck className="text-accent-blue" size={14} /> }
  ];

  useEffect(() => {
    // Increment percent quickly
    const timer = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 80);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    // Cycle telemetry logs based on percentage progress
    if (percent < 25) setActiveLog(0);
    else if (percent < 55) setActiveLog(1);
    else if (percent < 80) setActiveLog(2);
    else setActiveLog(3);
  }, [percent]);

  const boundedPercent = Math.min(percent, 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      className="fixed inset-0 z-[9999] bg-dark-950/95 backdrop-blur-xl flex flex-col items-center justify-center"
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-25" />

      {/* Holographic Loader Container */}
      <div className="relative flex flex-col items-center max-w-sm w-full px-6">
        
        {/* Holographic Spinner Ring */}
        <div className="relative w-36 h-36 mb-8 flex items-center justify-center">
          {/* Animated Outer Orbit Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-dashed border-accent-cyan/30"
          />
          {/* Inner Glowing Spin Circle */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2 rounded-full border-2 border-t-accent-purple border-r-transparent border-b-accent-cyan border-l-transparent shadow-[0_0_15px_rgba(168,85,247,0.3)]"
          />
          
          {/* Central Percent Number */}
          <div className="flex flex-col items-center">
            <span className="text-3xl font-black font-mono text-white tracking-tighter">
              {boundedPercent}%
            </span>
            <span className="text-[9px] text-accent-cyan font-bold tracking-widest uppercase">
              SYNCING
            </span>
          </div>
        </div>

        {/* Telemetry Log Status Card */}
        <div className="w-full bg-dark-905 border border-white/5 rounded-2xl p-4 shadow-2xl relative overflow-hidden backdrop-blur-md">
          <div className="flex items-center justify-between mb-3 text-[10px] text-dark-400 font-bold uppercase tracking-wider border-b border-white/5 pb-2">
            <span>System Telemetry</span>
            <span className="text-accent-cyan animate-pulse">Online</span>
          </div>
          
          <div className="flex items-start gap-3 h-8 items-center">
            <motion.div
              key={activeLog}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center gap-2.5 text-xs text-white"
            >
              <div className="p-1.5 rounded-lg bg-dark-800 border border-white/5 flex items-center justify-center shrink-0">
                {logs[activeLog].icon}
              </div>
              <span className="font-medium text-dark-100">{logs[activeLog].text}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
