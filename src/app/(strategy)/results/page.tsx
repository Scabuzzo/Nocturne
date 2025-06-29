// src/app/(strategy)/results/page.tsx

'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Strategy } from '@/_lib/types/strategy';
import { generateMockResults } from '@/_lib/utils/mockResults';
import { MetricsGrid } from './_components/MetricsGrid';
import { EquityChart } from './_components/EquityChart';
import { TradesTable } from './_components/TradesTable';
import { StrategyOverview } from './_components/StrategyOverview';

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [isSaved, setIsSaved] = useState(false);
  
  // In a real app, you'd get this from the database or route params
  const mockStrategy: Strategy = useMemo(() => ({
    id: 'mock-strategy',
    name: searchParams.get('name') || 'My Strategy',
    timeframe: (searchParams.get('timeframe') as Strategy['timeframe']) || '1h',
    pair: searchParams.get('pair') || 'BTC/USDT',
    entryConditions: [], // Would be populated from actual data
    exitConditions: [],
    riskManagement: {
      stopLoss: Number(searchParams.get('stopLoss')) || 2,
      positionSize: Number(searchParams.get('positionSize')) || 100,
      maxRiskPerTrade: Number(searchParams.get('maxRiskPerTrade')) || 1,
      takeProfit: Number(searchParams.get('takeProfit')) || 4,
      maxDrawdown: 20,
      maxDailyLoss: 5,
      trailingStop: { enabled: false, percentage: 2 },
    },
  }), [searchParams]);

  const { metrics, trades, equityCurve } = useMemo(() => 
    generateMockResults(mockStrategy), [mockStrategy]
  );

  const initialCapital = 10000;
  const finalCapital = initialCapital + metrics.totalReturnUSD;
  const isProfit = metrics.totalReturn >= 0;

  const handleSaveStrategy = () => {
    setIsSaved(!isSaved);
    // In real app, would save to backend
  };

  const handleDeployBot = () => {
    alert('🤖 Bot deployment coming soon! This will connect to live trading APIs.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-float opacity-60"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/15 rounded-full blur-2xl animate-pulse opacity-50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-cyan-600/10 rounded-full blur-2xl animate-float opacity-40" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-32 h-32 bg-green-600/10 rounded-full blur-xl animate-pulse opacity-30" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Hero Results Section */}
      <div className="relative z-10 bg-gray-900/50 backdrop-blur-xl border-b border-gray-700/30">
        <div className="max-w-7xl mx-auto p-8">
          {/* Navigation breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/build" className="hover:text-cyan-400 transition-colors duration-200">
              Strategy Builder
            </Link>
            <span>›</span>
            <span className="text-white">Backtest Results</span>
          </div>

          {/* Header with actions */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent mb-3 animate-gradient">
                {mockStrategy.name}
              </h1>
              <div className="flex items-center gap-4 text-lg">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-sm font-medium">
                  {mockStrategy.pair}
                </span>
                <span className="text-gray-300">{mockStrategy.timeframe}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-300">{metrics.duration}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Save Strategy Star */}
              <button
                onClick={handleSaveStrategy}
                className={`group p-4 rounded-xl transition-all duration-300 hover:scale-110 ${
                  isSaved 
                    ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50 shadow-lg shadow-yellow-500/25' 
                    : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-yellow-500/10 hover:text-yellow-300 hover:border-yellow-500/30'
                }`}
                title={isSaved ? 'Strategy saved!' : 'Save strategy'}
              >
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </button>

              {/* Deploy Bot Button */}
              <button
                onClick={handleDeployBot}
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-105 transform border border-cyan-500/30"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Deploy Live Bot
              </button>
            </div>
          </div>

          {/* Performance Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Total Return */}
            <div className="group relative bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-400">Total Return</h3>
                  <span className="text-2xl">{isProfit ? '📈' : '📉'}</span>
                </div>
                <div className={`text-3xl font-bold mb-2 ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
                  {isProfit ? '+' : ''}{metrics.totalReturn.toFixed(2)}%
                </div>
                <div className={`text-lg font-medium ${isProfit ? 'text-green-300' : 'text-red-300'}`}>
                  {isProfit ? '+' : ''}${metrics.totalReturnUSD.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Win Rate */}
            <div className="group relative bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-400">Win Rate</h3>
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {metrics.winRate.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-300">
                  {metrics.winningTrades}/{metrics.totalTrades} trades
                </div>
              </div>
            </div>

            {/* Profit Factor */}
            <div className="group relative bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-400">Profit Factor</h3>
                  <span className="text-2xl">⚖️</span>
                </div>
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {metrics.profitFactor.toFixed(2)}
                </div>
                <div className="text-sm text-gray-300">
                  Avg Win: ${metrics.averageWin.toFixed(0)}
                </div>
              </div>
            </div>

            {/* Max Drawdown */}
            <div className="group relative bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-400">Max Drawdown</h3>
                  <span className="text-2xl">📉</span>
                </div>
                <div className="text-3xl font-bold text-orange-400 mb-2">
                  {metrics.maxDrawdown.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-300">
                  Peak to trough
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Charts & Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Equity Chart */}
            <div className="group bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 hover:border-gray-600/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white group-hover:text-cyan-100 transition-colors duration-200">
                  Portfolio Performance
                </h2>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                    <span className="text-gray-300">Equity</span>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-gray-300">Drawdown</span>
                  </div>
                </div>
              </div>
              <EquityChart 
                data={equityCurve} 
                initialCapital={initialCapital}
                title=""
              />
            </div>

            {/* Enhanced Metrics Grid */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 hover:border-gray-600/40 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-6">Detailed Metrics</h2>
              <MetricsGrid metrics={metrics} />
            </div>

            {/* Recent Trades */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 hover:border-gray-600/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Recent Trades</h2>
                <span className="text-sm text-gray-400">
                  Showing last 10 trades
                </span>
              </div>
              <TradesTable trades={trades.slice(-10)} />
            </div>
          </div>

          {/* Right Column - Strategy Overview */}
          <div className="space-y-8">
            
            {/* Strategy Overview */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 hover:border-gray-600/40 transition-all duration-300">
              <StrategyOverview strategy={mockStrategy} />
            </div>

            {/* Performance Summary */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 hover:border-gray-600/40 transition-all duration-300">
              <h3 className="text-lg font-semibold text-white mb-4">Performance Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Initial Capital</span>
                  <span className="text-white font-medium">${initialCapital.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Final Capital</span>
                  <span className={`font-medium ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
                    ${finalCapital.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Best Trade</span>
                  <span className="text-green-400 font-medium">${metrics.largestWin.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Worst Trade</span>
                  <span className="text-red-400 font-medium">-${Math.abs(metrics.largestLoss).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Sharpe Ratio</span>
                  <span className={`font-medium ${metrics.sharpeRatio >= 1 ? 'text-green-400' : 'text-yellow-400'}`}>
                    {metrics.sharpeRatio.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}