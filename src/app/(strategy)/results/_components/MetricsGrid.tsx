// src/app/(strategy)/results/_components/MetricsGrid.tsx

import type { BacktestMetrics } from '@/_lib/types/results';

interface MetricsGridProps {
  metrics: BacktestMetrics;
}

/**
 * Enhanced futuristic metrics grid with glow effects and animations
 */
export function MetricsGrid({ metrics }: MetricsGridProps) {
  const metricCards = [
    {
      title: 'Total Return',
      value: `${metrics.totalReturn >= 0 ? '+' : ''}${metrics.totalReturn.toFixed(2)}%`,
      subValue: `$${metrics.totalReturnUSD.toFixed(2)}`,
      color: metrics.totalReturn >= 0 ? 'text-green-400' : 'text-red-400',
      bgColor: metrics.totalReturn >= 0 ? 'from-green-500/10 to-green-600/5' : 'from-red-500/10 to-red-600/5',
      borderColor: metrics.totalReturn >= 0 ? 'hover:border-green-500/50' : 'hover:border-red-500/50',
      shadowColor: metrics.totalReturn >= 0 ? 'hover:shadow-green-500/20' : 'hover:shadow-red-500/20',
      icon: metrics.totalReturn >= 0 ? '📈' : '📉',
    },
    {
      title: 'Win Rate',
      value: `${metrics.winRate.toFixed(1)}%`,
      subValue: `${metrics.winningTrades}/${metrics.totalTrades} trades`,
      color: metrics.winRate >= 60 ? 'text-green-400' : metrics.winRate >= 50 ? 'text-yellow-400' : 'text-red-400',
      bgColor: 'from-blue-500/10 to-cyan-600/5',
      borderColor: 'hover:border-blue-500/50',
      shadowColor: 'hover:shadow-blue-500/20',
      icon: '🎯',
    },
    {
      title: 'Profit Factor',
      value: metrics.profitFactor.toFixed(2),
      subValue: `Avg Win: $${metrics.averageWin.toFixed(0)}`,
      color: metrics.profitFactor >= 1.5 ? 'text-green-400' : metrics.profitFactor >= 1 ? 'text-yellow-400' : 'text-red-400',
      bgColor: 'from-purple-500/10 to-purple-600/5',
      borderColor: 'hover:border-purple-500/50',
      shadowColor: 'hover:shadow-purple-500/20',
      icon: '⚖️',
    },
    {
      title: 'Max Drawdown',
      value: `${metrics.maxDrawdown.toFixed(1)}%`,
      subValue: 'Peak to trough',
      color: metrics.maxDrawdown <= 10 ? 'text-green-400' : metrics.maxDrawdown <= 20 ? 'text-yellow-400' : 'text-red-400',
      bgColor: 'from-orange-500/10 to-red-600/5',
      borderColor: 'hover:border-orange-500/50',
      shadowColor: 'hover:shadow-orange-500/20',
      icon: '📉',
    },
    {
      title: 'Sharpe Ratio',
      value: metrics.sharpeRatio.toFixed(2),
      subValue: 'Risk-adjusted return',
      color: metrics.sharpeRatio >= 1.5 ? 'text-green-400' : metrics.sharpeRatio >= 1 ? 'text-yellow-400' : 'text-red-400',
      bgColor: 'from-indigo-500/10 to-blue-600/5',
      borderColor: 'hover:border-indigo-500/50',
      shadowColor: 'hover:shadow-indigo-500/20',
      icon: '📊',
    },
    {
      title: 'Total Trades',
      value: metrics.totalTrades.toString(),
      subValue: `${metrics.winningTrades} wins, ${metrics.losingTrades} losses`,
      color: 'text-cyan-400',
      bgColor: 'from-cyan-500/10 to-teal-600/5',
      borderColor: 'hover:border-cyan-500/50',
      shadowColor: 'hover:shadow-cyan-500/20',
      icon: '📋',
    },
    {
      title: 'Best Trade',
      value: `$${metrics.largestWin.toFixed(2)}`,
      subValue: 'Largest single win',
      color: 'text-green-400',
      bgColor: 'from-green-500/10 to-emerald-600/5',
      borderColor: 'hover:border-green-500/50',
      shadowColor: 'hover:shadow-green-500/20',
      icon: '🏆',
    },
    {
      title: 'Worst Trade',
      value: `-$${Math.abs(metrics.largestLoss).toFixed(2)}`,
      subValue: 'Largest single loss',
      color: 'text-red-400',
      bgColor: 'from-red-500/10 to-red-600/5',
      borderColor: 'hover:border-red-500/50',
      shadowColor: 'hover:shadow-red-500/20',
      icon: '⚠️',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {metricCards.map((metric, index) => (
        <div
          key={metric.title}
          className={`group relative bg-gradient-to-br ${metric.bgColor} backdrop-blur-xl border border-gray-700/30 ${metric.borderColor} rounded-xl p-6 transition-all duration-500 hover:scale-105 ${metric.shadowColor} hover:shadow-lg overflow-hidden animate-in slide-in-from-bottom-4`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Animated glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
          
          {/* Neon border effect */}
          <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${metric.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm`}></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                {metric.title}
              </h3>
              <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                {metric.icon}
              </span>
            </div>
            
            <div className={`text-2xl font-bold mb-2 ${metric.color} group-hover:text-white transition-colors duration-200`}>
              {metric.value}
            </div>
            
            <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-200">
              {metric.subValue}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}