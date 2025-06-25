// src/app/(strategy)/build/_components/CompactHeader.tsx

import type { Strategy } from '@/_lib/types/strategy';

interface CompactHeaderProps {
  strategy: Strategy;
  onUpdate: (field: keyof Pick<Strategy, 'name' | 'timeframe' | 'pair'>, value: any) => void;
  onSave: () => void;
  onRunBacktest: () => void;
  canRunBacktest: boolean;
  activeSection: 'entry' | 'risk';
  onSectionChange: (section: 'entry' | 'risk') => void;
  entryCount: number;
}

/**
 * Compact header with integrated section tabs and better alignment
 */
export function CompactHeader({ 
  strategy, 
  onUpdate, 
  onSave, 
  onRunBacktest, 
  canRunBacktest,
  activeSection,
  onSectionChange,
  entryCount
}: CompactHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 border-b border-gray-700/30">
      <div className="max-w-7xl mx-auto px-8 py-6">
        {/* Top Row - Strategy Name and Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 mt-1">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="group relative">
                <input
                  type="text"
                  value={strategy.name}
                  onChange={(e) => onUpdate('name', e.target.value)}
                  className="text-2xl font-bold bg-transparent border-2 border-transparent hover:border-gray-600/50 focus:border-blue-500/50 outline-none text-white placeholder-gray-500 rounded-lg px-3 py-2 -ml-3 transition-all w-full"
                  placeholder="Enter strategy name..."
                />
              </div>
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

        {/* Bottom Row - Settings and Tabs */}
        <div className="flex items-center justify-between">
          {/* Settings Row - Better Aligned */}
          <div className="flex items-center gap-8">
            {/* Trading Pair */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Trading Pair</label>
                <select
                  value={strategy.pair}
                  onChange={(e) => onUpdate('pair', e.target.value)}
                  className="bg-gray-700/50 border border-gray-600/30 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[120px]"
                >
                  <option value="BTC/USDT">BTC/USDT</option>
                  <option value="ETH/USDT">ETH/USDT</option>
                  <option value="SOL/USDT">SOL/USDT</option>
                  <option value="ADA/USDT">ADA/USDT</option>
                  <option value="DOT/USDT">DOT/USDT</option>
                </select>
              </div>
            </div>

            {/* Timeframe */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600/10 border border-purple-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Timeframe</label>
                <select
                  value={strategy.timeframe}
                  onChange={(e) => onUpdate('timeframe', e.target.value as Strategy['timeframe'])}
                  className="bg-gray-700/50 border border-gray-600/30 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-w-[110px]"
                >
                  <option value="15m">15 minutes</option>
                  <option value="1h">1 hour</option>
                  <option value="4h">4 hours</option>
                  <option value="1d">1 day</option>
                </select>
              </div>
            </div>

            {/* Capital */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-600/10 border border-amber-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Position Size</label>
                <div className="text-sm text-white font-medium">
                  ${strategy.riskManagement.positionSize.toLocaleString()}
                  <span className="text-gray-400 font-normal ml-1">per trade</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section Tabs - Integrated */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSectionChange('entry')}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${activeSection === 'entry'
                  ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-blue-500/40 shadow-lg shadow-blue-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                }
              `}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Entry
              <span className={`
                inline-flex items-center justify-center min-w-[1rem] h-4 px-1 rounded-full text-xs font-bold
                ${activeSection === 'entry' 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-700/80 text-gray-400'
                }
              `}>
                {entryCount}
              </span>
            </button>

            <button
              onClick={() => onSectionChange('risk')}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${activeSection === 'risk'
                  ? 'bg-gradient-to-r from-amber-600/30 to-orange-600/30 text-white border border-amber-500/40 shadow-lg shadow-amber-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                }
              `}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Risk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}