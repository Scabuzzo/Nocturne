// src/_lib/hooks/useStrategy.ts

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
    positionSize: 1000,
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
  const router = useRouter();
  const [strategy, setStrategy] = useState<Strategy>({
    ...DEFAULT_STRATEGY,
    id: crypto.randomUUID(),
  });

  const [selectedIndicator, setSelectedIndicator] = useState<Indicator | null>(null);

  /**
   * Add a new indicator
   */
  const addIndicator = (type: IndicatorType) => {
    console.log('Adding indicator:', type);
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

    // Automatically select the newly added indicator
    console.log('Auto-selecting new indicator:', newIndicator);
    setSelectedIndicator(newIndicator);
  };

  /**
   * Remove an indicator
   */
  const removeIndicator = (id: string) => {
    console.log('Removing indicator:', id);
    setStrategy(prev => ({
      ...prev,
      entryConditions: prev.entryConditions.filter(i => i.id !== id),
    }));
    
    // Clear selection if removing the selected indicator
    if (selectedIndicator?.id === id) {
      console.log('Clearing selection because removed indicator was selected');
      setSelectedIndicator(null);
    }
  };

  /**
   * Update indicator parameters
   */
  const updateIndicatorParams = (id: string, newParams: Record<string, any>) => {
    console.log('Updating params for indicator:', id, newParams);
    setStrategy(prev => ({
      ...prev,
      entryConditions: prev.entryConditions.map(i => 
        i.id === id ? { ...i, params: newParams } : i
      ),
    }));

    // Update selectedIndicator to reflect the new params
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
   * Run backtest - navigate to results page
   */
  const runBacktest = () => {
    console.log('Running backtest for strategy:', strategy);
    
    if (strategy.entryConditions.length === 0) {
      alert('Please add at least one entry condition before running a backtest.');
      return;
    }

    // Navigate to results page with strategy data
    router.push('/results');
  };

  // FIX: Add debug logging for selection
  const handleSetSelectedIndicator = (indicator: Indicator | null) => {
    console.log('Setting selected indicator:', indicator?.type, indicator?.id);
    setSelectedIndicator(indicator);
  };

  return {
    strategy,
    selectedIndicator,
    addIndicator,
    removeIndicator,
    updateIndicatorParams,
    updateRiskManagement,
    updateStrategyMeta,
    runBacktest,
    setSelectedIndicator: handleSetSelectedIndicator, // FIX: Simple direct function with logging
  };
}