import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, VolumeX, ChevronRight } from 'lucide-react';

interface IntroOverlayProps {
  onComplete: () => void;
}

export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        const percent = (video.currentTime / video.duration) * 100;
        setProgress(percent);
      }
    };

    const handleEnded = () => {
      onComplete();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // Fallback timer in case video fails to load or load is extremely slow
    const fallbackTimer = setTimeout(() => {
      onComplete();
    }, 8000);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      clearTimeout(fallbackTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    onComplete();
  };

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] bg-dark-950 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      {!videoError ? (
        <video
          ref={videoRef}
          src="https://assets.mixkit.co/videos/preview/mixkit-flying-through-a-futuristic-digital-tunnel-42797-large.mp4"
          autoPlay
          playsInline
          muted={muted}
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105 pointer-events-none"
          onError={() => setVideoError(true)}
        />
      ) : (
        // Fallback animated background if CDN is blocked / offline
        <div className="absolute inset-0 bg-gradient-to-tr from-dark-950 via-dark-900 to-accent-cyan/10 opacity-30 animate-pulse" />
      )}

      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none" />

      {/* Glowing Vignette */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />

      {/* Logo & Intro Text Content */}
      <div className="relative z-10 text-center px-4 max-w-lg">
        {/* Animated Brand Symbol */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.95, 1.05, 0.95], opacity: 1 }}
          transition={{ 
            scale: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
            opacity: { duration: 1 }
          }}
          className="mx-auto w-24 h-24 rounded-full bg-gradient-to-tr from-accent-cyan/20 to-accent-purple/20 border border-accent-cyan/40 flex items-center justify-center shadow-[0_0_50px_rgba(0,212,255,0.25)] backdrop-blur-md mb-8"
        >
          <svg className="w-12 h-12 text-accent-cyan filter drop-shadow-[0_0_10px_rgba(0,212,255,0.6)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ letterSpacing: '0.1em', opacity: 0 }}
          animate={{ letterSpacing: '0.25em', opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="text-3xl sm:text-4xl font-black uppercase text-gradient mb-3"
        >
          TradeOxx Ai
        </motion.h1>

        {/* Brand Tagline */}
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xs sm:text-sm text-dark-300 uppercase tracking-widest font-semibold"
        >
          AI-Powered Quantitative Trading Simulator
        </motion.p>
      </div>

      {/* Control Actions / Overlay Bar */}
      <div className="absolute bottom-12 left-0 right-0 z-10 px-8 sm:px-16 flex items-center justify-between">
        {/* Audio Toggle */}
        <button
          onClick={() => setMuted(!muted)}
          className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-accent-cyan text-white hover:text-accent-cyan transition-all backdrop-blur-md"
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        {/* Loading Progress Bar */}
        <div className="flex-1 max-w-md mx-8 h-1 bg-white/5 rounded-full overflow-hidden relative border border-white/5 hidden sm:block">
          <motion.div 
            className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-accent-cyan to-accent-purple shadow-[0_0_10px_rgba(0,212,255,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-accent-cyan text-dark-950 font-bold text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,212,255,0.4)]"
        >
          Skip Intro
          <ChevronRight size={14} />
        </button>
      </div>
    </motion.div>
  );
}
