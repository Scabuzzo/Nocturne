// src/app/(strategy)/results/_components/StrategyOverview.tsx

import type { Strategy } from '@/_lib/types/strategy';

interface StrategyOverviewProps {
  strategy: Strategy;
}

/**
 * Overview panel showing strategy configuration used for the backtest
 */
export function StrategyOverview({ strategy }: StrategyOverviewProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Strategy Configuration</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Settings */}
        <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Trading Setup</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Trading Pair</span>
              <span className="text-white font-medium">{strategy.pair || 'BTC/USDT'}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-400">Timeframe</span>
              <span className="text-white font-medium">
                {strategy.timeframe === '15m' && '15 minutes'}
                {strategy.timeframe === '1h' && '1 hour'}
                {strategy.timeframe === '4h' && '4 hours'}
                {strategy.timeframe === '1d' && 'Daily'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-400">Position Size</span>
              <span className="text-white font-medium">${strategy.riskManagement.positionSize}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-400">Entry Conditions</span>
              <span className="text-white font-medium">{strategy.entryConditions.length} indicators</span>
            </div>
          </div>
        </div>

        {/* Risk Management */}
        <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Risk Management</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Stop Loss</span>
              <span className="text-red-400 font-medium">{strategy.riskManagement.stopLoss}%</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-400">Take Profit</span>
              <span className="text-green-400 font-medium">{strategy.riskManagement.takeProfit}%</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-400">Risk:Reward Ratio</span>
              <span className="text-blue-400 font-medium">
                1:{(strategy.riskManagement.takeProfit / strategy.riskManagement.stopLoss).toFixed(2)}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-400">Max Drawdown</span>
              <span className="text-yellow-400 font-medium">{strategy.riskManagement.maxDrawdown}%</span>
            </div>
            
            {strategy.riskManagement.trailingStop?.enabled && (
              <div className="flex justify-between">
                <span className="text-gray-400">Trailing Stop</span>
                <span className="text-purple-400 font-medium">
                  {strategy.riskManagement.trailingStop.percentage}%
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Entry Indicators */}
        {strategy.entryConditions.length > 0 && (
          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4">Entry Indicators</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {strategy.entryConditions.map((indicator, index) => (
                <div 
                  key={indicator.id}
                  className="bg-gray-800/50 rounded-lg p-4 border border-gray-600"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-blue-400 font-semibold">{indicator.type}</span>
                    <span className="text-xs text-gray-500">#{index + 1}</span>
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    {Object.entries(indicator.params).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-400 capitalize">{key}:</span>
                        <span className="text-gray-300">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Backtest Settings */}
        <div className="bg-blue-900/20 rounded-lg p-6 border border-blue-500/30 lg:col-span-2">
          <h3 className="text-lg font-semibold text-blue-300 mb-4">📊 Backtest Information</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-gray-400">Initial Capital</div>
              <div className="text-white font-semibold">$10,000</div>
            </div>
            
            <div>
              <div className="text-gray-400">Test Period</div>
              <div className="text-white font-semibold">90 days</div>
            </div>
            
            <div>
              <div className="text-gray-400">Commission</div>
              <div className="text-white font-semibold">0.1%</div>
            </div>
            
            <div>
              <div className="text-gray-400">Slippage</div>
              <div className="text-white font-semibold">0.05%</div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-800/20 rounded border border-blue-500/20">
            <p className="text-blue-200 text-sm">
              💰 <strong>Virtual Trading:</strong> These results use simulated capital for backtesting purposes. 
              Experience realistic trading psychology without financial risk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}