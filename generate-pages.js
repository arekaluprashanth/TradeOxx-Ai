const fs = require('fs');
const path = require('path');

function createPage(filepath, title, icon, desc, color, btnText) {
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    const content = `import { ${icon} } from 'lucide-react';

export default function Page() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
            <div className={\`p-2.5 rounded-xl bg-brand-\${'${color}'}/10 text-brand-\${'${color}'}\`}>
              <${icon} size={24} />
            </div>
            ${title}
          </h1>
          <p className="text-brand-textSecondary mt-2">${desc}</p>
        </div>
        <button className={\`px-5 py-2.5 bg-brand-\${'${color}'} text-brand-bgPrimary font-bold rounded-btn hover:shadow-glow-\${'${color}'} transition-all\`}>
          ${btnText}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 min-h-[500px] bg-brand-surface border border-white/5 rounded-card p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className={\`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-\${'${color}'} to-transparent opacity-50\`}></div>
          <div className={\`w-24 h-24 rounded-full bg-brand-\${'${color}'}/10 flex items-center justify-center mb-6 animate-float\`}>
            <${icon} size={48} className={\`text-brand-\${'${color}'}\`} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">${title} Interface</h2>
          <p className="text-brand-textMuted max-w-md">This section is currently being initialized. We are aggregating real-time data for your personalized experience.</p>
        </div>
        
        <div className="space-y-6">
          <div className="bg-brand-surfaceElevated border border-white/5 rounded-card p-6 shadow-glass">
            <h3 className="font-bold text-white mb-4 flex items-center justify-between">
              Recent Activity
              <span className={\`w-2 h-2 rounded-full bg-brand-\${'${color}'} animate-pulse\`}></span>
            </h3>
            <div className="space-y-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className={\`w-10 h-10 rounded-lg bg-brand-bgPrimary flex items-center justify-center border border-white/5 group-hover:border-brand-\${'${color}'}/50 transition-colors\`}>
                    <${icon} size={16} className={\`text-brand-textMuted group-hover:text-brand-\${'${color}'}\`} />
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
`;
    fs.writeFileSync(filepath, content);
}

const pages = [
  ['apps/frontend/src/app/dashboard/calendar/page.tsx', 'Economic Calendar', 'CalendarDays', 'Track upcoming market events, earnings, and economic indicators.', 'purple', 'Add Event'],
  ['apps/frontend/src/app/dashboard/markets/page.tsx', 'Global Markets', 'LineChart', 'Monitor global indices, forex, and cryptocurrency trends in real-time.', 'cyan', 'Create Alert'],
  ['apps/frontend/src/app/dashboard/portfolio/page.tsx', 'My Portfolio', 'PieChart', 'Analyze your asset allocation, performance metrics, and historical returns.', 'blue', 'Connect Broker'],
  ['apps/frontend/src/app/dashboard/watchlists/page.tsx', 'Watchlists', 'Eye', 'Track specific assets and receive customized AI alerts.', 'success', 'New Watchlist'],
  ['apps/frontend/src/app/dashboard/ai/page.tsx', 'AI Assistant', 'Bot', 'Chat with TradeOXX AI for personalized market insights and portfolio advice.', 'purple', 'New Chat'],
  ['apps/frontend/src/app/dashboard/news/page.tsx', 'Market News', 'Newspaper', 'AI-curated news feed filtered for high-impact market moving events.', 'cyan', 'Filter Topics'],
  ['apps/frontend/src/app/dashboard/learning/page.tsx', 'Learning Center', 'BookOpen', 'Expand your trading knowledge with AI-guided courses and tutorials.', 'warning', 'Resume Course'],
  ['apps/frontend/src/app/profile/page.tsx', 'User Profile', 'User', 'Manage your personal information, trading preferences, and security settings.', 'cyan', 'Edit Profile'],
  ['apps/frontend/src/app/settings/page.tsx', 'System Settings', 'Settings', 'Configure app preferences, notifications, and API integrations.', 'blue', 'Save Changes']
];

pages.forEach(p => createPage(...p));
console.log('Done!');
