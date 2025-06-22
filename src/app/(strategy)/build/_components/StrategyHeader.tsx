// src/app/(strategy)/build/_components/StrategyHeader.tsx

import type { Strategy } from '@/_lib/types';

export interface StrategyHeaderProps {
  /**
   * Current strategy
   */
  strategy: Strategy;
  
  /**
   * Callback when strategy metadata is updated
   */
  onUpdate: (field: keyof Pick<Strategy, 'name' | 'timeframe'>, value: any) => void;
  
  /**
   * Callback when backtest is requested
   */
  onRunBacktest: () => void;
  
  /**
   * Whether backtest button should be disabled
   */
  disabled?: boolean;
}

/**
 * Strategy header component with name, timeframe, and actions
 */
export function StrategyHeader({
  strategy,
  onUpdate,
  onRunBacktest,
  disabled = false,
}: StrategyHeaderProps) {
  return (
    <div className="border-b border-gray-800 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <input
            type="text"
            value={strategy.name}
            onChange={(e) => onUpdate('name', e.target.value)}
            className="text-3xl font-bold bg-transparent border-none outline-none text-white placeholder-gray-500 w-full"
            placeholder="Strategy Name"
          />
          <p className="text-gray-400 mt-1">
            Build your trading strategy with visual indicators
          </p>
        </div>
        
        <div className="flex items-center gap-4 ml-4">
          {/* Timeframe Selector */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-400 mb-1">Timeframe</label>
            <select
              value={strategy.timeframe}
              onChange={(e) => onUpdate('timeframe', e.target.value as Strategy['timeframe'])}
              className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="15m">15 minutes</option>
              <option value="1h">1 hour</option>
              <option value="4h">4 hours</option>
              <option value="1d">Daily</option>
            </select>
          </div>

          {/* Backtest Button */}
          <button
            onClick={onRunBacktest}
            disabled={disabled}
            className="bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
            title={disabled ? 'Add at least one entry condition to run backtest' : 'Run backtest'}
          >
            🚀 Run Backtest
          </button>
        </div>
      </div>
    </div>
  );
}