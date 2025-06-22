// src/_lib/hooks/useStrategy.ts

import { useState } from 'react';
import type { Strategy, Indicator, IndicatorType, RiskManagement } from '@/_lib/types/strategy';
import { INDICATOR_CONFIG } from '@/_lib/constants/indicators';

const DEFAULT_STRATEGY: Strategy = {
  id: '',
  name: 'My Strategy',
  timeframe: '1h',
  pair: 'BTC/USDT',
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
};

/**
 * Custom hook for managing strategy state and operations
 */
export function useStrategy() {
  const [strategy, setStrategy] = useState<Strategy>({
    ...DEFAULT_STRATEGY,
    id: crypto.randomUUID(),
  });

  const [selectedIndicator, setSelectedIndicator] = useState<Indicator | null>(null);

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

    setStrategy(prev => ({
      ...prev,
      entryConditions: [...prev.entryConditions, newIndicator],
    }));

    setSelectedIndicator(newIndicator);
  };

  /**
   * Remove an indicator
   */
  const removeIndicator = (id: string) => {
    setStrategy(prev => ({
      ...prev,
      entryConditions: prev.entryConditions.filter(i => i.id !== id),
    }));
    
    if (selectedIndicator?.id === id) {
      setSelectedIndicator(null);
    }
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
    }));

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
  const updateStrategyMeta = (field: keyof Pick<Strategy, 'name' | 'timeframe' | 'pair'>, value: any) => {
    setStrategy(prev => ({ ...prev, [field]: value }));
  };

  /**
   * Run backtest (mock implementation)
   */
  const runBacktest = () => {
    console.log('Running backtest for strategy:', strategy);
    
    if (strategy.entryConditions.length === 0) {
      alert('Please add at least one entry condition before running a backtest.');
      return;
    }

    alert(`Strategy "${strategy.name}" ready for backtest!\n\nEntry conditions: ${strategy.entryConditions.length}\nTimeframe: ${strategy.timeframe}\nPair: ${strategy.pair}\nStop Loss: ${strategy.riskManagement.stopLoss}%\nTake Profit: ${strategy.riskManagement.takeProfit}%`);
  };

  return {
    // State
    strategy,
    selectedIndicator,
    
    // Actions
    addIndicator,
    removeIndicator,
    updateIndicatorParams,
    updateRiskManagement,
    updateStrategyMeta,
    runBacktest,
    setSelectedIndicator,
  };
}