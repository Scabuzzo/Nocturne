// src/app/(strategy)/results/_components/MetricsGrid.tsx

import type { BacktestMetrics } from '@/_lib/types/results';

interface MetricsGridProps {
  metrics: BacktestMetrics;
}

/**
 * Grid displaying key backtest metrics with visual indicators
 */
export function MetricsGrid({ metrics }: MetricsGridProps) {
  const metricCards = [
    {
      title: 'Total Return',
      value: `${metrics.totalReturn >= 0 ? '+' : ''}${metrics.totalReturn.toFixed(2)}%`,
      subValue: `$${metrics.totalReturnUSD.toFixed(2)}`,
      color: metrics.totalReturn >= 0 ? 'text-green-400' : 'text-red-400',
      bgColor: metrics.totalReturn >= 0 ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30',
      icon: metrics.totalReturn >= 0 ? '📈' : '📉',
    },
    {
      title: 'Win Rate',
      value: `${metrics.winRate.toFixed(1)}%`,
      subValue: `${metrics.winningTrades}/${metrics.totalTrades} trades`,
      color: metrics.winRate >= 60 ? 'text-green-400' : metrics.winRate >= 50 ? 'text-yellow-400' : 'text-red-400',
      bgColor: 'bg-blue-900/20 border-blue-500/30',
      icon: '🎯',
    },
    {
      title: 'Profit Factor',
      value: metrics.profitFactor.toFixed(2),
      subValue: `Avg Win: $${metrics.averageWin.toFixed(0)}`,
      color: metrics.profitFactor >= 1.5 ? 'text-green-400' : metrics.profitFactor >= 1 ? 'text-yellow-400' : 'text-red-400',
      bgColor: 'bg-purple-900/20 border-purple-500/30',
      icon: '⚖️',
    },
    {
      title: 'Max Drawdown',
      value: `${metrics.maxDrawdown.toFixed(1)}%`,
      subValue: 'Peak to trough',
      color: metrics.maxDrawdown <= 10 ? 'text-green-400' : metrics.maxDrawdown <= 20 ? 'text-yellow-400' : 'text-red-400',
      bgColor: 'bg-orange-900/20 border-orange-500/30',
      icon: '📉',
    },
    {
      title: 'Sharpe Ratio',
      value: metrics.sharpeRatio.toFixed(2),
      subValue: 'Risk-adjusted return',
      color: metrics.sharpeRatio >= 1.5 ? 'text-green-400' : metrics.sharpeRatio >= 1 ? 'text-yellow-400' : 'text-red-400',
      bgColor: 'bg-indigo-900/20 border-indigo-500/30',
      icon: '📊',
    },
    {
      title: 'Total Trades',
      value: metrics.totalTrades.toString(),
      subValue: `Over ${metrics.duration}`,
      color: 'text-gray-300',
      bgColor: 'bg-gray-900/50 border-gray-600/30',
      icon: '🔄',
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Performance Metrics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricCards.map((metric, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg border ${metric.bgColor} transition-all hover:scale-105`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-400">{metric.title}</h3>
              <span className="text-2xl">{metric.icon}</span>
            </div>
            
            <div className={`text-3xl font-bold ${metric.color} mb-2`}>
              {metric.value}
            </div>
            
            <p className="text-sm text-gray-500">{metric.subValue}</p>
          </div>
        ))}
      </div>

      {/* Additional Detailed Metrics */}
      <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Detailed Statistics</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-sm text-gray-400">Largest Win</div>
            <div className="text-lg font-semibold text-green-400">
              ${metrics.largestWin.toFixed(2)}
            </div>
          </div>
          
          <div>
            <div className="text-sm text-gray-400">Largest Loss</div>
            <div className="text-lg font-semibold text-red-400">
              ${metrics.largestLoss.toFixed(2)}
            </div>
          </div>
          
          <div>
            <div className="text-sm text-gray-400">Average Loss</div>
            <div className="text-lg font-semibold text-red-300">
              ${metrics.averageLoss.toFixed(2)}
            </div>
          </div>
          
          <div>
            <div className="text-sm text-gray-400">Sortino Ratio</div>
            <div className="text-lg font-semibold text-blue-400">
              {metrics.sortinoRatio.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}