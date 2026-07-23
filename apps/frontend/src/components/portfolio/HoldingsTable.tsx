"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';

export function HoldingsTable({ holdings }: { holdings: any[] }) {
  if (!holdings.length) return null;

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Current Holdings</CardTitle>
        <button className="text-sm font-medium bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors border border-white/10">
          Add Transaction
        </button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-brand-textMuted uppercase bg-white/5">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">Asset</th>
                <th className="px-4 py-3 text-right">Price</th>
                <th className="px-4 py-3 text-right">Holdings</th>
                <th className="px-4 py-3 text-right">Market Value</th>
                <th className="px-4 py-3 text-right">Unrealized P&L</th>
                <th className="px-4 py-3 text-center">Alloc</th>
                <th className="px-4 py-3 rounded-r-lg"></th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((h, i) => {
                const isProfit = h.gainLoss >= 0;
                return (
                  <tr key={h.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center font-bold text-white text-xs">
                          {h.symbol[0]}
                        </div>
                        <div>
                          <div className="font-bold text-white">{h.symbol}</div>
                          <div className="text-xs text-brand-textMuted">{h.assetType}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right font-medium">
                      ${h.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="text-white font-medium">{h.quantity}</div>
                      <div className="text-xs text-brand-textMuted">Avg: ${h.averageCost.toFixed(2)}</div>
                    </td>
                    <td className="px-4 py-4 text-right font-bold text-white">
                      ${h.marketValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className={`flex items-center justify-end gap-1 font-bold ${isProfit ? 'text-brand-success' : 'text-brand-danger'}`}>
                        {isProfit ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        ${Math.abs(h.gainLoss).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <div className={`text-xs ${isProfit ? 'text-brand-success/70' : 'text-brand-danger/70'}`}>
                        {isProfit ? '+' : '-'}{Math.abs(h.gainLossPercent).toFixed(2)}%
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <Badge variant="outline">{h.allocation.toFixed(1)}%</Badge>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button className="p-2 text-brand-textMuted hover:text-white rounded-lg hover:bg-white/10 transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
