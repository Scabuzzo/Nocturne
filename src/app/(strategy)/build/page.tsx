// src/app/(strategy)/build/page.tsx

'use client';

import { useState } from 'react';
import type { Indicator, IndicatorType, Strategy, RiskManagement } from '@/_lib/types';
import { INDICATOR_CONFIG } from '@/_lib/constants/indicators';
import { BuilderTabs } from './_components/BuilderTabs';
import { StrategyBuilder } from './_components/StrategyBuilder';
import { RiskManagementPanel } from './_components/RiskManagementPanel';
import { ParameterSidebar } from './_components/ParameterSidebar';

export default function StrategyBuilderPage() {
  // Initialize strategy with proper defaults
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
      maxDrawdown: 20,
      maxDailyLoss: 5,
      trailingStop: {
        enabled: false,
        percentage: 2,
      },
    },
  });

  const [selectedIndicator, setSelectedIndicator] = useState<Indicator | null>(null);
  const [activeTab, setActiveTab] = useState<'entry' | 'exit' | 'risk'>('entry');

  // Available indicator types
  const availableIndicators: IndicatorType[] = ['RSI', 'Moving Average', 'MACD', 'Bollinger Bands'];

  /**
   * Add a new indicator
   */
  const addIndicator = (type: IndicatorType) => {
    const config = INDICATOR_CONFIG[type];
    const newIndicator: Indicator = {
      id: crypto.randomUUID(),
      type,
      params: { ...config.defaultParams },
    };

    const isEntry = activeTab === 'entry';
    setStrategy(prev => ({
      ...prev,
      [isEntry ? 'entryConditions' : 'exitConditions']: [
        ...prev[isEntry ? 'entryConditions' : 'exitConditions'],
        newIndicator,
      ],
    }));

    // Auto-select the new indicator for editing
    setSelectedIndicator(newIndicator);
  };

  /**
   * Remove an indicator
   */
  const removeIndicator = (id: string) => {
    const isEntry = activeTab === 'entry';
    setStrategy(prev => ({
      ...prev,
      [isEntry ? 'entryConditions' : 'exitConditions']: 
        prev[isEntry ? 'entryConditions' : 'exitConditions'].filter(i => i.id !== id),
    }));
    
    if (selectedIndicator?.id === id) {
      setSelectedIndicator(null);
    }
  };

  /**
   * Select an indicator for editing
   */
  const selectIndicator = (indicator: Indicator) => {
    setSelectedIndicator(indicator);
  };

  /**
   * Update indicator parameters
   */
  const updateIndicatorParams = (id: string, newParams: Record<string, any>) => {
    setStrategy(prev => ({
      ...prev,
      entryConditions: prev.entryConditions.map(i => 
        i.id === id ? { ...i, params: newParams } : i
      ),
      exitConditions: prev.exitConditions.map(i => 
        i.id === id ? { ...i, params: newParams } : i
      ),
    }));

    // Update selected indicator
    if (selectedIndicator?.id === id) {
      setSelectedIndicator(prev => prev ? { ...prev, params: newParams } : null);
    }
  };

  /**
   * Update risk management
   */
  const updateRiskManagement = (updates: Partial<RiskManagement>) => {
    setStrategy(prev => ({
      ...prev,
      riskManagement: { ...prev.riskManagement, ...updates },
    }));
  };

  /**
   * Update strategy metadata
   */
  const updateStrategyMeta = (field: keyof Pick<Strategy, 'name' | 'timeframe'>, value: any) => {
    setStrategy(prev => ({ ...prev, [field]: value }));
  };

  /**
   * Handle running backtest
   */
  const handleRunBacktest = () => {
    // TODO: Implement backtest logic
    console.log('Running backtest for strategy:', strategy);
    alert('Backtest functionality coming soon!');
  };

  /**
   * Get current indicators based on active tab
   */
  const getCurrentIndicators = (): Indicator[] => {
    return activeTab === 'entry' ? strategy.entryConditions : strategy.exitConditions;
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <input
                type="text"
                value={strategy.name}
                onChange={(e) => updateStrategyMeta('name', e.target.value)}
                className="text-3xl font-bold bg-transparent border-none outline-none text-white placeholder-gray-500"
                placeholder="Strategy Name"
              />
              <p className="text-gray-400 mt-1">
                Build your trading strategy with visual indicators
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Timeframe Selector */}
              <select
                value={strategy.timeframe}
                onChange={(e) => updateStrategyMeta('timeframe', e.target.value as Strategy['timeframe'])}
                className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="15m">15 minutes</option>
                <option value="1h">1 hour</option>
                <option value="4h">4 hours</option>
                <option value="1d">Daily</option>
              </select>

              {/* Backtest Button */}
              <button
                onClick={handleRunBacktest}
                disabled={strategy.entryConditions.length === 0}
                className="bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Run Backtest
              </button>
            </div>
          </div>

          {/* Builder Tabs */}
          <BuilderTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            entryCount={strategy.entryConditions.length}
            exitCount={strategy.exitConditions.length}
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Entry/Exit Conditions */}
          {(activeTab === 'entry' || activeTab === 'exit') && (
            <StrategyBuilder
              indicators={getCurrentIndicators()}
              availableIndicators={availableIndicators}
              selectedIndicator={selectedIndicator}
              onAddIndicator={addIndicator}
              onRemoveIndicator={removeIndicator}
              onSelectIndicator={selectIndicator}
              isEntry={activeTab === 'entry'}
            />
          )}

          {/* Risk Management */}
          {activeTab === 'risk' && (
            <RiskManagementPanel
              riskManagement={strategy.riskManagement}
              onUpdate={updateRiskManagement}
            />
          )}
        </div>
      </div>

      {/* Parameter Sidebar */}
      {selectedIndicator && (
        <ParameterSidebar
          indicator={selectedIndicator}
          onUpdateParams={updateIndicatorParams}
          onClose={() => setSelectedIndicator(null)}
        />
      )}
    </div>
  );
}