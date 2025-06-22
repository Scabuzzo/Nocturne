// src/app/(strategy)/build/page.tsx

'use client';

import { useState } from 'react';
import type { IndicatorType } from '@/_lib/types/strategy';
import { useStrategy } from '@/_lib/hooks/useStrategy';

import { StrategyHeader } from './_components/StrategyHeader';
import { BuilderTabs } from './_components/BuilderTabs';
import { StrategyBuilder } from './_components/StrategyBuilder';
import { RiskManagementPanel } from './_components/RiskManagementPanel';
import { ParameterSidebar } from './_components/ParameterSidebar';

export default function StrategyBuilderPage() {
  const {
    strategy,
    selectedIndicator,
    addIndicator,
    removeIndicator,
    updateIndicatorParams,
    updateRiskManagement,
    updateStrategyMeta,
    runBacktest,
    setSelectedIndicator,
  } = useStrategy();

  const [activeTab, setActiveTab] = useState<'entry' | 'risk'>('entry');

  // Available indicator types
  const availableIndicators: IndicatorType[] = ['RSI', 'Moving Average', 'MACD', 'Bollinger Bands'];

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <StrategyHeader 
          strategy={strategy}
          onUpdate={updateStrategyMeta}
        />

        {/* Builder Tabs */}
        <div className="p-6 pb-0">
          <BuilderTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            entryCount={strategy.entryConditions.length}
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'entry' && (
            <StrategyBuilder
              indicators={strategy.entryConditions}
              availableIndicators={availableIndicators}
              selectedIndicator={selectedIndicator}
              onAddIndicator={addIndicator}
              onRemoveIndicator={removeIndicator}
              onSelectIndicator={setSelectedIndicator}
              isEntry={true}
            />
          )}

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
          onRunBacktest={runBacktest}
          backtestDisabled={strategy.entryConditions.length === 0}
        />
      )}
    </div>
  );
}