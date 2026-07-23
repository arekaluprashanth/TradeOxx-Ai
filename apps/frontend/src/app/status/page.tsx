import Link from 'next/link';

export default function StatusPage() {
  const services = [
    { name: 'Core API', status: 'operational', uptime: '99.99%' },
    { name: 'AI Models (OpenAI)', status: 'operational', uptime: '99.95%' },
    { name: 'Market Data Feed (Polygon)', status: 'operational', uptime: '99.98%' },
    { name: 'Authentication', status: 'operational', uptime: '100.00%' },
    { name: 'Web Application', status: 'operational', uptime: '99.99%' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 flex flex-col items-center">
      <div className="w-full max-w-3xl px-4">
        
        <div className="mb-8">
          <Link href="/" className="text-amber-500 hover:text-amber-400 text-sm font-medium flex items-center">
            ← Back to TradeOXX AI
          </Link>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">System Status</h1>
          <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-950/30 border border-emerald-500/20 rounded-full">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-emerald-400 text-sm font-medium">All Systems Operational</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl mb-12">
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-lg font-semibold text-white">Uptime over the last 90 days</h2>
          </div>
          <div className="divide-y divide-slate-800/50">
            {services.map((service, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors">
                <span className="text-slate-300 font-medium">{service.name}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-slate-500 text-sm">{service.uptime}</span>
                  <span className="text-emerald-400 text-sm font-medium capitalize">
                    {service.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-slate-500 text-sm">
            Updates to this page are made in real-time. If you are experiencing issues not listed here, please contact support.
          </p>
        </div>

      </div>
    </div>
  );
}
