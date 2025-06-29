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
  onRunBacktest?: () => void;

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
 * - FIXED: Proper state sync when indicator changes
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

  // FIXED: Reset local params whenever the indicator changes (including ID change)
  useEffect(() => {
    console.log('Indicator changed in sidebar:', indicator.type, indicator.id);
    setLocalParams({ ...indicator.params }); // Create new object to force re-render
    setErrors({}); // Clear any previous errors
  }, [indicator.id, indicator.type, indicator.params]); // Added indicator.type to dependencies

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
    console.log('Parameter change:', key, value, 'for indicator:', indicator.type);
    
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
    if (paramConfig.type === 'number') {
      const parts = [];
      if (paramConfig.min !== undefined) parts.push(`min: ${paramConfig.min}`);
      if (paramConfig.max !== undefined) parts.push(`max: ${paramConfig.max}`);
      if (paramConfig.step !== undefined) parts.push(`step: ${paramConfig.step}`);
      return parts.length > 0 ? `(${parts.join(', ')})` : '';
    }
    return '';
  };

  /**
   * Render parameter input based on type
   */
  const renderParameterInput = (key: string, paramConfig: typeof config.parameters[string]) => {
    const currentValue = localParams[key] ?? paramConfig.defaultValue ?? '';

    if (paramConfig.type === 'select' && paramConfig.options) {
      return (
        <select
          value={currentValue}
          onChange={(e) => handleParameterChange(key, e.target.value)}
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {paramConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (paramConfig.type === 'number') {
      return (
        <PremiumSlider
          label=""
          value={Number(currentValue) || 0}
          min={paramConfig.min || 0}
          max={paramConfig.max || 100}
          step={paramConfig.step || 1}
          onChange={(value) => handleParameterChange(key, value)}
          className="w-full"
        />
      );
    }

    // Fallback to text input
    return (
      <input
        type="text"
        value={currentValue}
        onChange={(e) => handleParameterChange(key, e.target.value)}
        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder={`Enter ${paramConfig.label.toLowerCase()}`}
      />
    );
  };

  return (
    <div className="h-full flex flex-col bg-gray-900/50 backdrop-blur-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">{config.name}</h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <p className="text-gray-400 text-sm mb-3">{config.description}</p>
        
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full capitalize font-medium ${
            config.category === 'momentum' ? 'bg-blue-900/50 text-blue-300' :
            config.category === 'trend' ? 'bg-green-900/50 text-green-300' :
            config.category === 'volume' ? 'bg-yellow-900/50 text-yellow-300' :
            'bg-red-900/50 text-red-300'
          }`}>
            {config.category}
          </span>
          <span className="text-xs text-gray-500 font-mono">
            ID: {indicator.id.slice(0, 8)}
          </span>
        </div>
      </div>

      {/* Parameters - Scrollable */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-300 uppercase tracking-wide">
            Parameters
          </h4>
          
          {Object.entries(config.parameters).map(([key, paramConfig]) => (
            <div key={key} className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                {paramConfig.label}
              </label>
              
              {renderParameterInput(key, paramConfig)}
              
              {/* Error message */}
              {errors[key] && (
                <p className="text-red-400 text-xs">{errors[key]}</p>
              )}
              
              {/* Help text with range info */}
              <p className="text-gray-500 text-xs">
                {paramConfig.description} {getParameterRangeDescription(paramConfig)}
              </p>
            </div>
          ))}
        </div>

        {/* Current Values Display */}
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
          <h5 className="text-sm font-medium text-gray-300 mb-2">Current Values</h5>
          <div className="space-y-1">
            {Object.entries(localParams).map(([key, value]) => (
              <div key={key} className="flex justify-between text-xs">
                <span className="text-gray-400">{key}:</span>
                <span className="text-white font-mono">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer with Run Backtest */}
      {onRunBacktest && (
        <div className="p-6 border-t border-gray-700/30 flex-shrink-0">
          <button
            onClick={onRunBacktest}
            disabled={backtestDisabled}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-gray-700 disabled:to-gray-600 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
            title={backtestDisabled ? 'Add at least one entry condition' : 'Run backtest with current settings'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Run Backtest
          </button>
        </div>
      )}
    </div>
  );
}