// src/app/(strategy)/build/page.tsx

'use client';

import { useState } from 'react';
import type { IndicatorType } from '@/_lib/types/strategy';
import { useStrategy } from '@/_lib/hooks/useStrategy';

import { StreamlinedHeader } from './_components/StreamlinedHeader';
import { BuilderTabs } from './_components/BuilderTabs';
import { IndicatorLibrary } from './_components/IndicatorLibrary';
import { IndicatorWorkspace } from './_components/IndicatorWorkspace';
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

  const canRunBacktest = strategy.entryConditions.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900">
      {/* Streamlined Header */}
      <StreamlinedHeader 
        strategy={strategy}
        onUpdate={updateStrategyMeta}
        onSave={() => alert('Save feature coming soon!')}
        onRunBacktest={runBacktest}
        canRunBacktest={canRunBacktest}
      />

      {/* Workflow Tabs - Centered at top */}
      <div className="bg-gray-900/30 border-b border-gray-700/30 py-4">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center">
            <BuilderTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              entryCount={strategy.entryConditions.length}
            />
          </div>
          
          {/* Workflow Description */}
          <div className="text-center mt-3">
            <p className="text-sm text-gray-400">
              {activeTab === 'entry' 
                ? 'Step 1: Add indicators to define when to enter trades'
                : 'Step 2: Configure position sizing and risk parameters'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="flex h-[calc(100vh-200px)]">
        {/* Left Panel - Indicator Library */}
        <div className="w-72 bg-gray-900/50 border-r border-gray-700/50 flex flex-col">
          {activeTab === 'entry' && (
            <>
              <div className="p-4 border-b border-gray-700/50">
                <h3 className="text-lg font-bold text-white mb-1">Indicator Library</h3>
                <p className="text-xs text-gray-400">Click to add indicators</p>
              </div>
              <div className="flex-1 overflow-y-auto">
                <IndicatorLibrary
                  availableIndicators={availableIndicators}
                  onAddIndicator={addIndicator}
                />
              </div>
            </>
          )}
          
          {activeTab === 'risk' && (
            <div className="p-4">
              <div className="text-center text-gray-400 py-8">
                <div className="w-12 h-12 bg-amber-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  🛡️
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Risk Settings</h3>
                <p className="text-sm">Configure your risk parameters in the main area</p>
              </div>
            </div>
          )}
        </div>

        {/* Center Panel - Main Workspace */}
        <div className="flex-1 flex flex-col">
          {activeTab === 'entry' && (
            <IndicatorWorkspace
              indicators={strategy.entryConditions}
              selectedIndicator={selectedIndicator}
              onSelectIndicator={setSelectedIndicator}
              onRemoveIndicator={removeIndicator}
              isEmpty={strategy.entryConditions.length === 0}
            />
          )}
          
          {activeTab === 'risk' && (
            <div className="flex-1 p-8 overflow-y-auto">
              <RiskManagementPanel
                riskManagement={strategy.riskManagement}
                onUpdate={updateRiskManagement}
              />
            </div>
          )}
        </div>

        {/* Right Panel - Parameter Editor (when indicator selected) */}
        {selectedIndicator && activeTab === 'entry' && (
          <div className="w-80 bg-gray-900/80 border-l border-gray-700/50">
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
  );
}