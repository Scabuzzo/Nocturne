// src/app/(strategy)/build/_components/RiskManagementPanel.tsx

import { useState } from 'react';
import type { RiskManagement } from '@/_lib/types/strategy';

export interface RiskManagementPanelProps {
  /**
   * Current risk management configuration
   */
  riskManagement: RiskManagement;
  
  /**
   * Callback when risk management is updated
   */
  onUpdate: (updates: Partial<RiskManagement>) => void;
}

/**
 * Risk management configuration panel
 * 
 * Features:
 * - Stop loss and take profit settings
 * - Position sizing controls
 * - Risk limits configuration
 * - Real-time validation
 */
export function RiskManagementPanel({
  riskManagement,
  onUpdate,
}: RiskManagementPanelProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * Validate a field value
   */
  const validateField = (field: string, value: number): string | null => {
    switch (field) {
      case 'stopLoss':
        if (value <= 0) return 'Stop loss must be greater than 0';
        if (value > 50) return 'Stop loss seems too high (>50%)';
        return null;
      
      case 'takeProfit':
        if (value <= 0) return 'Take profit must be greater than 0';
        if (value > 500) return 'Take profit seems too high (>500%)';
        return null;
      
      case 'positionSize':
        if (value <= 0) return 'Position size must be greater than 0';
        if (value > 10000) return 'Position size seems too large';
        return null;
      
      case 'maxDrawdown':
        if (value <= 0) return 'Max drawdown must be greater than 0';
        if (value > 100) return 'Max drawdown cannot exceed 100%';
        return null;
      
      case 'maxDailyLoss':
        if (value <= 0) return 'Max daily loss must be greater than 0';
        if (value > 50) return 'Max daily loss seems too high (>50%)';
        return null;
      
      default:
        return null;
    }
  };

  /**
   * Handle field change with validation
   */
  const handleFieldChange = (field: keyof RiskManagement, value: number) => {
    const error = validateField(field, value);
    
    setErrors(prev => ({
      ...prev,
      [field]: error || '',
    }));

    // Update if valid
    if (!error) {
      onUpdate({ [field]: value });
    }
  };

  /**
   * Handle trailing stop toggle
   */
  const handleTrailingStopToggle = (enabled: boolean) => {
    onUpdate({
      trailingStop: {
        enabled,
        percentage: enabled ? 2 : 0,
      },
    });
  };

  /**
   * Calculate risk-reward ratio
   */
  const riskRewardRatio = (riskManagement.takeProfit / riskManagement.stopLoss).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900/30 to-red-900/30 rounded-lg p-4 border border-amber-500/30">
        <h3 className="text-lg font-semibold text-white mb-2">
          🛡️ Risk Management
        </h3>
        <p className="text-amber-200 text-sm">
          Configure your risk parameters to protect your capital. These settings will apply to all trades.
        </p>
      </div>

      {/* Risk-Reward Summary */}
      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
        <h4 className="text-md font-medium text-white mb-3">Risk Summary</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">
              {riskManagement.stopLoss}%
            </div>
            <div className="text-xs text-gray-400">Risk per trade</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {riskManagement.takeProfit}%
            </div>
            <div className="text-xs text-gray-400">Reward per trade</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              1:{riskRewardRatio}
            </div>
            <div className="text-xs text-gray-400">Risk:Reward ratio</div>
          </div>
        </div>
      </div>

      {/* Position & Exit Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stop Loss */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Stop Loss (%)
          </label>
          <input
            type="number"
            step="0.1"
            min="0.1"
            max="50"
            value={riskManagement.stopLoss}
            onChange={(e) => handleFieldChange('stopLoss', Number(e.target.value))}
            className={`w-full p-3 rounded-lg bg-gray-800 border text-white focus:outline-none focus:ring-2 ${
              errors.stopLoss 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-600 focus:ring-blue-500'
            }`}
            placeholder="2.0"
          />
          {errors.stopLoss && (
            <p className="text-red-400 text-xs">{errors.stopLoss}</p>
          )}
          <p className="text-gray-500 text-xs">
            Maximum loss percentage before closing position
          </p>
        </div>

        {/* Take Profit */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Take Profit (%)
          </label>
          <input
            type="number"
            step="0.1"
            min="0.1"
            max="500"
            value={riskManagement.takeProfit}
            onChange={(e) => handleFieldChange('takeProfit', Number(e.target.value))}
            className={`w-full p-3 rounded-lg bg-gray-800 border text-white focus:outline-none focus:ring-2 ${
              errors.takeProfit 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-600 focus:ring-blue-500'
            }`}
            placeholder="4.0"
          />
          {errors.takeProfit && (
            <p className="text-red-400 text-xs">{errors.takeProfit}</p>
          )}
          <p className="text-gray-500 text-xs">
            Target profit percentage before closing position
          </p>
        </div>

        {/* Position Size */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Position Size (USD)
          </label>
          <input
            type="number"
            step="1"
            min="1"
            max="10000"
            value={riskManagement.positionSize}
            onChange={(e) => handleFieldChange('positionSize', Number(e.target.value))}
            className={`w-full p-3 rounded-lg bg-gray-800 border text-white focus:outline-none focus:ring-2 ${
              errors.positionSize 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-600 focus:ring-blue-500'
            }`}
            placeholder="100"
          />
          {errors.positionSize && (
            <p className="text-red-400 text-xs">{errors.positionSize}</p>
          )}
          <p className="text-gray-500 text-xs">
            USD amount to risk per trade
          </p>
        </div>

        {/* Max Drawdown */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Max Drawdown (%)
          </label>
          <input
            type="number"
            step="1"
            min="1"
            max="100"
            value={riskManagement.maxDrawdown}
            onChange={(e) => handleFieldChange('maxDrawdown', Number(e.target.value))}
            className={`w-full p-3 rounded-lg bg-gray-800 border text-white focus:outline-none focus:ring-2 ${
              errors.maxDrawdown 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-600 focus:ring-blue-500'
            }`}
            placeholder="20"
          />
          {errors.maxDrawdown && (
            <p className="text-red-400 text-xs">{errors.maxDrawdown}</p>
          )}
          <p className="text-gray-500 text-xs">
            Maximum acceptable portfolio drawdown
          </p>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-700">
        <h4 className="text-md font-medium text-white mb-4">Advanced Settings</h4>
        
        <div className="space-y-4">
          {/* Max Daily Loss */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Max Daily Loss (%)
            </label>
            <input
              type="number"
              step="0.5"
              min="0.5"
              max="50"
              value={riskManagement.maxDailyLoss}
              onChange={(e) => handleFieldChange('maxDailyLoss', Number(e.target.value))}
              className={`w-full p-3 rounded-lg bg-gray-800 border text-white focus:outline-none focus:ring-2 ${
                errors.maxDailyLoss 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-600 focus:ring-blue-500'
              }`}
              placeholder="5.0"
            />
            {errors.maxDailyLoss && (
              <p className="text-red-400 text-xs">{errors.maxDailyLoss}</p>
            )}
            <p className="text-gray-500 text-xs">
              Stop trading if daily loss exceeds this percentage
            </p>
          </div>

          {/* Trailing Stop */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">
                Trailing Stop Loss
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={riskManagement.trailingStop?.enabled || false}
                  onChange={(e) => handleTrailingStopToggle(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            {riskManagement.trailingStop?.enabled && (
              <div className="space-y-2">
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="10"
                  value={riskManagement.trailingStop?.percentage || 2}
                  onChange={(e) => onUpdate({
                    trailingStop: {
                      enabled: true,
                      percentage: Number(e.target.value),
                    },
                  })}
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="2.0"
                />
                <p className="text-gray-500 text-xs">
                  Trail stop loss by this percentage as price moves favorably
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}