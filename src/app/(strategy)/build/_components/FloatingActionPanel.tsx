// src/app/(strategy)/build/_components/FloatingActionPanel.tsx

interface FloatingActionPanelProps {
  canRunBacktest: boolean;
  onRunBacktest: () => void;
  onSave: () => void;
  entryConditionsCount: number;
}

/**
 * Floating action panel that stays visible while scrolling
 */
export function FloatingActionPanel({
  canRunBacktest,
  onRunBacktest,
  onSave,
  entryConditionsCount
}: FloatingActionPanelProps) {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 shadow-2xl shadow-black/50">
        <div className="flex items-center gap-4">
          {/* Status Indicator */}
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${
              canRunBacktest ? 'bg-green-400 shadow-lg shadow-green-400/50' : 'bg-yellow-400 shadow-lg shadow-yellow-400/50'
            }`}>
              {canRunBacktest && <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>}
            </div>
            <div className="text-sm">
              <div className="text-white font-medium">
                {canRunBacktest ? 'Ready to Test' : 'Add Indicators'}
              </div>
              <div className="text-gray-400 text-xs">
                {entryConditionsCount} condition{entryConditionsCount !== 1 ? 's' : ''} added
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onSave}
              className="p-2 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 hover:border-gray-500/50 text-gray-300 hover:text-white rounded-lg transition-all"
              title="Save Draft"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </button>
            
            <button
              onClick={onRunBacktest}
              disabled={!canRunBacktest}
              className={`
                px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 min-w-[140px] justify-center
                ${canRunBacktest 
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white hover:scale-105 shadow-lg shadow-green-500/25' 
                  : 'bg-gray-700/50 text-gray-400 cursor-not-allowed border border-gray-600/50'
                }
              `}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {canRunBacktest ? 'Run Backtest' : 'Add Indicators'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}