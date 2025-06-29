// src/app/(strategy)/results/_components/TradesTable.tsx

import type { TradeResult } from '@/_lib/types/results';

interface TradesTableProps {
  trades: TradeResult[];
}

/**
 * Futuristic trades table with neon highlights and smooth animations
 */
export function TradesTable({ trades }: TradesTableProps) {
  if (trades.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <p className="text-gray-400 text-lg mb-2">No trades executed</p>
        <p className="text-gray-500 text-sm">Add more indicators to generate trade signals</p>
      </div>
    );
  }

  const formatPnL = (pnl: number) => {
    const isPositive = pnl >= 0;
    return {
      value: `${isPositive ? '+' : ''}$${Math.abs(pnl).toFixed(2)}`,
      color: isPositive ? 'text-green-400' : 'text-red-400',
      bgColor: isPositive ? 'bg-green-500/10' : 'bg-red-500/10',
      borderColor: isPositive ? 'border-green-500/30' : 'border-red-500/30',
    };
  };

  const formatPercentage = (pct: number) => {
    const isPositive = pct >= 0;
    return {
      value: `${isPositive ? '+' : ''}${pct.toFixed(2)}%`,
      color: isPositive ? 'text-green-400' : 'text-red-400',
    };
  };

  const getExitReasonBadge = (reason: TradeResult['exitReason']) => {
    switch (reason) {
      case 'take-profit':
        return {
          text: 'Take Profit',
          color: 'text-green-400',
          bgColor: 'bg-green-500/20',
          borderColor: 'border-green-500/30',
          icon: '🎯'
        };
      case 'stop-loss':
        return {
          text: 'Stop Loss',
          color: 'text-red-400',
          bgColor: 'bg-red-500/20',
          borderColor: 'border-red-500/30',
          icon: '🛑'
        };
      case 'signal-exit':
        return {
          text: 'Signal Exit',
          color: 'text-blue-400',
          bgColor: 'bg-blue-500/20',
          borderColor: 'border-blue-500/30',
          icon: '📡'
        };
      default:
        return {
          text: 'Unknown',
          color: 'text-gray-400',
          bgColor: 'bg-gray-500/20',
          borderColor: 'border-gray-500/30',
          icon: '❓'
        };
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-700/30">
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700/30 px-6 py-4">
        <div className="grid grid-cols-8 gap-4 text-sm font-medium text-gray-300">
          <div>Entry Time</div>
          <div>Exit Time</div>
          <div>Side</div>
          <div>Entry Price</div>
          <div>Exit Price</div>
          <div>P&L</div>
          <div>Return %</div>
          <div>Exit Reason</div>
        </div>
      </div>

      {/* Trades */}
      <div className="bg-gray-900/30 backdrop-blur-xl">
        {trades.map((trade, index) => {
          const pnlData = formatPnL(trade.pnl);
          const pctData = formatPercentage(trade.pnlPercentage);
          const exitBadge = getExitReasonBadge(trade.exitReason);
          
          return (
            <div
              key={trade.id}
              className="group grid grid-cols-8 gap-4 px-6 py-4 border-b border-gray-800/30 hover:bg-gray-800/20 transition-all duration-300 hover:border-gray-700/50 animate-in slide-in-from-bottom-2"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Entry Time */}
              <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200">
                {new Date(trade.entryTime).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>

              {/* Exit Time */}
              <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200">
                {new Date(trade.exitTime).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>

              {/* Side */}
              <div>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${
                  trade.side === 'long' 
                    ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                    : 'bg-red-500/20 text-red-300 border-red-500/30'
                }`}>
                  {trade.side === 'long' ? '📈' : '📉'}
                  {trade.side.toUpperCase()}
                </span>
              </div>

              {/* Entry Price */}
              <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200 font-mono">
                ${trade.entryPrice.toFixed(2)}
              </div>

              {/* Exit Price */}
              <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200 font-mono">
                ${trade.exitPrice.toFixed(2)}
              </div>

              {/* P&L */}
              <div>
                <span className={`inline-flex items-center px-2 py-1 rounded-lg text-sm font-semibold border ${pnlData.bgColor} ${pnlData.color} ${pnlData.borderColor} font-mono group-hover:scale-105 transition-transform duration-200 whitespace-nowrap`}>
                  {pnlData.value}
                </span>
              </div>

              {/* Return % */}
              <div className={`text-sm font-semibold ${pctData.color} font-mono group-hover:text-white transition-colors duration-200`}>
                {pctData.value}
              </div>

              {/* Exit Reason */}
              <div>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border ${exitBadge.bgColor} ${exitBadge.color} ${exitBadge.borderColor} group-hover:scale-105 transition-transform duration-200`}>
                  <span>{exitBadge.icon}</span>
                  {exitBadge.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer with trade summary */}
      <div className="bg-gray-800/30 border-t border-gray-700/30 px-6 py-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Total Trades:</span>
            <span className="text-white font-semibold">{trades.length}</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-400">Winning:</span>
              <span className="text-green-400 font-semibold">
                {trades.filter(t => t.pnl > 0).length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-gray-400">Losing:</span>
              <span className="text-red-400 font-semibold">
                {trades.filter(t => t.pnl < 0).length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Win Rate:</span>
              <span className="text-cyan-400 font-semibold">
                {((trades.filter(t => t.pnl > 0).length / trades.length) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}