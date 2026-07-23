"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Search, Plus, MoreHorizontal, Star, TrendingUp, TrendingDown, Bot } from 'lucide-react';

const MOCK_WATCHLISTS = [
  {
    name: "Tech Giants",
    isPinned: true,
    items: [
      { symbol: "AAPL", price: 175.20, change: 1.2, up: true, volume: "52M", aiSignal: "Bullish" },
      { symbol: "MSFT", price: 415.50, change: 0.8, up: true, volume: "21M", aiSignal: "Neutral" },
      { symbol: "GOOGL", price: 142.10, change: -0.4, up: false, volume: "18M", aiSignal: "Bearish" },
    ]
  },
  {
    name: "Crypto Watch",
    isPinned: false,
    items: [
      { symbol: "BTC", price: 64210.00, change: 3.4, up: true, volume: "1.2B", aiSignal: "Bullish" },
      { symbol: "ETH", price: 3450.20, change: 2.1, up: true, volume: "800M", aiSignal: "Bullish" },
      { symbol: "SOL", price: 145.60, change: -1.2, up: false, volume: "400M", aiSignal: "Neutral" },
    ]
  }
];

export default function WatchlistsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Watchlists</h1>
          <p className="text-brand-textSecondary text-sm">Monitor your favorite assets</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-1 md:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-textMuted" />
            <input 
              type="text" 
              placeholder="Search watchlists..." 
              className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-brand-cyan transition-colors"
            />
          </div>
          <button className="px-4 py-2 bg-brand-cyan text-brand-bgPrimary rounded-lg text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap">
            <Plus size={16} /> New List
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {MOCK_WATCHLISTS.map((list, idx) => (
          <Card key={idx} className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                {list.name}
                {list.isPinned && <Star size={14} className="text-brand-cyan fill-brand-cyan" />}
              </CardTitle>
              <button className="p-2 text-brand-textMuted hover:text-white rounded-lg hover:bg-white/10 transition-colors">
                <MoreHorizontal size={16} />
              </button>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-brand-textMuted uppercase bg-white/5 border-y border-white/5">
                    <tr>
                      <th className="px-4 py-3">Symbol</th>
                      <th className="px-4 py-3 text-right">Price</th>
                      <th className="px-4 py-3 text-right">Change</th>
                      <th className="px-4 py-3 text-center">AI Signal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.items.map((item, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-4 font-bold text-white">{item.symbol}</td>
                        <td className="px-4 py-4 text-right font-medium">
                          ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <div className={`flex items-center justify-end gap-1 font-bold ${item.up ? 'text-brand-success' : 'text-brand-danger'}`}>
                            {item.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                            {Math.abs(item.change)}%
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <Badge 
                            variant={item.aiSignal === 'Bullish' ? 'success' : item.aiSignal === 'Bearish' ? 'destructive' : 'outline'}
                            className="flex items-center gap-1 justify-center mx-auto w-fit"
                          >
                            <Bot size={12} /> {item.aiSignal}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
