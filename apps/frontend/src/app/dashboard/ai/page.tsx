import { Bot } from 'lucide-react';

export default function Page() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
            <div className={`p-2.5 rounded-xl bg-brand-${'purple'}/10 text-brand-${'purple'}`}>
              <Bot size={24} />
            </div>
            AI Assistant
          </h1>
          <p className="text-brand-textSecondary mt-2">Chat with TradeOXX AI for personalized market insights and portfolio advice.</p>
        </div>
        <button className={`px-5 py-2.5 bg-brand-${'purple'} text-brand-bgPrimary font-bold rounded-btn hover:shadow-glow-${'purple'} transition-all`}>
          New Chat
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 min-h-[500px] bg-brand-surface border border-white/5 rounded-card p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-${'purple'} to-transparent opacity-50`}></div>
          <div className={`w-24 h-24 rounded-full bg-brand-${'purple'}/10 flex items-center justify-center mb-6 animate-float`}>
            <Bot size={48} className={`text-brand-${'purple'}`} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">AI Assistant Interface</h2>
          <p className="text-brand-textMuted max-w-md">This section is currently being initialized. We are aggregating real-time data for your personalized experience.</p>
        </div>
        
        <div className="space-y-6">
          <div className="bg-brand-surfaceElevated border border-white/5 rounded-card p-6 shadow-glass">
            <h3 className="font-bold text-white mb-4 flex items-center justify-between">
              Recent Activity
              <span className={`w-2 h-2 rounded-full bg-brand-${'purple'} animate-pulse`}></span>
            </h3>
            <div className="space-y-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className={`w-10 h-10 rounded-lg bg-brand-bgPrimary flex items-center justify-center border border-white/5 group-hover:border-brand-${'purple'}/50 transition-colors`}>
                    <Bot size={16} className={`text-brand-textMuted group-hover:text-brand-${'purple'}`} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">System Update 0{i}</div>
                    <div className="text-xs text-brand-textSecondary">Just now</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
