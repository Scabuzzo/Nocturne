// src/app/(strategy)/build/_components/StrategyHeader.tsx

import type { Strategy } from '@/_lib/types/strategy';

interface CompactHeaderProps {
  strategy: Strategy;
  onUpdate: (field: keyof Pick<Strategy, 'name' | 'timeframe' | 'pair'>, value: any) => void;
  onSave: () => void;
  onRunBacktest: () => void;
  canRunBacktest: boolean;
}

/**
 * Futuristic strategy header with enhanced design
 */
export function CompactHeader({ 
  strategy, 
  onUpdate, 
  onSave, 
  onRunBacktest, 
  canRunBacktest,
}: CompactHeaderProps) {
  return (
    <div className="relative z-10 bg-gray-950/90 backdrop-blur-2xl border-b border-gray-800/50">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/20 via-purple-950/10 to-cyan-950/20 animate-gradient bg-size-300"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          
          {/* Left Side - Strategy Details */}
          <div className="flex items-center gap-6">
            {/* Animated Logo */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30 group-hover:scale-110 transition-all duration-300 border border-blue-400/30">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            
            {/* Strategy Info Card */}
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-gray-600/50 transition-all duration-300 min-w-[400px]">
              <div className="space-y-3">
                <input
                  type="text"
                  value={strategy?.name || ''}
                  onChange={(e) => onUpdate('name', e.target.value)}
                  className="text-xl font-bold bg-transparent border-b border-gray-700/50 hover:border-cyan-500/50 focus:border-cyan-500 outline-none text-white placeholder-gray-400 pb-2 w-full transition-all duration-300"
                  placeholder="Untitled Strategy"
                />
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Pair</span>
                    <select
                      value={strategy?.pair || 'BTC/USDT'}
                      onChange={(e) => onUpdate('pair', e.target.value)}
                      className="bg-gray-800/70 border border-gray-600/50 hover:border-cyan-500/50 focus:border-cyan-500 outline-none text-white rounded-lg px-3 py-2 text-sm transition-all duration-300 hover:bg-gray-800/90 focus:bg-gray-800"
                    >
                      <option value="BTC/USDT">BTC/USDT</option>
                      <option value="ETH/USDT">ETH/USDT</option>
                      <option value="SOL/USDT">SOL/USDT</option>
                      <option value="ADA/USDT">ADA/USDT</option>
                      <option value="MATIC/USDT">MATIC/USDT</option>
                      <option value="AVAX/USDT">AVAX/USDT</option>
                    </select>
                  </div>
                  
                  <div className="w-px h-6 bg-gray-600/50"></div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Timeframe</span>
                    <select
                      value={strategy?.timeframe || '1h'}
                      onChange={(e) => onUpdate('timeframe', e.target.value)}
                      className="bg-gray-800/70 border border-gray-600/50 hover:border-cyan-500/50 focus:border-cyan-500 outline-none text-white rounded-lg px-3 py-2 text-sm transition-all duration-300 hover:bg-gray-800/90 focus:bg-gray-800"
                    >
                      <option value="1m">1m</option>
                      <option value="5m">5m</option>
                      <option value="15m">15m</option>
                      <option value="1h">1h</option>
                      <option value="4h">4h</option>
                      <option value="1d">1d</option>
                    </select>
                  </div>
                  
                  <div className="w-px h-6 bg-gray-600/50"></div>
                  
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                    <span className="text-xs text-gray-400">
                      {strategy?.entryConditions?.length || 0} condition{strategy?.entryConditions?.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={onSave}
              className="group relative px-6 py-3 bg-gray-800/60 hover:bg-gray-700/70 border border-gray-700/50 hover:border-gray-600/70 text-gray-300 hover:text-white rounded-xl transition-all duration-300 text-sm font-medium hover:shadow-lg hover:shadow-gray-900/30 backdrop-blur-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 to-gray-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Save Draft
              </span>
            </button>
            
            <button
              onClick={onRunBacktest}
              disabled={!canRunBacktest}
              className={`
                group relative px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-3 overflow-hidden backdrop-blur-sm
                ${canRunBacktest 
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 text-white shadow-xl shadow-blue-500/30 hover:shadow-cyan-500/40 hover:scale-105 border border-blue-400/30' 
                  : 'bg-gray-800/50 text-gray-500 border border-gray-700/50 cursor-not-allowed'
                }
              `}
            >
              {canRunBacktest && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
              <span className="relative z-10 flex items-center gap-3">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                {canRunBacktest ? 'Run Backtest' : 'Add Indicators First'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}