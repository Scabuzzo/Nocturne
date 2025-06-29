// src/app/(strategy)/build/_components/RiskManagementPanel.tsx

import type { RiskManagement } from '@/_lib/types/strategy';

export interface RiskManagementPanelProps {
  riskManagement: RiskManagement;
  onUpdate: (updates: Partial<RiskManagement>) => void;
}

/**
 * Risk management panel with updated inputs and placeholder examples
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
          <label className="block text-sm font-medium text-gray-300 mb-2">Position Size %</label>
          <input
            type="number"
            placeholder="2.5"
            step="0.1"
            value={riskManagement?.positionSize || ''}
            onChange={(e) => updateField('positionSize', parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-all duration-200"
          />
          <p className="text-xs text-gray-500 mt-1">Calculated from: risk per trade / SL %</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Stop Loss %</label>
          <input
            type="number"
            placeholder="1.5"
            step="0.1"
            value={riskManagement?.stopLoss || ''}
            onChange={(e) => updateField('stopLoss', parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-all duration-200"
          />
          <p className="text-xs text-gray-500 mt-1">Based on market structure or volatility</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Max Risk per Trade</label>
          <input
            type="number"
            placeholder="1"
            step="0.1"
            value={riskManagement?.maxRiskPerTrade || ''}
            onChange={(e) => updateField('maxRiskPerTrade', parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-all duration-200"
          />
          <p className="text-xs text-gray-500 mt-1">e.g. 1%</p>
        </div>
      </div>
    </div>
  );
}