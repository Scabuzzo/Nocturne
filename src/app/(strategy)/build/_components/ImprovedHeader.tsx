// src/app/(strategy)/build/_components/ImprovedHeader.tsx

import type { Strategy } from '@/_lib/types/strategy';

interface ImprovedHeaderProps {
  strategy: Strategy;
  onUpdate: (field: keyof Pick<Strategy, 'name' | 'timeframe' | 'pair'>, value: any) => void;
  onSave: () => void;
  onRunBacktest: () => void;
  canRunBacktest: boolean;
}

/**
 * Improved header with better layout and visual hierarchy
 */
export function ImprovedHeader({ 
  strategy, 
  onUpdate, 
  onSave, 
  onRunBacktest, 
  canRunBacktest 
}: ImprovedHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 border-b border-gray-700/30">
      {/* Main Header */}
      <div className="px-6 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Top Row - Strategy Name and Actions */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <input
                  type="text"
                  value={strategy.name}
                  onChange={(e) => onUpdate('name', e.target.value)}
                  className="text-2xl font-bold bg-transparent border-none outline-none text-white placeholder-gray-500 hover:bg-gray-800/30 focus:bg-gray-800/50 rounded-lg px-3 py-2 -ml-3 transition-all"
                  placeholder="Strategy Name"
                />
                <p className="text-sm text-gray-400 mt-1 ml-3">
                  Design your trading strategy with visual indicators
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={onSave}
                className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 hover:border-gray-500/50 text-gray-300 hover:text-white rounded-lg transition-all text-sm font-medium backdrop-blur-sm"
              >
                Save Draft
              </button>
              
              <button
                onClick={onRunBacktest}
                disabled={!canRunBacktest}
                className={`
                  px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 shadow-lg
                  ${canRunBacktest 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white hover:scale-105 shadow-green-500/25 hover:shadow-green-500/40' 
                    : 'bg-gray-700/50 text-gray-400 cursor-not-allowed border border-gray-600/50'
                  }
                `}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Run Backtest
              </button>
            </div>
          </div>

          {/* Settings Row */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Trading Pair</label>
                    <select
                      value={strategy.pair}
                      onChange={(e) => onUpdate('pair', e.target.value)}
                      className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[120px]"
                    >
                      <option value="BTC/USDT">BTC/USDT</option>
                      <option value="ETH/USDT">ETH/USDT</option>
                      <option value="SOL/USDT">SOL/USDT</option>
                      <option value="ADA/USDT">ADA/USDT</option>
                      <option value="DOT/USDT">DOT/USDT</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Timeframe</label>
                    <select
                      value={strategy.timeframe}
                      onChange={(e) => onUpdate('timeframe', e.target.value as Strategy['timeframe'])}
                      className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-w-[100px]"
                    >
                      <option value="15m">15 minutes</option>
                      <option value="1h">1 hour</option>
                      <option value="4h">4 hours</option>
                      <option value="1d">1 day</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-600/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Capital</label>
                    <div className="text-sm text-white font-medium">
                      ${strategy.riskManagement.positionSize.toLocaleString()} <span className="text-gray-400 font-normal">per trade</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <div className="text-xs text-gray-400">Entry Conditions</div>
                  <div className="text-lg font-bold text-blue-400">{strategy.entryConditions.length}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-400">Risk/Reward</div>
                  <div className="text-lg font-bold text-green-400">
                    1:{(strategy.riskManagement.takeProfit / strategy.riskManagement.stopLoss).toFixed(1)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}