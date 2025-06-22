// src/app/(strategy)/build/_components/IndicatorLibrary.tsx

import type { IndicatorType } from '@/_lib/types/strategy';
import { INDICATOR_CONFIG } from '@/_lib/constants/indicators';

interface IndicatorLibraryProps {
  availableIndicators: IndicatorType[];
  onAddIndicator: (type: IndicatorType) => void;
}

/**
 * Clean sidebar library of available indicators
 */
export function IndicatorLibrary({ availableIndicators, onAddIndicator }: IndicatorLibraryProps) {
  const categoryIcons: Record<string, string> = {
    momentum: '⚡',
    trend: '📈',
    volatility: '🌊',
    volume: '📊',
  };

  const categoryColors: Record<string, string> = {
    momentum: 'from-blue-600 to-blue-500',
    trend: 'from-green-600 to-green-500',
    volatility: 'from-amber-600 to-amber-500',
    volume: 'from-purple-600 to-purple-500',
  };

  /**
   * Group indicators by category
   */
  const groupedIndicators = availableIndicators.reduce((groups, type) => {
    const config = INDICATOR_CONFIG[type];
    const category = config.category;
    
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(type);
    
    return groups;
  }, {} as Record<string, IndicatorType[]>);

  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-white mb-1">Indicator Library</h3>
        <p className="text-xs text-gray-400">Click to add indicators</p>
      </div>

      {Object.entries(groupedIndicators).map(([category, types]) => (
        <div key={category}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">{categoryIcons[category]}</span>
            <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
              {category}
            </h4>
          </div>
          
          <div className="space-y-2">
            {types.map((type) => {
              const config = INDICATOR_CONFIG[type];
              return (
                <button
                  key={type}
                  onClick={() => onAddIndicator(type)}
                  className="w-full p-3 bg-gray-800/50 hover:bg-gray-700/70 border border-gray-600/50 hover:border-gray-500 rounded-lg transition-all text-left group hover:scale-[1.01]"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 bg-gradient-to-br ${categoryColors[category]} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white text-sm">{categoryIcons[category]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-white group-hover:text-blue-300 transition-colors text-sm">
                        {config.name}
                      </h5>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                        {config.description}
                      </p>
                    </div>
                    <svg className="w-3 h-3 text-gray-400 group-hover:text-blue-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}