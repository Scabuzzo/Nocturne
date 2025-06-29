// src/app/(strategy)/build/_components/RiskManagementPanel.tsx

import type { RiskManagement } from '@/_lib/types/strategy';
import { PremiumSlider } from '@/_components/ui/Slider';

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
      <div className="bg-gradient-to-r from-amber-900/20 to-red-900/20 rounded-lg p-6 border border-amber-500/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-amber-500/20 border border-amber-500/30 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white">
            Risk Management
          </h3>
        </div>
        <p className="text-amber-200 mb-3 text-sm">
          Configure your risk parameters to protect your capital. These settings will apply to all trades.
        </p>
        <div className="bg-amber-900/10 border border-amber-600/30 rounded-lg p-3">
          <p className="text-amber-300 text-xs">
            <strong>Risk-Reward Ratio:</strong> 1:{riskRewardRatio} | 
            <strong> Position Size:</strong> ${riskManagement.positionSize.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Risk Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stop Loss */}
        <div className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h4 className="text-white font-medium">Stop Loss</h4>
          </div>
          <PremiumSlider
            label="Stop Loss %"
            value={riskManagement.stopLoss}
            min={0.1}
            max={20}
            step={0.1}
            unit="%"
            onChange={(value) => onUpdate({ stopLoss: value })}
          />
          <p className="text-gray-400 text-sm mt-2">
            Maximum loss percentage before position is closed
          </p>
        </div>

        {/* Take Profit */}
        <div className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-white font-medium">Take Profit</h4>
          </div>
          <PremiumSlider
            label="Take Profit %"
            value={riskManagement.takeProfit}
            min={0.5}
            max={50}
            step={0.1}
            unit="%"
            onChange={(value) => onUpdate({ takeProfit: value })}
          />
          <p className="text-gray-400 text-sm mt-2">
            Target profit level where position is closed
          </p>
        </div>
      </div>

      {/* Position Sizing */}
      <div className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-purple-500/20 border border-purple-500/30 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h4 className="text-white font-medium">Position Sizing</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PremiumSlider
            label="Position Size"
            value={riskManagement.positionSize}
            min={100}
            max={50000}
            step={100}
            unit="$"
            onChange={(value) => onUpdate({ positionSize: value })}
          />
          
          {/* FIX: Changed maxDailyRisk to maxDailyLoss */}
          <PremiumSlider
            label="Max Daily Loss"
            value={riskManagement.maxDailyLoss}
            min={1}
            max={20}
            step={0.5}
            unit="%"
            onChange={(value) => onUpdate({ maxDailyLoss: value })}
          />
        </div>
        
        <p className="text-gray-400 text-sm mt-4">
          Fixed dollar amount per trade and maximum daily loss exposure
        </p>
      </div>

      {/* Risk Metrics */}
      <div className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-5">
        <h4 className="text-white font-medium mb-4">Risk Metrics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{riskRewardRatio}</div>
            <div className="text-xs text-gray-400">Risk:Reward</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              ${riskManagement.positionSize.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400">Position Size</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">
              ${Math.round(riskManagement.positionSize * (riskManagement.stopLoss / 100)).toLocaleString()}
            </div>
            <div className="text-xs text-gray-400">Max Loss</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-400">
              ${Math.round(riskManagement.positionSize * (riskManagement.takeProfit / 100)).toLocaleString()}
            </div>
            <div className="text-xs text-gray-400">Target Profit</div>
          </div>
        </div>
      </div>

      {/* Trailing Stop - FIX: Added null checking */}
      <div className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500/20 border border-indigo-500/30 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h4 className="text-white font-medium">Trailing Stop</h4>
          </div>
          <button
            onClick={() => handleTrailingStopToggle(!(riskManagement.trailingStop?.enabled || false))}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors
              ${riskManagement.trailingStop?.enabled
                ? 'bg-blue-600'
                : 'bg-gray-600'
              }
            `}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                ${riskManagement.trailingStop?.enabled
                  ? 'translate-x-6'
                  : 'translate-x-1'
                }
              `}
            />
          </button>
        </div>
        
        {riskManagement.trailingStop?.enabled && (
          <PremiumSlider
            label="Trailing Distance"
            value={riskManagement.trailingStop.percentage}
            min={0.5}
            max={10}
            step={0.1}
            unit="%"
            onChange={(value) => onUpdate({
              trailingStop: {
                enabled: true,
                percentage: value,
              },
            })}
          />
        )}
        
        <p className="text-gray-400 text-sm mt-2">
          {riskManagement.trailingStop?.enabled
            ? 'Stop loss will follow price movements to lock in profits'
            : 'Enable to automatically adjust stop loss as position moves in your favor'
          }
        </p>
      </div>
    </div>
  );
}