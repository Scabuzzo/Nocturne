// src/app/(strategy)/build/_components/StreamlinedHeader.tsx

import type { Strategy } from '@/_lib/types/strategy';

interface StreamlinedHeaderProps {
  strategy: Strategy;
  onUpdate: (field: keyof Pick<Strategy, 'name' | 'timeframe' | 'pair'>, value: any) => void;
  onSave: () => void;
  onRunBacktest: () => void;
  canRunBacktest: boolean;
}

/**
 * Clean, focused header with essential controls only
 */
export function StreamlinedHeader({ 
  strategy, 
  onUpdate, 
  onSave, 
  onRunBacktest, 
  canRunBacktest 
}: StreamlinedHeaderProps) {
  return (
    <div className="bg-gray-900/90 backdrop-blur-sm border-b border-gray-700/50 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left - Strategy Name */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <input
            type="text"
            value={strategy.name}
            onChange={(e) => onUpdate('name', e.target.value)}
            className="text-xl font-bold bg-transparent border-none outline-none text-white placeholder-gray-500 hover:bg-gray-800/30 focus:bg-gray-800/50 rounded-lg px-3 py-2 -ml-3 transition-all min-w-0 flex-1 max-w-xs"
            placeholder="Strategy Name"
          />
          
          {/* Quick Settings */}
          <div className="flex items-center gap-3">
            <select
              value={strategy.pair}
              onChange={(e) => onUpdate('pair', e.target.value)}
              className="bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="BTC/USDT">BTC/USDT</option>
              <option value="ETH/USDT">ETH/USDT</option>
              <option value="SOL/USDT">SOL/USDT</option>
              <option value="ADA/USDT">ADA/USDT</option>
            </select>

            <select
              value={strategy.timeframe}
              onChange={(e) => onUpdate('timeframe', e.target.value as Strategy['timeframe'])}
              className="bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="15m">15m</option>
              <option value="1h">1h</option>
              <option value="4h">4h</option>
              <option value="1d">1d</option>
            </select>
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onSave}
            className="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition-all text-sm font-medium"
          >
            Save Draft
          </button>
          
          <button
            onClick={onRunBacktest}
            disabled={!canRunBacktest}
            className={`
              px-5 py-1.5 rounded-lg font-bold text-sm transition-all duration-200 flex items-center gap-2
              ${canRunBacktest 
                ? 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white hover:scale-105' 
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
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
    </div>
  );
}