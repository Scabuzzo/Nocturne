// src/app/(strategy)/build/_components/ParameterSidebar.tsx

import { useState, useEffect } from 'react';
import type { Indicator } from '@/_lib/types/strategy';
import { INDICATOR_CONFIG } from '@/_lib/constants/indicators';
import { PremiumSlider } from '@/_components/ui/PremiumSlider';

export interface ParameterSidebarProps {
  /**
   * The indicator being edited
   */
  indicator: Indicator;
  
  /**
   * Callback when parameters are updated
   */
  onUpdateParams: (id: string, newParams: Record<string, any>) => void;
  
  /**
   * Callback when sidebar is closed
   */
  onClose: () => void;

  /**
   * Callback when backtest is triggered
   */
  onRunBacktest: () => void;

  /**
   * Whether backtest button should be disabled
   */
  backtestDisabled?: boolean;
}

/**
 * Parameter editing sidebar for indicators
 * 
 * Features:
 * - Type-safe parameter editing
 * - Validation based on indicator configuration
 * - Real-time parameter updates
 * - Responsive design
 */
export function ParameterSidebar({
  indicator,
  onUpdateParams,
  onClose,
  onRunBacktest,
  backtestDisabled = false,
}: ParameterSidebarProps) {
  const config = INDICATOR_CONFIG[indicator.type];
  const [localParams, setLocalParams] = useState(indicator.params);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync local params when indicator changes
  useEffect(() => {
    setLocalParams(indicator.params);
    setErrors({}); // Clear any previous errors
  }, [indicator.id, indicator.params]);

  /**
   * Validate a parameter value
   */
  const validateParameter = (key: string, value: any): string | null => {
    const paramConfig = config.parameters[key];
    if (!paramConfig) return null;

    if (paramConfig.type === 'number') {
      const numValue = Number(value);
      if (isNaN(numValue)) return 'Must be a valid number';
      if (paramConfig.min !== undefined && numValue < paramConfig.min) {
        return `Must be at least ${paramConfig.min}`;
      }
      if (paramConfig.max !== undefined && numValue > paramConfig.max) {
        return `Must be at most ${paramConfig.max}`;
      }
    }

    return null;
  };

  /**
   * Handle parameter change
   */
  const handleParameterChange = (key: string, value: any) => {
    // Validate the value
    const error = validateParameter(key, value);
    setErrors(prev => ({
      ...prev,
      [key]: error || '',
    }));

    // Update local state
    const newParams = { ...localParams, [key]: value };
    setLocalParams(newParams);

    // If valid, update parent immediately
    if (!error) {
      onUpdateParams(indicator.id, newParams);
    }
  };

  /**
   * Get parameter range description
   */
  const getParameterRangeDescription = (paramConfig: typeof config.parameters[string]): string => {
    if (paramConfig.type === 'select') {
      return 'Select from available options';
    }
    
    if (paramConfig.min !== undefined && paramConfig.max !== undefined) {
      return `(${paramConfig.min}-${paramConfig.max})`;
    } else if (paramConfig.min !== undefined) {
      return `(min: ${paramConfig.min})`;
    } else if (paramConfig.max !== undefined) {
      return `(max: ${paramConfig.max})`;
    }
    
    return '';
  };

  /**
   * Render parameter input based on configuration
   */
  const renderParameterInput = (key: string, paramConfig: typeof config.parameters[string]) => {
    const value = localParams[key];
    const error = errors[key];

    if (paramConfig.type === 'select') {
      return (
        <select
          value={value}
          onChange={(e) => handleParameterChange(key, e.target.value)}
          className={`w-full p-3 rounded-lg bg-gray-800 border text-white focus:outline-none focus:ring-2 transition-all ${
            error 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-600 focus:ring-blue-500 hover:border-gray-500'
          }`}
        >
          {paramConfig.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    // Use premium slider for number inputs
    return (
      <PremiumSlider
        value={value || 0} // Ensure we always have a defined value
        min={paramConfig.min || 1}
        max={paramConfig.max || 100}
        step={paramConfig.step || 1}
        label=""
        onChange={(newValue) => handleParameterChange(key, newValue)}
        disabled={false}
      />
    );
  };

  return (
    <div className="w-80 bg-gray-900 border border-gray-700 flex flex-col h-screen sticky top-0">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{config.name}</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white transition-colors"
            title="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <p className="text-sm text-gray-400 mt-2">
          {config.description}
        </p>
        
        {/* Category Badge */}
        <div className="mt-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            config.category === 'momentum' ? 'bg-blue-900 text-blue-300' :
            config.category === 'trend' ? 'bg-green-900 text-green-300' :
            config.category === 'volume' ? 'bg-yellow-900 text-yellow-300' :
            'bg-red-900 text-red-300'
          }`}>
            {config.category}
          </span>
        </div>
      </div>

      {/* Parameters - Scrollable */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {Object.entries(config.parameters).map(([key, paramConfig]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {paramConfig.label}
            </label>
            
            {renderParameterInput(key, paramConfig)}
            
            {/* Error message */}
            {errors[key] && (
              <p className="text-red-400 text-xs mt-1">{errors[key]}</p>
            )}
            
            {/* Help text with range info */}
            <p className="text-gray-500 text-xs mt-1">
              {paramConfig.description} {getParameterRangeDescription(paramConfig)}
            </p>
          </div>
        ))}
      </div>

      {/* Footer with Run Backtest */}
      <div className="p-4 border-t border-gray-700 flex-shrink-0 space-y-4">
        {/* Run Backtest Button */}
        <button
          onClick={onRunBacktest}
          disabled={backtestDisabled}
          className="w-full bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          title={backtestDisabled ? 'Add at least one entry condition' : 'Run backtest with current settings'}
        >
          🚀 Run Backtest
        </button>

        {/* Indicator Info */}
        <div className="text-xs text-gray-500">
          <div className="flex justify-between">
            <span>Indicator ID:</span>
            <span className="font-mono">{indicator.id.slice(0, 8)}...</span>
          </div>
        </div>
      </div>
    </div>
  );
}