// src/app/(strategy)/build/_components/ParameterSidebar.tsx

import { useState, useEffect } from 'react';
import type { Indicator } from '@/_lib/types/strategy';

export interface ParameterSidebarProps {
  indicator: Indicator;
  onUpdateParams: (id: string, newParams: Record<string, any>) => void;
  onClose: () => void;
  onRunBacktest?: () => void;
  backtestDisabled?: boolean;
}

/**
 * Enhanced parameter sidebar with full controls for each indicator type
 */
export function ParameterSidebar({
  indicator,
  onUpdateParams,
  onClose,
  onRunBacktest,
  backtestDisabled = false,
}: ParameterSidebarProps) {
  const [localParams, setLocalParams] = useState(indicator.params || {});

  useEffect(() => {
    setLocalParams(indicator.params || {});
  }, [indicator]);

  const updateParam = (key: string, value: any) => {
    const newParams = { ...localParams, [key]: value };
    setLocalParams(newParams);
    onUpdateParams(indicator.id, newParams);
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl hover:border-gray-600/40 transition-all duration-300 h-fit">
      {/* Header */}
      <div className="p-6 border-b border-gray-700/30">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
            {indicator.type} Parameters
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-400">Configure indicator settings and entry conditions</p>
      </div>

      {/* Parameters */}
      <div className="p-6 space-y-4">
        {/* RSI Parameters */}
        {indicator.type === 'RSI' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Period</label>
              <input
                type="number"
                value={localParams.period || 14}
                onChange={(e) => updateParam('period', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-all duration-200"
              />
              <p className="text-xs text-gray-500 mt-1">Number of periods for RSI calculation</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Overbought Level</label>
              <input
                type="number"
                value={localParams.overbought || 70}
                onChange={(e) => updateParam('overbought', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-all duration-200"
              />
              <p className="text-xs text-gray-500 mt-1">RSI level considered overbought</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Oversold Level</label>
              <input
                type="number"
                value={localParams.oversold || 30}
                onChange={(e) => updateParam('oversold', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-all duration-200"
              />
              <p className="text-xs text-gray-500 mt-1">RSI level considered oversold</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Entry Condition</label>
              <select 
                value={localParams.condition || 'crosses_below'}
                onChange={(e) => updateParam('condition', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-purple-500/50 transition-all duration-200"
              >
                <option value="crosses_above">Crosses above overbought</option>
                <option value="crosses_below">Crosses below oversold</option>
                <option value="above">Above level</option>
                <option value="below">Below level</option>
              </select>
            </div>
          </>
        )}

        {/* Moving Average Parameters */}
        {indicator.type === 'Moving Average' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
              <select 
                value={localParams.type || 'SMA'}
                onChange={(e) => updateParam('type', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-purple-500/50 transition-all duration-200"
              >
                <option value="SMA">Simple (SMA)</option>
                <option value="EMA">Exponential (EMA)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Period</label>
              <input
                type="number"
                value={localParams.period || 20}
                onChange={(e) => updateParam('period', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-all duration-200"
              />
              <p className="text-xs text-gray-500 mt-1">Number of periods for moving average</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Source</label>
              <select 
                value={localParams.source || 'close'}
                onChange={(e) => updateParam('source', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-purple-500/50 transition-all duration-200"
              >
                <option value="close">Close</option>
                <option value="open">Open</option>
                <option value="high">High</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Entry Condition</label>
              <select 
                value={localParams.condition || 'price_above'}
                onChange={(e) => updateParam('condition', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-purple-500/50 transition-all duration-200"
              >
                <option value="price_above">Price crosses above MA</option>
                <option value="price_below">Price crosses below MA</option>
                <option value="ma_rising">MA is rising</option>
                <option value="ma_falling">MA is falling</option>
              </select>
            </div>
          </>
        )}

        {/* MACD Parameters */}
        {indicator.type === 'MACD' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Fast Period</label>
              <input
                type="number"
                value={localParams.fastPeriod || 12}
                onChange={(e) => updateParam('fastPeriod', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Slow Period</label>
              <input
                type="number"
                value={localParams.slowPeriod || 26}
                onChange={(e) => updateParam('slowPeriod', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Signal Period</label>
              <input
                type="number"
                value={localParams.signalPeriod || 9}
                onChange={(e) => updateParam('signalPeriod', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Entry Condition</label>
              <select 
                value={localParams.condition || 'bullish_cross'}
                onChange={(e) => updateParam('condition', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-purple-500/50 transition-all duration-200"
              >
                <option value="bullish_cross">MACD crosses above signal</option>
                <option value="bearish_cross">MACD crosses below signal</option>
                <option value="above_zero">MACD above zero</option>
                <option value="below_zero">MACD below zero</option>
              </select>
            </div>
          </>
        )}

        {/* Bollinger Bands Parameters */}
        {indicator.type === 'Bollinger Bands' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Period</label>
              <input
                type="number"
                value={localParams.period || 20}
                onChange={(e) => updateParam('period', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Standard Deviation</label>
              <input
                type="number"
                value={localParams.stdDev || 2}
                step="0.1"
                onChange={(e) => updateParam('stdDev', parseFloat(e.target.value))}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Entry Condition</label>
              <select 
                value={localParams.condition || 'price_below_lower'}
                onChange={(e) => updateParam('condition', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-purple-500/50 transition-all duration-200"
              >
                <option value="price_above_upper">Price above upper band</option>
                <option value="price_below_lower">Price below lower band</option>
                <option value="squeeze">Bollinger squeeze</option>
                <option value="expansion">Band expansion</option>
              </select>
            </div>
          </>
        )}

        {/* Current Values Display */}
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30 mt-6">
          <h5 className="text-sm font-medium text-gray-300 mb-2">Current Values</h5>
          <div className="space-y-1">
            {Object.entries(localParams).map(([key, value]) => (
              <div key={key} className="flex justify-between text-xs">
                <span className="text-gray-400">{key}:</span>
                <span className="text-white font-mono">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Run Backtest Button */}
        {onRunBacktest && (
          <div className="pt-4 border-t border-gray-700/30">
            <button
              onClick={onRunBacktest}
              disabled={backtestDisabled}
              className={`w-full px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                backtestDisabled
                  ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              {backtestDisabled ? 'Add Indicators First' : 'Run Backtest'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}