import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, KeyRound, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function OtpModal({ isOpen, onClose, onVerify, title = "Secure Action Verification", methodText = "your registered mobile and email" }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(120);
  const [sentCode, setSentCode] = useState('');

  // Send/Generate simulated OTP code on mount
  useEffect(() => {
    if (isOpen) {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setSentCode(code);
      setTimer(120);
      setOtp(['', '', '', '', '', '']);
      
      // Notify user via simulated SMS/Email popup toast
      setTimeout(() => {
        toast((t) => (
          <span className="flex flex-col gap-1">
            <strong className="text-xs text-accent-cyan flex items-center gap-1 font-bold">
              <Sparkles size={12} /> OTP SIMULATOR GATEWAY
            </strong>
            <span className="text-[10px] text-dark-300">
              Simulated OTP code sent to your mobile & email:
            </span>
            <strong className="text-lg font-mono tracking-widest text-white mt-1 text-center bg-dark-950/80 p-2.5 rounded-xl border border-white/5">
              {code}
            </strong>
          </span>
        ), {
          duration: 8000,
          id: 'otp-simulation-toast'
        });
      }, 500);
    }
  }, [isOpen]);

  // Countdown timer logic
  useEffect(() => {
    if (!isOpen || timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, timer]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next field
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleVerify = () => {
    const enteredCode = otp.join('');
    if (enteredCode.length !== 6) {
      toast.error('Please enter the full 6-digit OTP.');
      return;
    }

    if (enteredCode === sentCode) {
      toast.success('Identity verified successfully!');
      onVerify();
      onClose();
    } else {
      toast.error('Invalid OTP verification code. Please check the simulated toast code and try again.');
    }
  };

  const handleResend = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setSentCode(code);
    setTimer(120);
    setOtp(['', '', '', '', '', '']);
    toast.success(`Resent simulated OTP code to ${methodText}!`);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-sm bg-dark-900 border border-white/10 rounded-3xl overflow-hidden shadow-glow-cyan p-6 text-center space-y-6"
        >
          {/* Top Lock Icon */}
          <div className="mx-auto w-12 h-12 rounded-2xl bg-accent-cyan/15 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan">
            <KeyRound size={22} className="animate-pulse" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="text-xs text-dark-300">
              For security, we sent a 6-digit verification code to <span className="text-accent-cyan font-semibold">{methodText}</span>.
            </p>
          </div>

          {/* OTP Fields */}
          <div className="flex gap-2 justify-center">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-input-${idx}`}
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-10 h-12 text-center text-lg font-mono font-bold bg-dark-950 border border-white/10 focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/20 rounded-xl outline-none text-white transition-all"
              />
            ))}
          </div>

          {/* Timer Display */}
          <div className="text-[11px] text-dark-400">
            {timer > 0 ? (
              <span>Code expires in <strong className="font-mono text-white font-bold">{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</strong></span>
            ) : (
              <button onClick={handleResend} className="text-accent-cyan font-bold hover:underline">
                Resend Code
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleVerify}
              className="w-full bg-accent-cyan text-dark-955 py-3 rounded-xl text-xs font-black uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all flex items-center justify-center gap-2"
            >
              Verify & Confirm Action
            </button>
            <button onClick={onClose} className="text-xs text-dark-400 hover:text-white font-bold transition-colors">
              Cancel Transaction
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
