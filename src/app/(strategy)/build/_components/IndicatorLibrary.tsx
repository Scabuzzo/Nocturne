// src/app/(strategy)/build/_components/IndicatorLibrary.tsx

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { IndicatorType } from '@/_lib/types/strategy';
import { INDICATOR_CONFIG } from '@/_lib/constants/indicators';

interface IndicatorLibraryProps {
  availableIndicators: IndicatorType[];
  onAddIndicator: (type: IndicatorType) => void;
}

interface TooltipData {
  text: string;
  x: number;
  y: number;
}

/**
 * Enhanced indicator library with portal-based tooltip
 */
export function IndicatorLibrary({ availableIndicators, onAddIndicator }: IndicatorLibraryProps) {
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseEnter = (e: React.MouseEvent, description: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipData({
      text: description,
      x: rect.right + 10,
      y: rect.top + rect.height / 2,
    });
  };

  const handleMouseLeave = () => {
    setTooltipData(null);
  };

  // Enhanced indicator data with descriptions and popularity
  const enhancedIndicators = [
    { 
      type: 'RSI' as IndicatorType, 
      icon: '📊', 
      description: 'Relative Strength Index - Momentum oscillator that measures speed and change of price movements',
      category: 'Momentum',
      popularity: 95
    },
    { 
      type: 'Moving Average' as IndicatorType, 
      icon: '📈', 
      description: 'Simple/Exponential Moving Average - Trend following indicator that smooths price data',
      category: 'Trend',
      popularity: 98
    },
    { 
      type: 'MACD' as IndicatorType, 
      icon: '⚡', 
      description: 'Moving Average Convergence Divergence - Shows relationship between two moving averages',
      category: 'Momentum',
      popularity: 87
    },
    { 
      type: 'Bollinger Bands' as IndicatorType, 
      icon: '🎯', 
      description: 'Volatility and mean reversion indicator with upper and lower bands around moving average',
      category: 'Volatility',
      popularity: 82
    }
  ];

  return (
    <>
      <div className="space-y-3">
        {enhancedIndicators.map((indicator, index) => (
          <div
            key={indicator.type}
            className="group relative bg-gray-800/30 hover:bg-gray-800/60 border border-gray-700/50 hover:border-cyan-500/50 rounded-lg p-3 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:scale-[1.02] animate-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => onAddIndicator(indicator.type)}
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            
            <div className="relative z-10 flex items-center gap-3">
              <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                {indicator.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-white group-hover:text-cyan-100 transition-colors duration-200">
                    {indicator.type}
                  </h4>
                  {/* Info tooltip trigger */}
                  <svg 
                    className="w-3 h-3 text-gray-500 hover:text-gray-300 cursor-help transition-colors duration-200" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    onMouseEnter={(e) => handleMouseEnter(e, indicator.description)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex px-2 py-0.5 text-xs rounded-full border ${
                      indicator.category === 'Trend' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                      indicator.category === 'Momentum' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                      'bg-purple-500/20 text-purple-300 border-purple-500/30'
                    }`}>
                      {indicator.category}
                    </span>
                    <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                      {indicator.popularity}%
                    </span>
                  </div>
                  <svg className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Add Custom Indicator */}
        <div className="mt-4 pt-3 border-t border-gray-700/30">
          <button className="w-full p-3 border-2 border-dashed border-gray-600/50 hover:border-cyan-500/50 rounded-lg text-gray-400 hover:text-cyan-300 transition-all duration-300 group">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-sm font-medium">Add Custom Indicator</span>
            </div>
          </button>
        </div>
      </div>

      {/* Portal-based tooltip that renders outside the component tree */}
      {mounted && tooltipData && createPortal(
        <div 
          className="fixed pointer-events-none z-[99999] w-64 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-2xl border border-gray-700"
          style={{ 
            left: tooltipData.x, 
            top: tooltipData.y - 12,
            transform: 'translateY(-50%)'
          }}
        >
          {tooltipData.text}
          <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
        </div>,
        document.body
      )}
    </>
  );
}