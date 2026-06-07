import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, LogIn, ShieldCheck, ArrowLeft, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

// ── Floating Particle ──────────────────────────────────

interface ParticleConfig {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const ParticleField: React.FC = () => {
  const particles: ParticleConfig[] = useMemo(() => {
    const colors = [
      'rgba(0, 212, 255, 0.3)',
      'rgba(168, 85, 247, 0.3)',
      'rgba(16, 185, 129, 0.2)',
      'rgba(0, 212, 255, 0.15)',
    ];
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      color: colors[i % colors.length],
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
          }}
          animate={{
            y: [0, -80, -160, -80, 0],
            x: [0, 30, -20, 40, 0],
            opacity: [0, 1, 0.6, 1, 0],
            scale: [0.5, 1, 0.8, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floating orbs */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-20"
        style={{ background: 'radial-gradient(circle, #00d4ff, transparent)', left: '10%', top: '20%' }}
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full blur-[120px] opacity-15"
        style={{ background: 'radial-gradient(circle, #a855f7, transparent)', right: '10%', bottom: '20%' }}
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

// ── OTP Code Input ─────────────────────────────────────

interface CodeInputProps {
  length: number;
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

const CodeInput: React.FC<CodeInputProps> = ({ length, value, onChange, error }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.split('').concat(Array(length).fill('')).slice(0, length);

  const handleChange = (index: number, char: string) => {
    if (!/^\d?$/.test(char)) return;
    const arr = digits.slice();
    arr[index] = char;
    const newVal = arr.join('');
    onChange(newVal);
    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    onChange(pasted);
    const focusIdx = Math.min(pasted.length, length - 1);
    inputRefs.current[focusIdx]?.focus();
  };

  return (
    <div>
      <label className="block text-xs font-medium text-dark-300 mb-2">
        Verification Code
      </label>
      <div className="flex gap-2 justify-center">
        {Array.from({ length }, (_, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digits[i] || ''}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            className={`w-11 h-12 text-center text-lg font-bold rounded-xl border
              bg-dark-900/60 text-white outline-none transition-all duration-200
              focus:ring-2 focus:ring-accent-cyan/50 focus:border-accent-cyan
              ${error ? 'border-accent-red/50' : 'border-white/10 hover:border-white/20'}`}
          />
        ))}
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-accent-red text-center">{error}</p>
      )}
    </div>
  );
};

// ── Login Page ─────────────────────────────────────────

type Step = 'credentials' | 'verify';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [step, setStep] = useState<Step>('credentials');
  const [errors, setErrors] = useState<{ email?: string; password?: string; code?: string }>({});
  const [sendingCode, setSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  // Countdown timer for resend
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const validateCredentials = (): boolean => {
    const e: typeof errors = {};
    if (!email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Invalid email address';
    if (!password) e.password = 'Password is required';
    else if (password.length < 4) e.password = 'Password too short';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const generateAndSendCode = () => {
    const newCode = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedCode(newCode);
    setCode('');
    setCountdown(60);

    // Show the code via toast (demo mode — no real email server)
    toast.success(
      `Verification code sent to ${email}`,
      { duration: 4000, icon: '📧' }
    );
    // Show code in a separate persistent toast for demo
    toast(
      `Your code: ${newCode}`,
      {
        duration: 30000,
        icon: '🔑',
        style: {
          background: '#1a1f36',
          color: '#00d4ff',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          fontWeight: 600,
          fontSize: '14px',
          letterSpacing: '2px',
        },
      }
    );
  };

  const handleSendCode = async () => {
    if (!validateCredentials()) return;
    setSendingCode(true);

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));
    generateAndSendCode();
    setStep('verify');
    setSendingCode(false);
  };

  const handleVerifyAndLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (code.length < 6) {
      setErrors({ code: 'Please enter the 6-digit code' });
      return;
    }
    if (code !== generatedCode) {
      setErrors({ code: 'Invalid code. Please try again.' });
      return;
    }

    setErrors({});
    try {
      await login(email, password);
      navigate('/');
    } catch {
      // Error handled by store
    }
  };

  const handleResend = () => {
    if (countdown > 0) return;
    generateAndSendCode();
  };

  const handleBack = () => {
    setStep('credentials');
    setCode('');
    setErrors({});
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}hero-bg.png)` }}
      />
      <div className="absolute inset-0 bg-dark-950/85" />
      <div className="absolute inset-0 bg-auth" />
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Particles */}
      <ParticleField />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md px-4"
      >
        {/* Card */}
        <div className="bg-dark-800/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-glass">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <motion.img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="TradeSphere"
              className="w-14 h-14 mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            />
            <h1 className="text-2xl font-bold text-gradient mb-1">
              TradeSphere AI
            </h1>
            <p className="text-dark-400 text-sm">
              {step === 'credentials' ? 'Welcome back, trader' : 'Enter verification code'}
            </p>
          </div>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4 p-3 rounded-xl bg-accent-red/10 border border-accent-red/20 text-accent-red text-xs text-center"
            >
              {error}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {/* ── Step 1: Email + Password ─────────────── */}
            {step === 'credentials' && (
              <motion.div
                key="credentials"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <form onSubmit={(e) => { e.preventDefault(); handleSendCode(); }} className="space-y-4">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    icon={<Mail className="w-4 h-4" />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    autoComplete="email"
                  />

                  <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    icon={<Lock className="w-4 h-4" />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    autoComplete="current-password"
                  />

                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      className="text-xs text-dark-400 hover:text-accent-cyan transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    loading={sendingCode}
                    icon={<Send className="w-4 h-4" />}
                  >
                    Send Verification Code
                  </Button>
                </form>
              </motion.div>
            )}

            {/* ── Step 2: Verification Code ───────────── */}
            {step === 'verify' && (
              <motion.div
                key="verify"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
              >
                <form onSubmit={handleVerifyAndLogin} className="space-y-5">
                  {/* Email display */}
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-dark-900/60 border border-white/5">
                    <Mail className="w-4 h-4 text-accent-cyan flex-shrink-0" />
                    <span className="text-xs text-dark-300 truncate">{email}</span>
                    <button
                      type="button"
                      onClick={handleBack}
                      className="ml-auto text-xs text-dark-400 hover:text-accent-cyan transition-colors flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      Change
                    </button>
                  </div>

                  {/* Instruction */}
                  <div className="text-center">
                    <ShieldCheck className="w-10 h-10 text-accent-cyan mx-auto mb-2 opacity-80" />
                    <p className="text-xs text-dark-400">
                      We sent a 6-digit code to your email.
                      <br />
                      Enter it below to sign in.
                    </p>
                  </div>

                  {/* Code input */}
                  <CodeInput
                    length={6}
                    value={code}
                    onChange={(val) => { setCode(val); setErrors({}); }}
                    error={errors.code}
                  />

                  {/* Resend */}
                  <div className="text-center">
                    {countdown > 0 ? (
                      <span className="text-xs text-dark-500">
                        Resend code in <span className="text-accent-cyan font-medium">{countdown}s</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResend}
                        className="text-xs text-accent-cyan hover:text-accent-cyan/80 font-medium transition-colors"
                      >
                        Resend Code
                      </button>
                    )}
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    loading={isLoading}
                    icon={<LogIn className="w-4 h-4" />}
                  >
                    Verify & Sign In
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sign up link */}
          <p className="mt-6 text-center text-xs text-dark-400">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-accent-cyan hover:text-accent-cyan/80 font-medium transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-[11px] text-dark-500">
          © 2026 TradeSphere AI · Paper Trading Simulator
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
