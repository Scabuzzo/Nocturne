// src/app/(strategy)/build/_components/RiskManagementPanel.tsx

import type { RiskManagement } from '@/_lib/types/strategy';

export interface RiskManagementPanelProps {
  riskManagement: RiskManagement;
  onUpdate: (updates: Partial<RiskManagement>) => void;
}

/**
 * Optional risk management panel with placeholders and helpful descriptions
 */
export function RiskManagementPanel({
  riskManagement,
  onUpdate,
}: RiskManagementPanelProps) {
  const updateField = (field: keyof RiskManagement, value: number) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 hover:border-gray-600/40 transition-all duration-300">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
        Risk Management
        <span className="text-xs text-gray-500 font-normal">(optional)</span>
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Stop Loss %</label>
          <input
            type="number"
            placeholder="e.g. 2.0"
            step="0.1"
            value={riskManagement?.stopLoss || ''}
            onChange={(e) => updateField('stopLoss', parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-all duration-200"
          />
          <p className="text-xs text-gray-500 mt-1">Maximum loss before position closes</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Take Profit %</label>
          <input
            type="number"
            placeholder="e.g. 5.0"
            step="0.1"
            value={riskManagement?.takeProfit || ''}
            onChange={(e) => updateField('takeProfit', parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-all duration-200"
          />
          <p className="text-xs text-gray-500 mt-1">Target profit to close position</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Position Size %</label>
          <input
            type="number"
            placeholder="e.g. 10"
            step="1"
            value={riskManagement?.positionSize || ''}
            onChange={(e) => updateField('positionSize', parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-all duration-200"
          />
          <p className="text-xs text-gray-500 mt-1">Percentage of portfolio per trade</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Max Drawdown %</label>
          <input
            type="number"
            placeholder="e.g. 15"
            step="1"
            value={riskManagement?.maxDrawdown || ''}
            onChange={(e) => updateField('maxDrawdown', parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-all duration-200"
          />
          <p className="text-xs text-gray-500 mt-1">Maximum total portfolio decline</p>
        </div>

        {/* Risk Summary (only show if values are entered) */}
        {(riskManagement?.stopLoss && riskManagement?.takeProfit) && (
          <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30 mt-4">
            <h5 className="text-sm font-medium text-gray-300 mb-2">Risk Summary</h5>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Risk/Reward Ratio:</span>
                <span className="text-white font-mono">
                  1:{(riskManagement.takeProfit / riskManagement.stopLoss).toFixed(2)}
                </span>
              </div>
              {riskManagement.positionSize && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Max Risk per Trade:</span>
                  <span className="text-red-400 font-mono">
                    {((riskManagement.positionSize * riskManagement.stopLoss) / 100).toFixed(2)}%
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}