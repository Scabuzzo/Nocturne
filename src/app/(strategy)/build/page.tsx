// src/app/(strategy)/build/page.tsx

'use client';

import { useState } from 'react';
import type { IndicatorType } from '@/_lib/types/strategy';
import { useStrategy } from '@/_lib/hooks/useStrategy';

import { CompactHeader } from './_components/CompactHeader';
import { IndicatorLibrary } from './_components/IndicatorLibrary';
import { IndicatorWorkspace } from './_components/IndicatorWorkspace';
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

  const [activeSection, setActiveSection] = useState<'entry' | 'risk'>('entry');

  // Available indicator types
  const availableIndicators: IndicatorType[] = ['RSI', 'Moving Average', 'MACD', 'Bollinger Bands'];

  const canRunBacktest = strategy.entryConditions.length > 0;

  const handleSave = () => {
    console.log('Saving strategy:', strategy);
    alert('Strategy saved as draft!');
  };

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
              <ParameterSidebarClean
                indicator={selectedIndicator}
                onUpdateParams={updateIndicatorParams}
                onClose={() => setSelectedIndicator(null)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Clean Parameter Sidebar
 */
function ParameterSidebarClean({
  indicator,
  onUpdateParams,
  onClose,
}: {
  indicator: any;
  onUpdateParams: (id: string, params: any) => void;
  onClose: () => void;
}) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700/30">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-white">MACD</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800/30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <p className="text-sm text-gray-400 mb-3">
          Moving Average Convergence Divergence - trend following momentum indicator
        </p>
        
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300 border border-blue-500/30">
          momentum
        </div>
      </div>

      {/* Parameters */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">Fast Period</label>
          <div className="space-y-2">
            <input
              type="range"
              min="1"
              max="50"
              defaultValue="12"
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1</span>
              <span>50</span>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-2">Fast EMA period (1-50)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">Slow Period</label>
          <div className="space-y-2">
            <input
              type="range"
              min="10"
              max="100"
              defaultValue="26"
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>10</span>
              <span>100</span>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-2">Slow EMA period (10-100)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">Signal Period</label>
          <div className="space-y-2">
            <input
              type="range"
              min="1"
              max="50"
              defaultValue="9"
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1</span>
              <span>50</span>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-2">Signal line EMA period (1-50)</p>
        </div>
      </div>
    </div>
  );
}