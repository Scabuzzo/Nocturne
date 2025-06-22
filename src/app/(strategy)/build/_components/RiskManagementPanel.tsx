// src/app/(strategy)/build/_components/RiskManagementPanel.tsx

import { useState } from 'react';
import type { RiskManagement } from '@/_lib/types/strategy';
import { PremiumSlider } from '@/_components/ui/PremiumSlider';

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
 * Risk management configuration panel with premium sliders
 * 
 * Features:
 * - Stop loss and take profit settings
 * - Position sizing controls
 * - Risk limits configuration
 * - Premium slider interface
 */
export function RiskManagementPanel({
  riskManagement,
  onUpdate,
}: RiskManagementPanelProps) {
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
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900/30 to-red-900/30 rounded-lg p-6 border border-amber-500/30">
        <h3 className="text-xl font-semibold text-white mb-3">
          🛡️ Risk Management
        </h3>
        <p className="text-amber-200 mb-3">
          Configure your risk parameters to protect your capital. These settings will apply to all trades.
          <span className="block mt-2 text-amber-300 font-medium">
            Exit Strategy: Ratio-based (Stop Loss & Take Profit only)
          </span>
        </p>
        
        {/* Play Money Notice */}
        <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 mt-4">
          <div className="flex items-start gap-3">
            <div className="text-blue-400 text-lg">💰</div>
            <div>
              <h5 className="text-blue-400 font-medium mb-1">Virtual Trading Capital</h5>
              <p className="text-blue-200 text-sm">
                These are <strong>simulated dollar amounts</strong> for backtesting purposes. Experience the psychology 
                of real money management without financial risk. See how strategies perform with realistic position sizes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Risk-Reward Summary */}
      <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
        <h4 className="text-lg font-medium text-white mb-4">Risk Summary</h4>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400 mb-1">
              {riskManagement.stopLoss}%
            </div>
            <div className="text-sm text-gray-400">Risk per trade</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">
              {riskManagement.takeProfit}%
            </div>
            <div className="text-sm text-gray-400">Reward per trade</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-1">
              1:{riskRewardRatio}
            </div>
            <div className="text-sm text-gray-400">Risk:Reward ratio</div>
          </div>
        </div>
      </div>

      {/* Position & Exit Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Stop Loss */}
        <div className="space-y-3">
          <PremiumSlider
            value={riskManagement.stopLoss}
            min={0.5}
            max={20}
            step={0.25}
            label="Stop Loss"
            unit="%"
            onChange={(value) => onUpdate({ stopLoss: value })}
          />
          <p className="text-gray-500 text-sm">
            Maximum loss percentage before closing position
          </p>
        </div>

        {/* Take Profit */}
        <div className="space-y-3">
          <PremiumSlider
            value={riskManagement.takeProfit}
            min={1}
            max={50}
            step={0.5}
            label="Take Profit"
            unit="%"
            onChange={(value) => onUpdate({ takeProfit: value })}
          />
          <p className="text-gray-500 text-sm">
            Target profit percentage before closing position
          </p>
        </div>

        {/* Position Size */}
        <div className="space-y-3">
          <PremiumSlider
            value={riskManagement.positionSize}
            min={50}
            max={5000}
            step={25}
            label="Position Size"
            unit=" USD"
            onChange={(value) => onUpdate({ positionSize: value })}
          />
          <p className="text-gray-500 text-sm">
            <strong>Virtual USD</strong> amount to risk per trade (for backtesting)
          </p>
        </div>

        {/* Max Drawdown */}
        <div className="space-y-3">
          <PremiumSlider
            value={riskManagement.maxDrawdown}
            min={5}
            max={50}
            step={2.5}
            label="Max Drawdown"
            unit="%"
            onChange={(value) => onUpdate({ maxDrawdown: value })}
          />
          <p className="text-gray-500 text-sm">
            Maximum acceptable portfolio drawdown
          </p>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="bg-gray-900/30 rounded-lg p-6 border border-gray-700">
        <h4 className="text-lg font-medium text-white mb-6">Advanced Settings</h4>
        
        <div className="space-y-6">
          {/* Max Daily Loss */}
          <div className="space-y-3">
            <PremiumSlider
              value={riskManagement.maxDailyLoss}
              min={1}
              max={25}
              step={1}
              label="Max Daily Loss"
              unit="%"
              onChange={(value) => onUpdate({ maxDailyLoss: value })}
            />
            <p className="text-gray-500 text-sm">
              Stop trading if daily loss exceeds this percentage
            </p>
          </div>

          {/* Trailing Stop */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-300">
                  Trailing Stop Loss
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Automatically adjust stop loss as price moves favorably
                </p>
              </div>
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
              <div className="space-y-3 pl-4 border-l-2 border-blue-500/30">
                <PremiumSlider
                  value={riskManagement.trailingStop?.percentage || 2}
                  min={0.5}
                  max={10}
                  step={0.25}
                  label="Trailing Distance"
                  unit="%"
                  onChange={(value) => onUpdate({
                    trailingStop: {
                      enabled: true,
                      percentage: value,
                    },
                  })}
                />
                <p className="text-gray-500 text-sm">
                  Trail stop loss by this percentage as price moves favorably
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Risk Warning */}
      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-red-400 text-xl">⚠️</div>
          <div>
            <h5 className="text-red-400 font-medium mb-1">Risk Disclaimer</h5>
            <p className="text-red-300 text-sm">
              Trading carries significant risk. Only trade with capital you can afford to lose. 
              Past performance does not guarantee future results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}