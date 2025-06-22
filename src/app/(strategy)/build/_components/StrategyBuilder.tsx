// src/app/(strategy)/build/_components/StrategyBuilder.tsx

import { IndicatorCard, EmptyIndicatorState } from './IndicatorCard';
import type { Indicator, IndicatorType } from '@/_lib/types/strategy';
import { INDICATOR_CONFIG } from '@/_lib/constants/indicators';

export interface StrategyBuilderProps {
  /**
   * Current indicators (entry or exit)
   */
  indicators: Indicator[];
  
  /**
   * Available indicator types
   */
  availableIndicators: IndicatorType[];
  
  /**
   * Currently selected indicator
   */
  selectedIndicator: Indicator | null;
  
  /**
   * Callback when adding a new indicator
   */
  onAddIndicator: (type: IndicatorType) => void;
  
  /**
   * Callback when removing an indicator
   */
  onRemoveIndicator: (id: string) => void;
  
  /**
   * Callback when selecting an indicator
   */
  onSelectIndicator: (indicator: Indicator) => void;
  
  /**
   * Whether this is for entry conditions
   */
  isEntry: boolean;
}

/**
 * Main strategy builder component
 * 
 * Features:
 * - Indicator management
 * - Drag and drop (future)
 * - Visual indicator building
 */
export function StrategyBuilder({
  indicators,
  availableIndicators,
  selectedIndicator,
  onAddIndicator,
  onRemoveIndicator,
  onSelectIndicator,
  isEntry,
}: StrategyBuilderProps) {
  /**
   * Group indicators by category for organized display
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

  /**
   * Handle adding first indicator (from empty state)
   */
  const handleAddFirst = () => {
    const firstIndicator = availableIndicators[0];
    if (firstIndicator) {
      onAddIndicator(firstIndicator);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Indicator Controls */}
      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">
          Add {isEntry ? 'Entry' : 'Exit'} Indicators
        </h3>
        
        {/* Indicators grouped by category */}
        <div className="space-y-4">
          {Object.entries(groupedIndicators).map(([category, types]) => (
            <div key={category}>
              <h4 className="text-sm font-medium text-gray-400 mb-2 capitalize">
                {category} Indicators
              </h4>
              
              <div className="flex flex-wrap gap-2">
                {types.map((type) => {
                  const config = INDICATOR_CONFIG[type];
                  return (
                    <button
                      key={type}
                      onClick={() => onAddIndicator(type)}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-all text-sm font-medium"
                      title={config.description}
                    >
                      <span className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: '#3B82F6' }} />
                      + {config.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Indicators */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            {isEntry ? 'Entry' : 'Exit'} Conditions ({indicators.length})
          </h3>
          
          {indicators.length > 0 && (
            <div className="text-sm text-gray-400">
              Click an indicator to edit its parameters
            </div>
          )}
        </div>

        {/* Indicator List */}
        {indicators.length > 0 ? (
          <div className="grid gap-4">
            {indicators.map((indicator) => (
              <IndicatorCard
                key={indicator.id}
                indicator={indicator}
                isSelected={selectedIndicator?.id === indicator.id}
                onSelect={onSelectIndicator}
                onRemove={onRemoveIndicator}
                isEntry={isEntry}
              />
            ))}
          </div>
        ) : (
          <EmptyIndicatorState 
            isEntry={isEntry} 
            onAddFirst={handleAddFirst}
          />
        )}
      </div>

      {/* Logic Builder (Future Enhancement) */}
      {indicators.length > 1 && (
        <div className="bg-gray-900/30 border border-gray-700 border-dashed rounded-lg p-6">
          <div className="text-center">
            <h4 className="text-lg font-medium text-gray-400 mb-2">
              Logic Combination (Coming Soon)
            </h4>
            <p className="text-gray-500 text-sm">
              Connect indicators with AND/OR logic for complex strategies
            </p>
          </div>
        </div>
      )}
    </div>
  );
}