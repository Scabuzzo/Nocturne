// src/app/(strategy)/build/_components/ProfessionalHeader.tsx

import type { Strategy } from '@/_lib/types/strategy';

interface ProfessionalHeaderProps {
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
 * Professional header inspired by JUP.AG's clean design
 */
export function ProfessionalHeader({ 
  strategy, 
  onUpdate, 
  onSave, 
  onRunBacktest, 
  canRunBacktest,
  activeSection,
  onSectionChange,
  entryCount
}: ProfessionalHeaderProps) {
  return (
    <div className="bg-gray-950 border-b border-gray-800/30">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Top Row - Strategy Info and Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="group relative">
                <input
                  type="text"
                  value={strategy.name}
                  onChange={(e) => onUpdate('name', e.target.value)}
                  className="text-xl font-semibold bg-transparent border border-transparent hover:border-gray-700/50 focus:border-blue-500/50 outline-none text-white placeholder-gray-500 rounded-lg px-3 py-2 -ml-3 transition-all duration-200 w-full max-w-md"
                  placeholder="Enter strategy name..."
                />
              </div>
              <p className="text-sm text-gray-400 mt-1 ml-3">
                Visual strategy builder
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onSave}
              className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-all text-sm font-medium"
            >
              Save Draft
            </button>
            
            <button
              onClick={onRunBacktest}
              disabled={!canRunBacktest}
              className={`
                px-5 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2
                ${canRunBacktest 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-sm hover:shadow-md'
                  : 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Run Backtest
            </button>
          </div>
        </div>

        {/* Configuration Row */}
        <div className="flex items-center justify-between">
          {/* Trading Pair and Settings */}
          <div className="flex items-center gap-6">
            {/* Trading Pair */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Trading Pair</label>
                <select
                  value={strategy.pair}
                  onChange={(e) => onUpdate('pair', e.target.value)}
                  className="text-sm text-white font-medium bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-1 hover:border-gray-600/50 focus:border-blue-500/50 focus:outline-none transition-all"
                >
                  <option value="BTC/USDT">BTC/USDT</option>
                  <option value="ETH/USDT">ETH/USDT</option>
                  <option value="SOL/USDT">SOL/USDT</option>
                  <option value="ADA/USDT">ADA/USDT</option>
                </select>
              </div>
            </div>

            {/* Timeframe */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Timeframe</label>
                <select
                  value={strategy.timeframe}
                  onChange={(e) => onUpdate('timeframe', e.target.value)}
                  className="text-sm text-white font-medium bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-1 hover:border-gray-600/50 focus:border-blue-500/50 focus:outline-none transition-all"
                >
                  <option value="1m">1 minute</option>
                  <option value="5m">5 minutes</option>
                  <option value="15m">15 minutes</option>
                  <option value="1h">1 hour</option>
                  <option value="4h">4 hours</option>
                  <option value="1d">1 day</option>
                </select>
              </div>
            </div>

            {/* Position Size */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
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

          {/* Section Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSectionChange('entry')}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${activeSection === 'entry'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                }
              `}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Entry Signals
              <span className={`
                inline-flex items-center justify-center min-w-[1rem] h-5 px-1.5 rounded-full text-xs font-medium
                ${activeSection === 'entry' 
                  ? 'bg-blue-500/20 text-blue-300' 
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
                  ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                }
              `}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Risk Management
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}