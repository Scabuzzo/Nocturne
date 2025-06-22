// src/app/(strategy)/build/_components/StrategyHeader.tsx

import type { Strategy } from '@/_lib/types/strategy';

interface StrategyHeaderProps {
  strategy: Strategy;
  onUpdate: (field: keyof Pick<Strategy, 'name' | 'timeframe' | 'pair'>, value: any) => void;
}

/**
 * Strategy header with name, pair, and timeframe controls
 */
export function StrategyHeader({ strategy, onUpdate }: StrategyHeaderProps) {
  return (
    <div className="border-b border-gray-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 min-w-0">
          <input
            type="text"
            value={strategy.name}
            onChange={(e) => onUpdate('name', e.target.value)}
            className="text-3xl font-bold bg-transparent border-none outline-none text-white placeholder-gray-500 w-full"
            placeholder="Strategy Name"
          />
          <p className="text-gray-400 mt-1">
            Build your trading strategy with visual indicators. Exit based on stop loss/take profit ratios.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Trading Pair Selector */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-400 mb-1">Trading Pair</label>
            <select
              value={strategy.pair}
              onChange={(e) => onUpdate('pair', e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="BTC/USDT">BTC/USDT</option>
              <option value="ETH/USDT">ETH/USDT</option>
              <option value="SOL/USDT">SOL/USDT</option>
              <option value="ADA/USDT">ADA/USDT</option>
            </select>
          </div>

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
        </div>
      </div>
    </div>
  );
}