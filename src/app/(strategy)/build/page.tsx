import React, { useState } from 'react';

// Types for our indicators
type IndicatorType = 'RSI' | 'Moving Average' | 'MACD' | 'Bollinger Bands';

type Indicator = {
  id: string;
  type: IndicatorType;
  params: Record<string, any>;
  position: { x: number; y: number };
};

type Strategy = {
  name: string;
  timeframe: '15m' | '1h' | '4h' | '1d';
  entryConditions: Indicator[];
  exitConditions: Indicator[];
  riskManagement: {
    stopLoss: number;
    takeProfit: number;
    positionSize: number;
  };
};

// Default parameters for each indicator type
const defaultParams: Record<IndicatorType, Record<string, any>> = {
  RSI: { period: 14, overbought: 70, oversold: 30 },
  'Moving Average': { type: 'SMA', period: 50 },
  'MACD': { fastPeriod: 12, slowPeriod: 26, signalPeriod: 9 },
  'Bollinger Bands': { period: 20, stdDev: 2 }
};

// Mock backtest function
const runBacktest = async (strategy: Strategy) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    totalReturn: 15.4,
    winRate: 67.3,
    maxDrawdown: -8.2,
    totalTrades: 143,
    equityCurve: Array.from({length: 30}, (_, i) => ({
      date: new Date(Date.now() - (30-i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: 10000 + Math.random() * 1000 + i * 50
    }))
  };
};

export default function EnhancedStrategyBuilder() {
  const [strategy, setStrategy] = useState<Strategy>({
    name: 'My Strategy',
    timeframe: '1h',
    entryConditions: [],
    exitConditions: [],
    riskManagement: {
      stopLoss: 2,
      takeProfit: 4,
      positionSize: 100
    }
  });
  
  const [selectedIndicator, setSelectedIndicator] = useState<Indicator | null>(null);
  const [isBacktesting, setIsBacktesting] = useState(false);
  const [backtestResults, setBacktestResults] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'entry' | 'exit' | 'risk'>('entry');

  const addIndicator = (type: IndicatorType, isEntry: boolean = true) => {
    const newIndicator: Indicator = {
      id: crypto.randomUUID(),
      type,
      params: { ...defaultParams[type] },
      position: { x: 0, y: 0 }
    };

    if (isEntry) {
      setStrategy(prev => ({
        ...prev,
        entryConditions: [...prev.entryConditions, newIndicator]
      }));
    } else {
      setStrategy(prev => ({
        ...prev,
        exitConditions: [...prev.exitConditions, newIndicator]
      }));
    }
  };

  const removeIndicator = (id: string, isEntry: boolean) => {
    if (isEntry) {
      setStrategy(prev => ({
        ...prev,
        entryConditions: prev.entryConditions.filter(i => i.id !== id)
      }));
    } else {
      setStrategy(prev => ({
        ...prev,
        exitConditions: prev.exitConditions.filter(i => i.id !== id)
      }));
    }
    
    if (selectedIndicator?.id === id) {
      setSelectedIndicator(null);
    }
  };

  const updateIndicatorParams = (id: string, newParams: Record<string, any>) => {
    setStrategy(prev => ({
      ...prev,
      entryConditions: prev.entryConditions.map(i => 
        i.id === id ? { ...i, params: newParams } : i
      ),
      exitConditions: prev.exitConditions.map(i => 
        i.id === id ? { ...i, params: newParams } : i
      )
    }));
  };

  const handleBacktest = async () => {
    setIsBacktesting(true);
    try {
      const results = await runBacktest(strategy);
      setBacktestResults(results);
    } catch (error) {
      console.error('Backtest failed:', error);
    } finally {
      setIsBacktesting(false);
    }
  };

  const IndicatorCard = ({ indicator, isEntry, onSelect, onRemove }: {
    indicator: Indicator;
    isEntry: boolean;
    onSelect: () => void;
    onRemove: () => void;
  }) => (
    <div
      className={`p-4 rounded-lg border cursor-pointer transition-all ${
        selectedIndicator?.id === indicator.id 
          ? 'border-blue-400 bg-blue-900/20' 
          : 'border-gray-600 bg-gray-800 hover:bg-gray-700'
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-white">{indicator.type}</h3>
          <p className="text-sm text-gray-400 mt-1">
            {Object.entries(indicator.params).map(([k, v]) => `${k}: ${v}`).join(', ')}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="text-red-400 hover:text-red-300 ml-2"
        >
          ✕
        </button>
      </div>
    </div>
  );

  const ParameterPanel = () => {
    if (!selectedIndicator) return null;

    return (
      <div className="w-80 bg-gray-900 border-l border-gray-700 p-6">
        <h2 className="text-xl font-bold text-white mb-4">
          {selectedIndicator.type} Settings
        </h2>
        
        {Object.entries(selectedIndicator.params).map(([key, value]) => (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <input
              type="number"
              className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white focus:border-blue-500 focus:outline-none"
              value={value}
              onChange={(e) => 
                updateIndicatorParams(selectedIndicator.id, {
                  ...selectedIndicator.params,
                  [key]: Number(e.target.value)
                })
              }
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="mb-6">
          <input
            type="text"
            value={strategy.name}
            onChange={(e) => setStrategy(prev => ({ ...prev, name: e.target.value }))}
            className="text-3xl font-bold bg-transparent border-none outline-none text-white"
          />
          
          <div className="flex gap-4 mt-4">
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
        </div>

        {/* Strategy Builder Tabs */}
        <div className="mb-6">
          <div className="flex gap-2 mb-4">
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

          {/* Tab Content */}
          {(activeTab === 'entry' || activeTab === 'exit') && (
            <div>
              <div className="flex gap-2 mb-4">
                {(['RSI', 'Moving Average', 'MACD', 'Bollinger Bands'] as IndicatorType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => addIndicator(type, activeTab === 'entry')}
                    className="bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded text-sm font-medium"
                  >
                    + {type}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {(activeTab === 'entry' ? strategy.entryConditions : strategy.exitConditions).map((indicator) => (
                  <IndicatorCard
                    key={indicator.id}
                    indicator={indicator}
                    isEntry={activeTab === 'entry'}
                    onSelect={() => setSelectedIndicator(indicator)}
                    onRemove={() => removeIndicator(indicator.id, activeTab === 'entry')}
                  />
                ))}
                
                {(activeTab === 'entry' ? strategy.entryConditions : strategy.exitConditions).length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    Add indicators to define your {activeTab} conditions
                  </div>
                )}
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
        </div>

        {/* Backtest Section */}
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Backtest Results</h2>
            <button
              onClick={handleBacktest}
              disabled={isBacktesting || strategy.entryConditions.length === 0}
              className="bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-2 rounded font-bold"
            >
              {isBacktesting ? 'Running...' : 'Run Backtest'}
            </button>
          </div>

          {backtestResults ? (
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-800 rounded p-4">
                <div className="text-2xl font-bold text-green-400">
                  {backtestResults.totalReturn.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-400">Total Return</div>
              </div>
              
              <div className="bg-gray-800 rounded p-4">
                <div className="text-2xl font-bold text-blue-400">
                  {backtestResults.winRate.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-400">Win Rate</div>
              </div>
              
              <div className="bg-gray-800 rounded p-4">
                <div className="text-2xl font-bold text-red-400">
                  {backtestResults.maxDrawdown.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-400">Max Drawdown</div>
              </div>
              
              <div className="bg-gray-800 rounded p-4">
                <div className="text-2xl font-bold text-white">
                  {backtestResults.totalTrades}
                </div>
                <div className="text-sm text-gray-400">Total Trades</div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              Configure your strategy and click "Run Backtest" to see results
            </div>
          )}
        </div>
      </div>

      {/* Parameter Sidebar */}
      <ParameterPanel />
    </div>
  );
}