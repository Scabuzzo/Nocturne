// src/app/(strategy)/build/page.tsx

'use client';

import { useState } from 'react';
import type { IndicatorType } from '@/_lib/types/strategy';
import { useStrategy } from '@/_lib/hooks/useStrategy';

import { CompactHeader } from './_components/StrategyHeader';
import { IndicatorLibrary } from './_components/IndicatorLibrary';
import { IndicatorWorkspace } from './_components/IndicatorWorkspace';
import { RiskManagementPanel } from './_components/RiskManagementPanel';
import { ParameterSidebar } from './_components/ParameterSidebar'; // FIX: Import the real component

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

  const [activeSection, setActiveSection] = useState<'entry' | 'risk'>('entry');

  // Available indicator types
  const availableIndicators: IndicatorType[] = ['RSI', 'Moving Average', 'MACD', 'Bollinger Bands'];

  const canRunBacktest = strategy.entryConditions.length > 0;

  const handleSave = () => {
    console.log('Saving strategy:', strategy);
    alert('Strategy saved as draft!');
  };

  // FIX: Add debug logging
  console.log('Build page render - selectedIndicator:', selectedIndicator?.type, selectedIndicator?.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900">
      {/* Compact Header with integrated tabs */}
      <CompactHeader 
        strategy={strategy}
        onUpdate={updateStrategyMeta}
        onSave={handleSave}
        onRunBacktest={runBacktest}
        canRunBacktest={canRunBacktest}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        entryCount={strategy.entryConditions.length}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex gap-6">
          {/* Left Panel - Context sensitive */}
          <div className="w-80 bg-gray-900/30 border border-gray-700/30 rounded-xl flex flex-col">
            {activeSection === 'entry' ? (
              <div className="flex-1 overflow-y-auto">
                <IndicatorLibrary
                  availableIndicators={availableIndicators}
                  onAddIndicator={addIndicator}
                />
              </div>
            ) : (
              <div className="p-6">
                <div className="text-center text-gray-400 py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-600/20 to-orange-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">Risk Settings</h3>
                  <p className="text-sm leading-relaxed">Configure stop loss, take profit, and position sizing in the main area</p>
                </div>
              </div>
            )}
          </div>

          {/* Main Workspace */}
          <div className="flex-1 bg-gray-900/20 border border-gray-700/20 rounded-xl">
            {activeSection === 'entry' ? (
              <IndicatorWorkspace
                indicators={strategy.entryConditions}
                selectedIndicator={selectedIndicator}
                onSelectIndicator={setSelectedIndicator}
                onRemoveIndicator={removeIndicator}
                isEmpty={strategy.entryConditions.length === 0}
              />
            ) : (
              <div className="p-8">
                <RiskManagementPanel
                  riskManagement={strategy.riskManagement}
                  onUpdate={updateRiskManagement}
                />
              </div>
            )}
          </div>

          {/* Right Panel - Parameter Editor (only for entry mode) */}
          {selectedIndicator && activeSection === 'entry' && (
            <div className="w-80 bg-gray-900/40 border border-gray-700/30 rounded-xl backdrop-blur-sm">
              {/* FIX: Use the real ParameterSidebar component */}
              <ParameterSidebar
                indicator={selectedIndicator}
                onUpdateParams={updateIndicatorParams}
                onClose={() => setSelectedIndicator(null)}
                onRunBacktest={runBacktest}
                backtestDisabled={!canRunBacktest}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}