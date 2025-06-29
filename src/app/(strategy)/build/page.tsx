// src/app/(strategy)/build/page.tsx - Updated with maxRiskPerTrade

'use client';

import { useState } from 'react';
import type { IndicatorType } from '@/_lib/types/strategy';
import { useStrategy } from '@/_lib/hooks/useStrategy';

import { CompactHeader } from './_components/StrategyHeader';
import { IndicatorLibrary } from './_components/IndicatorLibrary';
import { IndicatorWorkspace } from './_components/IndicatorWorkspace';
import { ParameterSidebar } from './_components/ParameterSidebar';
import { RiskManagementPanel } from './_components/RiskManagementPanel';

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

  // Available indicator types with enhanced data for the library
  const availableIndicators: IndicatorType[] = ['RSI', 'Moving Average', 'MACD', 'Bollinger Bands'];
  const canRunBacktest = strategy?.entryConditions?.length > 0;

  const handleSave = () => {
    console.log('Saving strategy:', strategy);
    alert('Strategy saved as draft!');
  };

  const handleAddIndicator = (type: IndicatorType) => {
    addIndicator(type);
    // Auto-select the newly added indicator for editing
    // Note: We'll let the useStrategy hook handle the auto-selection
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-float opacity-60"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/15 rounded-full blur-2xl animate-pulse opacity-50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-cyan-600/10 rounded-full blur-2xl animate-float opacity-40" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <CompactHeader 
        strategy={strategy}
        onUpdate={updateStrategyMeta}
        onSave={handleSave}
        onRunBacktest={runBacktest}
        canRunBacktest={canRunBacktest}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8 min-h-[calc(100vh-280px)]">
          
          {/* Left Panel - Indicator Library */}
          <div className="col-span-3">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 hover:border-gray-600/40 transition-all duration-300 h-full">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                Indicator Library
              </h3>
              <IndicatorLibrary
                availableIndicators={availableIndicators}
                onAddIndicator={handleAddIndicator}
              />
            </div>
          </div>

          {/* Center Panel - Workspace */}
          <div className="col-span-6">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl hover:border-gray-600/40 transition-all duration-300 h-full">
              <IndicatorWorkspace
                indicators={strategy?.entryConditions || []}
                selectedIndicator={selectedIndicator}
                onSelectIndicator={setSelectedIndicator}
                onRemoveIndicator={removeIndicator}
                onUpdateParams={updateIndicatorParams}
                isEmpty={!strategy?.entryConditions?.length}
              />
            </div>
          </div>

          {/* Right Panel - Risk Management */}
          <div className="col-span-3">
            <RiskManagementPanel
              riskManagement={strategy?.riskManagement || {
                stopLoss: 0,
                positionSize: 0,
                maxRiskPerTrade: 0,
                takeProfit: 0,
                maxDrawdown: 0,
                maxDailyLoss: 0,
              }}
              onUpdate={updateRiskManagement}
            />
          </div>
        </div>
      </div>
    </div>
  );
}