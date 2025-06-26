// src/app/(strategy)/build/_components/IndicatorWorkspace.tsx

import type { Indicator } from '@/_lib/types/strategy';
import { INDICATOR_CONFIG } from '@/_lib/constants/indicators';

interface IndicatorWorkspaceProps {
  indicators: Indicator[];
  selectedIndicator: Indicator | null;
  onSelectIndicator: (indicator: Indicator) => void;
  onRemoveIndicator: (id: string) => void;
  isEmpty: boolean;
}

/**
 * Main workspace for arranging and editing indicators
 */
export function IndicatorWorkspace({
  indicators,
  selectedIndicator,
  onSelectIndicator,
  onRemoveIndicator,
  isEmpty,
}: IndicatorWorkspaceProps) {
  const categoryIcons: Record<string, string> = {
    momentum: '⚡',
    trend: '📈',
    volatility: '🌊',
    volume: '📊',
  };

  if (isEmpty) {
    return (
      <div className="flex-1 flex items-center justify-left ml-7 mt-7">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Start Building Your Strategy</h3>
          <p className="text-gray-400 leading-relaxed">
            Add indicators from the library on the left to define when your strategy should enter trades.
            Start with popular indicators like RSI or Moving Averages.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">{indicators.length}</span>
          </div>
          Entry Conditions
        </h2>

        <div className="space-y-4">
          {indicators.map((indicator, index) => {
            const config = INDICATOR_CONFIG[indicator.type];
            const isSelected = selectedIndicator?.id === indicator.id;
            
            return (
              <div key={indicator.id} className="relative">
                {/* Connection Line */}
                {index > 0 && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full border border-gray-600 font-medium">
                      AND
                    </div>
                  </div>
                )}
                
                {/* Indicator Card */}
                <div
                  onClick={() => onSelectIndicator(indicator)}
                  className={`
                    group relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer
                    ${isSelected 
                      ? 'border-blue-400 bg-gradient-to-br from-blue-900/30 to-purple-900/20 shadow-xl shadow-blue-500/20' 
                      : 'border-gray-600/50 bg-gradient-to-br from-gray-800/60 to-gray-700/60 hover:border-gray-500 hover:shadow-lg'
                    }
                  `}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">{categoryIcons[config.category]}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{config.name}</h3>
                        <p className="text-gray-400 text-xs">{config.category.toUpperCase()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isSelected && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-blue-600/20 border border-blue-500/30 rounded-md">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-blue-300 font-medium">EDITING</span>
                        </div>
                      )}
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveIndicator(indicator.id);
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-md transition-all opacity-0 group-hover:opacity-100"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    {config.description}
                  </p>

                  {/* Parameters Preview */}
                  <div className="bg-gray-900/60 rounded-lg p-3 border border-gray-600/30">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                        Parameters
                      </span>
                      <span className="text-xs text-gray-500">Click to edit →</span>
                    </div>
                    <div className="text-sm text-gray-200 font-mono">
                      {Object.entries(indicator.params).length === 0 
                        ? 'Default settings'
                        : Object.entries(indicator.params)
                            .map(([key, value]) => `${key}: ${value}`)
                            .join(' • ')
                      }
                    </div>
                  </div>

                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}