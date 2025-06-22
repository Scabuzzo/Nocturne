// src/app/build/page.tsx

'use client';

import { useState } from 'react';
import type { Indicator, IndicatorType, Strategy } from '@/_lib/types';

const defaultParams = {
  RSI: { period: 14, overbought: 70, oversold: 30 },
  'Moving Average': { type: 'SMA', period: 50 },
  'MACD': { fastPeriod: 12, slowPeriod: 26, signalPeriod: 9 },
  'Bollinger Bands': { period: 20, stdDev: 2 },
};

export default function StrategyBuilderPage() {
  const [strategy, setStrategy] = useState<Strategy>({
    id: crypto.randomUUID(),
    name: 'My Strategy',
    timeframe: '1h',
    entryConditions: [],
    exitConditions: [],
    riskManagement: {
      stopLoss: 2,
      takeProfit: 4,
      positionSize: 100,
    },
  });

  const [selectedIndicator, setSelectedIndicator] = useState<Indicator | null>(null);
  const [activeTab, setActiveTab] = useState<'entry' | 'exit' | 'risk'>('entry');

  const addIndicator = (type: IndicatorType, isEntry: boolean = true) => {
    const newIndicator: Indicator = {
      id: crypto.randomUUID(),
      type,
      params: { ...defaultParams[type] },
    };

    setStrategy(prev => ({
      ...prev,
      [isEntry ? 'entryConditions' : 'exitConditions']: [
        ...prev[isEntry ? 'entryConditions' : 'exitConditions'],
        newIndicator,
      ],
    }));
  };

  const removeIndicator = (id: string, isEntry: boolean) => {
    setStrategy(prev => ({
      ...prev,
      [isEntry ? 'entryConditions' : 'exitConditions']: 
        prev[isEntry ? 'entryConditions' : 'exitConditions'].filter(i => i.id !== id),
    }));
    
    if (selectedIndicator?.id === id) {
      setSelectedIndicator(null);
    }
  };

  const updateParams = (id: string, newParams: Record<string, any>) => {
    setStrategy(prev => ({
      ...prev,
      entryConditions: prev.entryConditions.map(i => 
        i.id === id ? { ...i, params: newParams } : i
      ),
      exitConditions: prev.exitConditions.map(i => 
        i.id === id ? { ...i, params: newParams } : i
      ),
    }));
  };

  const getCurrentIndicators = () => {
    return activeTab === 'entry' ? strategy.entryConditions : strategy.exitConditions;
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">{strategy.name}</h1>
          <select
            value={strategy.timeframe}
            onChange={(e) => setStrategy(prev => ({ 
              ...prev, 
              timeframe: e.target.value as Strategy['timeframe']
            }))}
            className="bg-gray-800 border border-gray-600 rounded px-3 py-1"
          >
            <option value="15m">15 minutes</option>
            <option value="1h">1 hour</option>
            <option value="4h">4 hours</option>
            <option value="1d">Daily</option>
          </select>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {['entry', 'exit', 'risk'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded font-medium ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tab === 'entry' ? 'Entry Conditions' : 
               tab === 'exit' ? 'Exit Conditions' : 'Risk Management'}
            </button>
          ))}
        </div>

        {/* Content */}
        {(activeTab === 'entry' || activeTab === 'exit') && (
          <div>
            {/* Add buttons */}
            <div className="flex gap-2 mb-4">
              {(['RSI', 'Moving Average', 'MACD', 'Bollinger Bands'] as IndicatorType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => addIndicator(type, activeTab === 'entry')}
                  className="bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded text-sm"
                >
                  + {type}
                </button>
              ))}
            </div>

            {/* Indicators */}
            <div className="space-y-3">
              {getCurrentIndicators().map((indicator) => (
                <div
                  key={indicator.id}
                  className={`p-4 rounded-lg border cursor-pointer ${
                    selectedIndicator?.id === indicator.id 
                      ? 'border-blue-400 bg-blue-900/20' 
                      : 'border-gray-700 bg-gray-800 hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedIndicator(indicator)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{indicator.type}</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeIndicator(indicator.id, activeTab === 'entry');
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-sm text-gray-400">
                    {Object.entries(indicator.params).map(([k, v]) => `${k}: ${v}`).join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'risk' && (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Stop Loss (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={strategy.riskManagement.stopLoss}
                onChange={(e) => setStrategy(prev => ({
                  ...prev,
                  riskManagement: {
                    ...prev.riskManagement,
                    stopLoss: Number(e.target.value)
                  }
                }))}
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Take Profit (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={strategy.riskManagement.takeProfit}
                onChange={(e) => setStrategy(prev => ({
                  ...prev,
                  riskManagement: {
                    ...prev.riskManagement,
                    takeProfit: Number(e.target.value)
                  }
                }))}
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Position Size ($)
              </label>
              <input
                type="number"
                value={strategy.riskManagement.positionSize}
                onChange={(e) => setStrategy(prev => ({
                  ...prev,
                  riskManagement: {
                    ...prev.riskManagement,
                    positionSize: Number(e.target.value)
                  }
                }))}
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
              />
            </div>
          </div>
        )}

        <button className="mt-6 bg-green-600 hover:bg-green-500 px-6 py-3 rounded-lg font-bold">
          Run Backtest
        </button>
      </div>

      {/* Simple Parameter Sidebar */}
      {selectedIndicator && (
        <div className="w-80 bg-gray-900 border-l border-gray-700 p-4">
          <h2 className="text-xl font-bold mb-4">Edit {selectedIndicator.type}</h2>
          {Object.entries(selectedIndicator.params).map(([key, val]) => (
            <div key={key} className="mb-4">
              <label className="block text-sm font-medium mb-1">{key}</label>
              <input
                type="number"
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
                value={val}
                onChange={(e) => updateParams(selectedIndicator.id, {
                  ...selectedIndicator.params,
                  [key]: Number(e.target.value)
                })}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}