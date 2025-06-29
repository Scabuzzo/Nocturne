// src/app/(strategy)/results/_components/StrategyOverview.tsx

import type { Strategy } from '@/_lib/types/strategy';

interface StrategyOverviewProps {
  strategy: Strategy;
}

/**
 * Clean strategy overview without backtest info section
 */
export function StrategyOverview({ strategy }: StrategyOverviewProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Strategy Configuration</h3>
      
      {/* Trading Setup */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30">
          <h4 className="text-sm font-medium text-gray-300 mb-3 text-center">Trading Setup</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Trading Pair</span>
              <span className="text-white font-medium">{strategy.pair || 'BTC/USDT'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Timeframe</span>
              <span className="text-white font-medium">{strategy.timeframe}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Position Size</span>
              <span className="text-white font-medium">{strategy.riskManagement.positionSize}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Entry Conditions</span>
              <span className="text-white font-medium">{strategy.entryConditions.length} indicators</span>
            </div>
          </div>
        </div>

        {/* Risk Management */}
        <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30">
          <h4 className="text-sm font-medium text-gray-300 mb-3 text-center">Risk Management</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Stop Loss</span>
              <span className="text-red-400 font-medium">{strategy.riskManagement.stopLoss}%</span>
            </div>
            {strategy.riskManagement.takeProfit && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Take Profit</span>
                <span className="text-green-400 font-medium">{strategy.riskManagement.takeProfit}%</span>
              </div>
            )}
            {strategy.riskManagement.takeProfit && strategy.riskManagement.stopLoss && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Risk:Reward</span>
                <span className="text-blue-400 font-medium">
                  1:{(strategy.riskManagement.takeProfit / strategy.riskManagement.stopLoss).toFixed(2)}
                </span>
              </div>
            )}
            {strategy.riskManagement.maxRiskPerTrade && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Max Risk/Trade</span>
                <span className="text-orange-400 font-medium">{strategy.riskManagement.maxRiskPerTrade}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}