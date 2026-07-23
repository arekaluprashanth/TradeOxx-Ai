"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Sparkles, Building, Briefcase, Activity } from "lucide-react";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [experience, setExperience] = useState("");
  const [interests, setInterests] = useState<string[]>([]);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);
  
  const toggleInterest = (id: string) => {
    setInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleComplete = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bgPrimary overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/10 blur-[150px] rounded-full"></div>
      
      <div className="max-w-2xl w-full p-6 relative z-10">
        <div className="mb-12 flex justify-between items-center">
          <div className="text-2xl font-heading font-black text-white">
            TradeOXX <span className="text-brand-cyan">AI</span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`h-1.5 w-12 rounded-full transition-colors duration-500 ${step >= i ? 'bg-brand-cyan' : 'bg-white/10'}`}
              ></div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-brand-surfaceElevated border border-white/10 p-10 rounded-3xl"
            >
              <h1 className="text-3xl font-bold text-white mb-4">Welcome to TradeOXX AI.</h1>
              <p className="text-brand-textSecondary mb-8 text-lg">Let's customize your intelligence engine. What is your primary experience level with investing?</p>
              
              <div className="space-y-4">
                {[
                  { id: "beginner", icon: Building, title: "Beginner", desc: "Just starting out, looking to learn." },
                  { id: "intermediate", icon: Briefcase, title: "Intermediate", desc: "I manage my own portfolio regularly." },
                  { id: "advanced", icon: Activity, title: "Advanced", desc: "I trade actively and use complex instruments." }
                ].map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setExperience(level.id)}
                    className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all text-left ${
                      experience === level.id 
                        ? 'bg-brand-cyan/10 border-brand-cyan' 
                        : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${experience === level.id ? 'bg-brand-cyan text-brand-bgPrimary' : 'bg-white/10 text-white'}`}>
                      <level.icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">{level.title}</h3>
                      <p className="text-brand-textMuted text-sm">{level.desc}</p>
                    </div>
                    {experience === level.id && <Check className="ml-auto text-brand-cyan" size={20} />}
                  </button>
                ))}
              </div>

              <div className="mt-10 flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={!experience}
                  className="px-8 py-3 bg-white text-brand-bgPrimary rounded-full font-bold flex items-center gap-2 disabled:opacity-50 hover:bg-brand-cyan hover:text-white transition-all"
                >
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-brand-surfaceElevated border border-white/10 p-10 rounded-3xl"
            >
              <h1 className="text-3xl font-bold text-white mb-4">What interests you?</h1>
              <p className="text-brand-textSecondary mb-8 text-lg">Select the markets and topics you want AI insights on.</p>
              
              <div className="grid grid-cols-2 gap-4">
                {["Technology", "Crypto", "Real Estate", "Healthcare", "Energy", "Finance", "Global Macro", "Options"].map((topic) => (
                  <button
                    key={topic}
                    onClick={() => toggleInterest(topic)}
                    className={`p-4 rounded-xl border transition-all text-left font-medium ${
                      interests.includes(topic)
                        ? 'bg-brand-purple/20 border-brand-purple text-white'
                        : 'bg-white/5 border-white/10 text-brand-textSecondary hover:border-white/20'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>

              <div className="mt-10 flex justify-between">
                <button onClick={handleBack} className="px-6 py-3 text-brand-textSecondary hover:text-white flex items-center gap-2">
                  <ArrowLeft size={18} /> Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={interests.length === 0}
                  className="px-8 py-3 bg-white text-brand-bgPrimary rounded-full font-bold flex items-center gap-2 disabled:opacity-50 hover:bg-brand-cyan hover:text-white transition-all"
                >
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-brand-surfaceElevated border border-white/10 p-10 rounded-3xl text-center"
            >
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-brand-cyan to-brand-blue rounded-full flex items-center justify-center mb-6 text-white shadow-glow-cyan animate-pulse">
                <Sparkles size={32} />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">You're all set!</h1>
              <p className="text-brand-textSecondary mb-10 text-lg">Your intelligence engine is configured and ready to go.</p>
              
              <button
                onClick={handleComplete}
                className="w-full py-4 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple text-white rounded-xl font-bold text-lg hover:shadow-glow-purple transition-all"
              >
                Go to Dashboard
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
