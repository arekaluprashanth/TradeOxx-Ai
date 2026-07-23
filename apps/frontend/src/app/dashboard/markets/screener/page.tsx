"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Search, Filter, SlidersHorizontal, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const MOCK_SCREENER_DATA = [
  { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology', price: 175.20, change: 1.2, volume: '52M', marketCap: '2.8T', pe: 28.5 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology', price: 415.50, change: 0.8, volume: '21M', marketCap: '3.1T', pe: 35.2 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', sector: 'Technology', price: 825.10, change: 4.2, volume: '45M', marketCap: '2.0T', pe: 65.4 },
  { symbol: 'TSLA', name: 'Tesla Inc.', sector: 'Consumer Cyclical', price: 175.40, change: -2.1, volume: '105M', marketCap: '550B', pe: 40.1 },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', sector: 'Financials', price: 195.20, change: 0.5, volume: '10M', marketCap: '560B', pe: 11.2 },
  { symbol: 'V', name: 'Visa Inc.', sector: 'Financials', price: 280.15, change: 0.2, volume: '6M', marketCap: '575B', pe: 31.5 },
  { symbol: 'WMT', name: 'Walmart Inc.', sector: 'Consumer Defensive', price: 60.50, change: -0.4, volume: '15M', marketCap: '485B', pe: 25.4 },
];

export default function MarketScreenerPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = MOCK_SCREENER_DATA.filter(asset => 
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
    asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Stock Screener</h1>
          <p className="text-brand-textSecondary text-sm">Filter and discover opportunities across global markets.</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-1 md:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-textMuted" />
            <input 
              type="text" 
              placeholder="Search by symbol or name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-brand-cyan transition-colors"
            />
          </div>
          <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-brand-textMuted hover:text-white transition-colors flex items-center justify-center">
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <Card className="bg-white/[0.02] border-white/5">
        <CardContent className="p-4 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 text-sm font-bold text-brand-textSecondary">
            <Filter size={16} /> Filters:
          </div>
          <select className="bg-white/5 border border-white/10 rounded-md px-3 py-1.5 text-sm text-white outline-none">
            <option>All Sectors</option>
            <option>Technology</option>
            <option>Financials</option>
            <option>Healthcare</option>
          </select>
          <select className="bg-white/5 border border-white/10 rounded-md px-3 py-1.5 text-sm text-white outline-none">
            <option>All Market Caps</option>
            <option>Mega ($200B+)</option>
            <option>Large ($10B-$200B)</option>
            <option>Mid ($2B-$10B)</option>
          </select>
          <select className="bg-white/5 border border-white/10 rounded-md px-3 py-1.5 text-sm text-white outline-none">
            <option>Any Performance</option>
            <option>Top Gainers</option>
            <option>Top Losers</option>
          </select>
        </CardContent>
      </Card>

      {/* Screener Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-brand-textMuted uppercase bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4">Symbol</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Sector</th>
                  <th className="px-6 py-4 text-right">Price</th>
                  <th className="px-6 py-4 text-right">Change %</th>
                  <th className="px-6 py-4 text-right">Volume</th>
                  <th className="px-6 py-4 text-right">Market Cap</th>
                  <th className="px-6 py-4 text-right">P/E</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((asset, i) => {
                  const isUp = asset.change >= 0;
                  return (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group cursor-pointer">
                      <td className="px-6 py-4">
                        <Link href={`/dashboard/markets/${asset.symbol}`}>
                          <div className="font-bold text-white group-hover:text-brand-cyan transition-colors">{asset.symbol}</div>
                        </Link>
                      </td>
                      <td className="px-6 py-4 font-medium text-brand-textSecondary">
                        {asset.name}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs px-2 py-1 bg-white/5 rounded-md text-brand-textMuted">{asset.sector}</span>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-white">
                        ${asset.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className={`flex items-center justify-end gap-1 font-bold ${isUp ? 'text-brand-success' : 'text-brand-danger'}`}>
                          {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                          {isUp ? '+' : ''}{asset.change.toFixed(2)}%
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-brand-textSecondary">
                        {asset.volume}
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-brand-textSecondary">
                        {asset.marketCap}
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-brand-textSecondary">
                        {asset.pe}
                      </td>
                    </tr>
                  );
                })}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-brand-textMuted">
                      No assets found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
