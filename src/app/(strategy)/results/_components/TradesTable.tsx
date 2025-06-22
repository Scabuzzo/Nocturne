// src/app/(strategy)/results/_components/TradesTable.tsx

import type { TradeResult } from '@/_lib/types/results';

interface TradesTableProps {
  trades: TradeResult[];
  title: string;
}

/**
 * Table displaying trade history with performance indicators
 */
export function TradesTable({ trades, title }: TradesTableProps) {
  if (trades.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-700 text-center">
          <p className="text-gray-400">No trades executed during this backtest period.</p>
        </div>
      </div>
    );
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  };

  const getExitReasonBadge = (reason: TradeResult['exitReason']) => {
    const configs = {
      'take-profit': { label: 'Take Profit', color: 'bg-green-900/40 text-green-300 border-green-500/30' },
      'stop-loss': { label: 'Stop Loss', color: 'bg-red-900/40 text-red-300 border-red-500/30' },
      'signal-exit': { label: 'Signal Exit', color: 'bg-blue-900/40 text-blue-300 border-blue-500/30' },
    };
    
    const config = configs[reason];
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${config.color}`}>
        {config.label}
      </span>
    );
  };

  // Calculate summary stats
  const totalPnL = trades.reduce((sum, trade) => sum + trade.pnl, 0);
  const winningTrades = trades.filter(t => t.pnl > 0);
  const winRate = (winningTrades.length / trades.length) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex items-center gap-6 text-sm">
          <div className="text-gray-400">
            Total: <span className={`font-semibold ${totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${totalPnL.toFixed(2)}
            </span>
          </div>
          <div className="text-gray-400">
            Win Rate: <span className="font-semibold text-white">{winRate.toFixed(1)}%</span>
          </div>
          <div className="text-gray-400">
            Trades: <span className="font-semibold text-white">{trades.length}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-900/50 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Entry Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Exit Time
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Entry Price
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Exit Price
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  P&L
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Exit Reason
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {trades.map((trade) => (
                <tr key={trade.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-300">
                    {formatDate(trade.entryTime)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-300">
                    {formatDate(trade.exitTime)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-gray-300">
                    {formatPrice(trade.entryPrice)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-gray-300">
                    {formatPrice(trade.exitPrice)}
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-gray-400">
                    {trade.duration}
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    <div className={`font-semibold ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                    </div>
                    <div className={`text-xs ${trade.pnlPercentage >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                      {trade.pnlPercentage >= 0 ? '+' : ''}{trade.pnlPercentage.toFixed(2)}%
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {getExitReasonBadge(trade.exitReason)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Table footer with pagination hint */}
        {trades.length >= 20 && (
          <div className="bg-gray-800/30 px-4 py-3 border-t border-gray-700">
            <p className="text-sm text-gray-400 text-center">
              Showing last {trades.length} trades • Full trade history available in CSV export
            </p>
          </div>
        )}
      </div>
    </div>
  );
}