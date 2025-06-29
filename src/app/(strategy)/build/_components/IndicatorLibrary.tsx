// src/app/(strategy)/build/_components/IndicatorLibrary.tsx

import type { IndicatorType } from '@/_lib/types/strategy';
import { INDICATOR_CONFIG } from '@/_lib/constants/indicators';

interface IndicatorLibraryProps {
  availableIndicators: IndicatorType[];
  onAddIndicator: (type: IndicatorType) => void;
}

/**
 * Enhanced indicator library with futuristic design
 */
export function IndicatorLibrary({ availableIndicators, onAddIndicator }: IndicatorLibraryProps) {
  // Enhanced indicator data with descriptions and popularity
  const enhancedIndicators = [
    { 
      type: 'RSI' as IndicatorType, 
      icon: '📊', 
      description: 'Relative Strength Index - Momentum oscillator',
      category: 'Momentum',
      popularity: 95
    },
    { 
      type: 'Moving Average' as IndicatorType, 
      icon: '📈', 
      description: 'Simple/Exponential Moving Average - Trend following',
      category: 'Trend',
      popularity: 98
    },
    { 
      type: 'MACD' as IndicatorType, 
      icon: '⚡', 
      description: 'Moving Average Convergence Divergence',
      category: 'Momentum',
      popularity: 87
    },
    { 
      type: 'Bollinger Bands' as IndicatorType, 
      icon: '🎯', 
      description: 'Volatility and mean reversion indicator',
      category: 'Volatility',
      popularity: 82
    }
  ];

  return (
    <div className="space-y-3">
      {enhancedIndicators.map((indicator, index) => (
        <div
          key={indicator.type}
          className="group relative bg-gray-800/30 hover:bg-gray-800/60 border border-gray-700/50 hover:border-cyan-500/50 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:scale-[1.02] animate-in slide-in-from-bottom-4"
          style={{ animationDelay: `${index * 0.1}s` }}
          onClick={() => onAddIndicator(indicator.type)}
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
          
          <div className="relative z-10 flex items-start gap-3">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
              {indicator.icon}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-white group-hover:text-cyan-100 transition-colors duration-200">
                  {indicator.type}
                </h4>
                <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                  {indicator.popularity}% popular
                </span>
              </div>
              <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-200 leading-relaxed mb-2">
                {indicator.description}
              </p>
              <div className="flex items-center justify-between">
                <span className={`inline-flex px-2 py-1 text-xs rounded-full border ${
                  indicator.category === 'Trend' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                  indicator.category === 'Momentum' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                  'bg-purple-500/20 text-purple-300 border-purple-500/30'
                }`}>
                  {indicator.category}
                </span>
                <svg className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Add Custom Indicator */}
      <div className="mt-6 pt-4 border-t border-gray-700/30">
        <button className="w-full p-3 border-2 border-dashed border-gray-600/50 hover:border-cyan-500/50 rounded-lg text-gray-400 hover:text-cyan-300 transition-all duration-300 group">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-sm font-medium">Add Custom Indicator</span>
          </div>
        </button>
      </div>
    </div>
  );
}