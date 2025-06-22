// src/_lib/types/results.ts

export interface BacktestMetrics {
  // Core Performance
  totalReturn: number;          // Percentage
  totalReturnUSD: number;       // Dollar amount
  winRate: number;              // Percentage
  profitFactor: number;         // Ratio
  
  // Risk Metrics
  maxDrawdown: number;          // Percentage
  sharpeRatio: number;          // Ratio
  sortinoRatio: number;         // Ratio
  
  // Trade Statistics
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  averageWin: number;           // USD
  averageLoss: number;          // USD
  largestWin: number;           // USD
  largestLoss: number;          // USD
  
  // Time-based
  startDate: string;
  endDate: string;
  duration: string;             // "3 months", "1 year", etc.
}

export interface TradeResult {
  id: string;
  entryTime: string;
  exitTime: string;
  entryPrice: number;
  exitPrice: number;
  quantity: number;
  side: 'long' | 'short';
  pnl: number;                  // USD
  pnlPercentage: number;        // Percentage
  duration: string;             // "2h 30m", "1d 4h", etc.
  exitReason: 'take-profit' | 'stop-loss' | 'signal-exit';
}

export interface EquityPoint {
  timestamp: string;
  equity: number;               // Portfolio value in USD
  drawdown: number;             // Drawdown percentage at this point
}