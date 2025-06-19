'use client';

import { useState } from 'react';
import { StrategyIndicatorCard } from './_components/StrategyIndicatorCard';
import { ParameterSidebar } from './_components/ParameterSidebar';

type IndicatorType = 'RSI' | 'Moving Average';

type Indicator = {
  id: string;
  type: IndicatorType;
  params: Record<string, any>;
};

const defaultParams: Record<IndicatorType, Record<string, any>> = {
  RSI: { period: 14, overbought: 70, oversold: 30 },
  'Moving Average': { type: 'SMA', period: 50 },
};

export default function StrategyBuilderPage() {
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleAddIndicator = (type: IndicatorType) => {
    const newIndicator: Indicator = {
      id: crypto.randomUUID(),
      type,
      params: { ...defaultParams[type] },
    };
    setIndicators([...indicators, newIndicator]);
  };

  const handleRemoveIndicator = (id: string) => {
    setIndicators(indicators.filter((i) => i.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const handleSelectIndicator = (id: string) => {
    setSelectedId(id);
  };

  const handleParamChange = (id: string, newParams: Record<string, any>) => {
    setIndicators(indicators.map((i) =>
      i.id === id ? { ...i, params: newParams } : i
    ));
  };

  const selectedIndicator = indicators.find((i) => i.id === selectedId);

  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Strategy Builder</h1>

        <div className="flex gap-3 mb-4">
          <button
            onClick={() => handleAddIndicator('RSI')}
            className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-lg"
          >
            + Add RSI
          </button>
          <button
            onClick={() => handleAddIndicator('Moving Average')}
            className="bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded-lg"
          >
            + Add Moving Average
          </button>
        </div>

        <div className="grid gap-4">
          {indicators.map((indicator) => (
            <StrategyIndicatorCard
              key={indicator.id}
              indicator={indicator}
              isSelected={indicator.id === selectedId}
              onSelect={handleSelectIndicator}
              onRemove={handleRemoveIndicator}
            />
          ))}
        </div>

        <button className="mt-6 bg-green-600 hover:bg-green-500 px-6 py-3 rounded-lg font-bold">
          Backtest Strategy
        </button>
      </div>

      {/* Sidebar for editing */}
      {selectedIndicator && (
        <ParameterSidebar
          indicator={selectedIndicator}
          onChange={handleParamChange}
        />
      )}
    </div>
  );
}
