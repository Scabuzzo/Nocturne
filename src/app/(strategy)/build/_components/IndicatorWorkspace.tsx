// src/app/(strategy)/build/_components/IndicatorWorkspace.tsx

import { useState } from 'react';
import type { Indicator } from '@/_lib/types/strategy';

interface IndicatorWorkspaceProps {
  indicators: Indicator[];
  selectedIndicator: Indicator | null;
  onSelectIndicator: (indicator: Indicator) => void;
  onRemoveIndicator: (id: string) => void;
  onUpdateParams: (id: string, newParams: Record<string, any>) => void;
  isEmpty: boolean;
}

/**
 * Enhanced workspace with dropdown parameter editors on each card
 */
export function IndicatorWorkspace({
  indicators,
  onRemoveIndicator,
  onUpdateParams,
  isEmpty,
}: IndicatorWorkspaceProps) {
  const [expandedIndicators, setExpandedIndicators] = useState<Set<string>>(new Set());

  const toggleIndicatorExpansion = (id: string) => {
    const newExpanded = new Set(expandedIndicators);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIndicators(newExpanded);
  };

  const updateParam = (indicatorId: string, key: string, value: any) => {
    const indicator = indicators.find(i => i.id === indicatorId);
    if (indicator) {
      const newParams = { ...indicator.params, [key]: value };
      onUpdateParams(indicatorId, newParams);
    }
  };

  const categoryIcons: Record<string, string> = {
    momentum: '⚡',
    trend: '📈',
    volatility: '🌊',
    volume: '📊',
  };

  if (isEmpty) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-800/60 to-gray-700/60 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-gray-700/30">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Start Building Your Strategy</h3>
          <p className="text-gray-400 leading-relaxed">
            Add indicators from the library on the left to define when your strategy should enter trades.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-300 text-sm mt-4">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            Click indicators on the left to add them
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-y-auto custom-scrollbar">
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            Strategy Workspace
          </h3>
          <div className="text-sm text-gray-400">
            {indicators.length} condition{indicators.length !== 1 ? 's' : ''} added
          </div>
        </div>

        <div className="space-y-4">
          {indicators.map((indicator, index) => {
            const isExpanded = expandedIndicators.has(indicator.id);
            
            return (
              <div key={indicator.id} className="relative">
                {/* Connection Line */}
                {index > 0 && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-600 font-medium">
                      AND
                    </div>
                  </div>
                )}
                
                {/* Indicator Card */}
                <div className="group relative bg-gray-800/40 border border-gray-700/50 rounded-xl transition-all duration-300 hover:border-gray-600/70 hover:shadow-lg hover:shadow-gray-900/20 animate-in slide-in-from-bottom-4"
                     style={{ animationDelay: `${index * 0.1}s` }}>
                  
                  {/* Header */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25">
                          <span className="text-white text-lg">📊</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-cyan-100 transition-colors duration-200">
                            {indicator.type}
                          </h3>
                          <p className="text-gray-400 text-xs">Entry condition #{index + 1}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Advanced Edit Button with clearer labeling */}
                        <button
                          onClick={() => toggleIndicatorExpansion(indicator.id)}
                          className={`group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                            isExpanded 
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                              : 'bg-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-700/70 border border-gray-600/30 hover:border-gray-500/50'
                          }`}
                          title="Configure indicator parameters"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                          </svg>
                          <span className="text-xs font-medium">
                            {isExpanded ? 'Hide Settings' : 'Settings'}
                          </span>
                          <svg 
                            className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {/* Remove Button - moved closer to the right edge */}
                        <button
                          onClick={() => onRemoveIndicator(indicator.id)}
                          className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all duration-200 border border-transparent hover:border-red-500/30"
                          title="Remove Indicator"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Parameter Editor */}
                  {isExpanded && (
                    <div className="border-t border-gray-700/30 bg-gray-800/20 p-4 rounded-b-xl animate-in slide-in-from-top-2">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                          </svg>
                          <h4 className="text-sm font-semibold text-purple-300">Advanced Settings</h4>
                        </div>

                        {/* Parameter Controls Based on Indicator Type */}
                        {indicator.type === 'RSI' && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Period</label>
                              <input
                                type="number"
                                value={indicator.params?.period || 14}
                                onChange={(e) => updateParam(indicator.id, 'period', parseInt(e.target.value))}
                                className="w-full px-2 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all duration-200"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Overbought</label>
                              <input
                                type="number"
                                value={indicator.params?.overbought || 70}
                                onChange={(e) => updateParam(indicator.id, 'overbought', parseInt(e.target.value))}
                                className="w-full px-2 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all duration-200"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Oversold</label>
                              <input
                                type="number"
                                value={indicator.params?.oversold || 30}
                                onChange={(e) => updateParam(indicator.id, 'oversold', parseInt(e.target.value))}
                                className="w-full px-2 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all duration-200"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Condition</label>
                              <select 
                                value={indicator.params?.condition || 'crosses_below'}
                                onChange={(e) => updateParam(indicator.id, 'condition', e.target.value)}
                                className="w-full px-2 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all duration-200"
                              >
                                <option value="crosses_below">Cross below oversold</option>
                                <option value="crosses_above">Cross above overbought</option>
                                <option value="above">Above level</option>
                                <option value="below">Below level</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {indicator.type === 'Moving Average' && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Type</label>
                              <select 
                                value={indicator.params?.type || 'SMA'}
                                onChange={(e) => updateParam(indicator.id, 'type', e.target.value)}
                                className="w-full px-2 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all duration-200"
                              >
                                <option value="SMA">Simple (SMA)</option>
                                <option value="EMA">Exponential (EMA)</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Period</label>
                              <input
                                type="number"
                                value={indicator.params?.period || 20}
                                onChange={(e) => updateParam(indicator.id, 'period', parseInt(e.target.value))}
                                className="w-full px-2 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all duration-200"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Source</label>
                              <select 
                                value={indicator.params?.source || 'close'}
                                onChange={(e) => updateParam(indicator.id, 'source', e.target.value)}
                                className="w-full px-2 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all duration-200"
                              >
                                <option value="close">Close</option>
                                <option value="open">Open</option>
                                <option value="high">High</option>
                                <option value="low">Low</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Condition</label>
                              <select 
                                value={indicator.params?.condition || 'price_above'}
                                onChange={(e) => updateParam(indicator.id, 'condition', e.target.value)}
                                className="w-full px-2 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all duration-200"
                              >
                                <option value="price_above">Price crosses above MA</option>
                                <option value="price_below">Price crosses below MA</option>
                                <option value="ma_rising">MA is rising</option>
                                <option value="ma_falling">MA is falling</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {indicator.type === 'MACD' && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Fast Period</label>
                              <input
                                type="number"
                                value={indicator.params?.fastPeriod || 12}
                                onChange={(e) => updateParam(indicator.id, 'fastPeriod', parseInt(e.target.value))}
                                className="w-full px-2 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all duration-200"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Slow Period</label>
                              <input
                                type="number"
                                value={indicator.params?.slowPeriod || 26}
                                onChange={(e) => updateParam(indicator.id, 'slowPeriod', parseInt(e.target.value))}
                                className="w-full px-2 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all duration-200"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Signal Period</label>
                              <input
                                type="number"
                                value={indicator.params?.signalPeriod || 9}
                                onChange={(e) => updateParam(indicator.id, 'signalPeriod', parseInt(e.target.value))}
                                className="w-full px-2 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all duration-200"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Condition</label>
                              <select 
                                value={indicator.params?.condition || 'bullish_cross'}
                                onChange={(e) => updateParam(indicator.id, 'condition', e.target.value)}
                                className="w-full px-2 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all duration-200"
                              >
                                <option value="bullish_cross">MACD crosses above signal</option>
                                <option value="bearish_cross">MACD crosses below signal</option>
                                <option value="above_zero">MACD above zero</option>
                                <option value="below_zero">MACD below zero</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {indicator.type === 'Bollinger Bands' && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Period</label>
                              <input
                                type="number"
                                value={indicator.params?.period || 20}
                                onChange={(e) => updateParam(indicator.id, 'period', parseInt(e.target.value))}
                                className="w-full px-2 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all duration-200"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">Std Deviation</label>
                              <input
                                type="number"
                                step="0.1"
                                value={indicator.params?.stdDev || 2}
                                onChange={(e) => updateParam(indicator.id, 'stdDev', parseFloat(e.target.value))}
                                className="w-full px-2 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all duration-200"
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="block text-xs font-medium text-gray-300 mb-1">Condition</label>
                              <select 
                                value={indicator.params?.condition || 'price_below_lower'}
                                onChange={(e) => updateParam(indicator.id, 'condition', e.target.value)}
                                className="w-full px-2 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all duration-200"
                              >
                                <option value="price_above_upper">Price above upper band</option>
                                <option value="price_below_lower">Price below lower band</option>
                                <option value="squeeze">Bollinger squeeze</option>
                                <option value="expansion">Band expansion</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {/* Current Values Summary */}
                        <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30 mt-4">
                          <h5 className="text-xs font-medium text-gray-300 mb-2">Current Configuration</h5>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {Object.entries(indicator.params || {}).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="text-gray-400">{key}:</span>
                                <span className="text-white font-mono">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}