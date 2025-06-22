// src/app/(strategy)/build/_components/IndicatorCard.tsx

import type { Indicator } from '@/_lib/types/strategy';
import { INDICATOR_CONFIG, INDICATOR_COLORS } from '@/_lib/constants/indicators';

export interface IndicatorCardProps {
  /**
   * The indicator to display
   */
  indicator: Indicator;
  
  /**
   * Whether this indicator is currently selected
   */
  isSelected: boolean;
  
  /**
   * Callback when the indicator is selected
   */
  onSelect: (indicator: Indicator) => void;
  
  /**
   * Callback when the indicator is removed
   */
  onRemove: (id: string) => void;
  
  /**
   * Whether this is an entry or exit condition
   */
  isEntry?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Card component for displaying and managing indicators
 * 
 * Features:
 * - Visual indicator representation
 * - Parameter summary
 * - Selection state
 * - Category-based styling
 */
export function IndicatorCard({
  indicator,
  isSelected,
  onSelect,
  onRemove,
  isEntry = true,
  className = '',
}: IndicatorCardProps) {
  const config = INDICATOR_CONFIG[indicator.type];
  const categoryColor = INDICATOR_COLORS[config.category];

  /**
   * Format parameter display
   */
  const formatParameters = (): string => {
    const entries = Object.entries(indicator.params);
    if (entries.length === 0) return 'No parameters';
    
    return entries
      .slice(0, 3) // Show max 3 parameters
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ') + (entries.length > 3 ? '...' : '');
  };

  /**
   * Handle click - select indicator
   */
  const handleClick = () => {
    onSelect(indicator);
  };

  /**
   * Handle remove click - prevent event bubbling
   */
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(indicator.id);
  };

  return (
    <div
      className={`
        relative p-4 rounded-lg border transition-all duration-200 cursor-pointer group
        ${isSelected 
          ? 'border-blue-400 bg-blue-900/20 shadow-lg shadow-blue-500/20' 
          : 'border-gray-700 bg-gray-800 hover:bg-gray-750 hover:border-gray-600'
        }
        ${className}
      `}
      onClick={handleClick}
    >
      {/* Category Color Accent */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
        style={{ backgroundColor: categoryColor }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white truncate">
            {config.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            {/* Category Badge */}
            <span 
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white"
              style={{ backgroundColor: `${categoryColor}40`, color: categoryColor }}
            >
              {config.category}
            </span>
            
            {/* Entry/Exit Badge */}
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
              isEntry 
                ? 'bg-green-900/40 text-green-400' 
                : 'bg-red-900/40 text-red-400'
            }`}>
              {isEntry ? 'Entry' : 'Exit'}
            </span>
          </div>
        </div>

        {/* Remove Button */}
        <button
          onClick={handleRemove}
          className="p-1 text-gray-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
          title="Remove indicator"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-400 mb-3 line-clamp-2">
        {config.description}
      </p>

      {/* Parameters */}
      <div className="space-y-2">
        <div className="text-xs text-gray-500 font-medium">Parameters:</div>
        <div className="text-sm text-gray-300 font-mono bg-gray-900/50 rounded p-2 truncate">
          {formatParameters()}
        </div>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full flex items-center justify-center">
            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Empty state component for when no indicators are present
 */
export function EmptyIndicatorState({ 
  isEntry, 
  onAddFirst 
}: { 
  isEntry: boolean; 
  onAddFirst: () => void; 
}) {
  return (
    <div className="text-center py-12 px-6">
      <div className="w-16 h-16 mx-auto mb-4 text-gray-600">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1} 
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
          />
        </svg>
      </div>
      
      <h3 className="text-lg font-medium text-gray-400 mb-2">
        No {isEntry ? 'entry' : 'exit'} conditions
      </h3>
      
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">
        Add indicators to define when your strategy should {isEntry ? 'enter' : 'exit'} trades.
      </p>
      
      <button
        onClick={onAddFirst}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add your first indicator
      </button>
    </div>
  );
}