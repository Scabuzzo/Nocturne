// src/app/(strategy)/results/page.tsx

'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
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
      takeProfit: Number(searchParams.get('takeProfit')) || 4,
      positionSize: Number(searchParams.get('positionSize')) || 100,
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
    <div className="min-h-screen bg-black text-white">
      {/* Hero Results Section */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto p-8">
          {/* Header with actions */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {mockStrategy.name}
              </h1>
              <p className="text-gray-300 text-lg">
                {mockStrategy.pair} • {mockStrategy.timeframe} • {metrics.duration}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Save Strategy Star */}
              <button
                onClick={handleSaveStrategy}
                className={`p-3 rounded-lg transition-all hover:scale-110 ${
                  isSaved 
                    ? 'text-yellow-400 bg-yellow-400/20 border border-yellow-400/30' 
                    : 'text-gray-400 bg-gray-800 border border-gray-600 hover:text-yellow-400 hover:bg-yellow-400/10'
                }`}
                title={isSaved ? 'Strategy saved' : 'Save strategy'}
              >
                <svg className="w-6 h-6" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </button>

              {/* Deploy Bot Button */}
              <button 
                onClick={handleDeployBot}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-green-500/25"
              >
                🚀 Deploy Live Bot
              </button>
            </div>
          </div>

          {/* Key Performance Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Starting Capital */}
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-2">Starting Capital</div>
              <div className="text-3xl font-bold text-gray-300">
                ${initialCapital.toLocaleString()}
              </div>
            </div>

            {/* Net Profit/Loss */}
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-2">Net P&L</div>
              <div className={`text-4xl font-bold ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
                {isProfit ? '+' : ''}${metrics.totalReturnUSD.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">
                Final: ${finalCapital.toLocaleString()}
              </div>
            </div>

            {/* Percentage Gain */}
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-2">Total Return</div>
              <div className={`text-4xl font-bold ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
                {isProfit ? '+' : ''}{metrics.totalReturn.toFixed(2)}%
              </div>
              <div className="text-sm text-gray-500">
                Over {metrics.duration}
              </div>
            </div>

            {/* Win Rate & Profit Factor */}
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-2">Win Rate</div>
              <div className="text-3xl font-bold text-blue-400">
                {metrics.winRate.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-500">
                PF: {metrics.profitFactor.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Bottom line impact statement */}
          <div className="mt-8 p-6 bg-gray-800/50 rounded-lg border border-gray-600">
            <div className="text-center">
              <p className="text-gray-300 text-lg">
                💰 If you had started with <span className="font-bold text-white">${initialCapital.toLocaleString()}</span> {metrics.duration} ago, 
                you would now have <span className={`font-bold text-2xl ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
                  ${finalCapital.toLocaleString()}
                </span>
              </p>
              <p className="text-gray-400 mt-2">
                That's a <span className={`font-semibold ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
                  {isProfit ? 'profit' : 'loss'} of ${Math.abs(metrics.totalReturnUSD).toLocaleString()}
                </span> using virtual trading capital.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Equity Curve Chart */}
        <EquityChart 
          data={equityCurve}
          initialCapital={initialCapital}
          title="Portfolio Equity Curve"
        />
        
        {/* Performance Metrics Grid */}
        <MetricsGrid metrics={metrics} />
        
        {/* Strategy Configuration */}
        <StrategyOverview strategy={mockStrategy} />
        
        {/* Recent Trades */}
        <TradesTable 
          trades={trades.slice(-20)} // Show last 20 trades
          title="Trade History"
        />
        
        {/* Navigation */}
        <div className="flex gap-4 pt-6 border-t border-gray-800">
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            ← Back to Builder
          </button>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors">
            Export Results
          </button>
        </div>
      </div>
    </div>
  );
}