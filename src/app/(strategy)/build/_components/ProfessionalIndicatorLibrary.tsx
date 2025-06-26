// src/app/(strategy)/build/_components/ProfessionalIndicatorLibrary.tsx

import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/_components/ui/Card';
import { Button } from '@/_components/ui/Button';
import type { IndicatorType } from '@/_lib/types';
import { INDICATOR_CONFIG, INDICATOR_COLORS } from '@/_lib/constants/indicators';

interface ProfessionalIndicatorLibraryProps {
  onAddIndicator: (type: IndicatorType) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function ProfessionalIndicatorLibrary({
  onAddIndicator,
  searchTerm,
  onSearchChange,
}: ProfessionalIndicatorLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const indicators = Object.entries(INDICATOR_CONFIG);
  
  const filteredIndicators = indicators.filter(([key, config]) => {
    const matchesSearch = config.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         config.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || config.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', name: 'All Indicators', count: indicators.length },
    { id: 'momentum', name: 'Momentum', count: indicators.filter(([_, c]) => c.category === 'momentum').length },
    { id: 'trend', name: 'Trend', count: indicators.filter(([_, c]) => c.category === 'trend').length },
    { id: 'volatility', name: 'Volatility', count: indicators.filter(([_, c]) => c.category === 'volatility').length },
    { id: 'volume', name: 'Volume', count: indicators.filter(([_, c]) => c.category === 'volume').length },
  ];

  return (
    <div className="w-80 border-r border-gray-800/30 bg-gray-950/50">
      {/* Header */}
      <div className="p-4 border-b border-gray-800/30">
        <h2 className="text-lg font-semibold text-white mb-3">Technical Indicators</h2>
        
        {/* Search */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search indicators..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-all"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 border-b border-gray-800/30">
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${selectedCategory === category.id
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                }
              `}
            >
              <span>{category.name}</span>
              <span className={`
                text-xs px-2 py-0.5 rounded-full
                ${selectedCategory === category.id
                  ? 'bg-blue-500/20 text-blue-300'
                  : 'bg-gray-700/50 text-gray-500'
                }
              `}>
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Indicators List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {filteredIndicators.length === 0 ? (
            <div className="text-center py-8">
              <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0118 12a8 8 0 01-8 8 8 8 0 01-8-8 8 8 0 018-8 7.962 7.962 0 014.291 1.255" />
              </svg>
              <p className="text-gray-400 text-sm">No indicators found</p>
            </div>
          ) : (
            filteredIndicators.map(([key, config]) => (
              <Card key={key} variant="glass" padding="none" hover>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ 
                        backgroundColor: `${INDICATOR_COLORS[config.category]}20`,
                        borderColor: `${INDICATOR_COLORS[config.category]}40`,
                        borderWidth: '1px'
                      }}
                    >
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: INDICATOR_COLORS[config.category] }}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-white truncate">
                          {config.name}
                        </h3>
                        <span 
                          className="text-xs px-2 py-0.5 rounded-full capitalize"
                          style={{ 
                            backgroundColor: `${INDICATOR_COLORS[config.category]}20`,
                            color: INDICATOR_COLORS[config.category]
                          }}
                        >
                          {config.category}
                        </span>
                      </div>
                      
                      <p className="text-xs text-gray-400 mb-3 line-clamp-2">
                        {config.description}
                      </p>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onAddIndicator(key as IndicatorType)}
                        className="w-full"
                        icon={
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        }
                      >
                        Add to Strategy
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}