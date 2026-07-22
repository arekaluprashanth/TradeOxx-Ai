import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Github, 
  ShieldCheck, 
  Fingerprint, 
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0E14] relative overflow-hidden p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-cyan/20 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[150px] mix-blend-screen opacity-50 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] opacity-20 z-0"></div>

      {/* Authentication Container */}
      <div className="w-full max-w-[1000px] bg-brand-surfaceElevated/40 backdrop-blur-3xl border border-white/10 rounded-[32px] shadow-2xl relative z-10 flex flex-col md:flex-row overflow-hidden animate-fade-in">
        
        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center relative">
          
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={24} className="text-brand-cyan" />
              <span className="font-heading font-black text-white text-xl tracking-wide">TradeOXX AI</span>
            </div>
            <h1 className="text-3xl font-heading font-black text-white mb-2">
              {isLogin ? 'Welcome back' : 'Create your workspace'}
            </h1>
            <p className="text-brand-textMuted text-sm">
              {isLogin 
                ? 'Enter your credentials to access your financial intelligence.' 
                : 'Join the next generation of algorithmic trading and portfolio management.'}
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="flex flex-col gap-3 mb-8">
            <button className="w-full py-3 px-4 bg-dark-900/60 hover:bg-dark-900/80 border border-white/5 hover:border-white/20 rounded-xl flex items-center justify-center gap-3 text-sm font-bold text-white transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
            <button className="w-full py-3 px-4 bg-dark-900/60 hover:bg-dark-900/80 border border-white/5 hover:border-white/20 rounded-xl flex items-center justify-center gap-3 text-sm font-bold text-white transition-all">
              <Github size={20} />
              Continue with GitHub
            </button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-white/10 flex-1"></div>
            <span className="text-xs text-brand-textMuted uppercase font-bold tracking-wider">Or continue with email</span>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-brand-textMuted block mb-1.5 ml-1">Full Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-dark-900/50 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-brand-cyan/50 transition-colors"
                  />
                </div>
              </div>
            )}
            
            <div>
              <label className="text-[10px] uppercase font-bold tracking-wider text-brand-textMuted block mb-1.5 ml-1">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" 
                  className="w-full bg-dark-900/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-brand-cyan/50 transition-colors"
                />
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-textMuted" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5 ml-1 mr-1">
                <label className="text-[10px] uppercase font-bold tracking-wider text-brand-textMuted block">Password</label>
                {isLogin && (
                  <button type="button" className="text-[10px] font-bold text-brand-cyan hover:text-brand-cyan/80 transition-colors">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-dark-900/50 border border-white/10 rounded-xl py-3 pl-11 pr-11 text-sm text-white focus:outline-none focus:border-brand-cyan/50 transition-colors"
                />
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-textMuted" />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-textMuted hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" variant="primary" className="w-full justify-center gap-2">
                {isLogin ? 'Sign In to Workspace' : 'Create Account'} <ArrowRight size={16} />
              </Button>
            </div>
          </form>

          <p className="text-center text-xs text-brand-textMuted mt-8">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-brand-cyan font-bold hover:underline"
            >
              {isLogin ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </div>

        {/* Right Side: Showcase */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-dark-900 to-[#05070a] p-12 flex-col justify-between relative border-l border-white/5">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.03]"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-success/10 border border-brand-success/20 text-brand-success text-xs font-bold mb-6">
              <ShieldCheck size={14} /> Enterprise-Grade Security
            </div>
            <h2 className="text-3xl font-heading font-black text-white leading-tight mb-4">
              Your financial data, <br />secured by AI.
            </h2>
            <p className="text-brand-textMuted text-sm leading-relaxed max-w-sm">
              TradeOXX AI employs state-of-the-art encryption, biometric passkeys, and behavioral analysis to protect your identity and portfolio.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="bg-brand-surfaceElevated/80 border border-white/10 rounded-2xl p-4 flex items-center gap-4 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                <Fingerprint size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Biometric Ready</h4>
                <p className="text-xs text-brand-textMuted">Support for Passkeys and WebAuthn.</p>
              </div>
            </div>
            <div className="bg-brand-surfaceElevated/80 border border-white/10 rounded-2xl p-4 flex items-center gap-4 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-brand-purple/20 flex items-center justify-center text-brand-purple">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">SOC2 Compliant Architecture</h4>
                <p className="text-xs text-brand-textMuted">End-to-end encryption for all trades.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
