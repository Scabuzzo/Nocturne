// src/_lib/types/strategy.ts

/**
 * Available indicator types
 */
export type IndicatorType = 
  | 'RSI' 
  | 'Moving Average' 
  | 'MACD' 
  | 'Bollinger Bands';

/**
 * Supported timeframes
 */
export type Timeframe = '15m' | '1h' | '4h' | '1d';

/**
 * Individual indicator configuration
 */
export interface Indicator {
  id: string;
  type: IndicatorType;
  params: Record<string, any>;
}

/**
 * Risk management configuration
 */
export interface RiskManagement {
  stopLoss: number;          // Percentage - Based on market structure or volatility
  positionSize: number;      // Percentage - Calculated from: risk per trade / SL %
  maxRiskPerTrade: number;   // Percentage - e.g. 1%
  takeProfit?: number;       // Percentage (kept for backward compatibility)
  maxDrawdown?: number;      // Maximum portfolio drawdown percentage (kept for backward compatibility)
  maxDailyLoss?: number;     // Maximum daily loss percentage (kept for backward compatibility)
  trailingStop?: {
    enabled: boolean;
    percentage: number;
  };
}

/**
 * Complete strategy configuration
 */
export interface Strategy {
  id: string;
  name: string;
  description?: string;
  timeframe: Timeframe;
  pair?: string;             // Trading pair (e.g., 'BTC/USDT')
  entryConditions: Indicator[];
  exitConditions: Indicator[];
  riskManagement: RiskManagement;
  isPublished?: boolean;     // Whether strategy is public
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Backtest result data
 */
export interface BacktestResult {
  id: string;
  strategyId: string;
  startDate: Date;
  endDate: Date;
  initialCapital: number;
  finalCapital: number;
  totalReturn: number;       // Percentage
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;          // Percentage
  profitFactor: number;
  maxDrawdown: number;      // Percentage
  sharpeRatio: number;
  trades: Trade[];
  equityCurve: EquityPoint[];
}

/**
 * Individual trade result
 */
export interface Trade {
  id: string;
  entryTime: Date;
  exitTime: Date;
  entryPrice: number;
  exitPrice: number;
  quantity: number;
  side: 'long' | 'short';
  pnl: number;              // Profit/Loss in USD
  pnlPercentage: number;    // Profit/Loss percentage
  fees: number;
  reason: 'take-profit' | 'stop-loss' | 'exit-signal';
}

/**
 * Equity curve data point
 */
export interface EquityPoint {
  timestamp: Date;
  equity: number;
  drawdown: number;
}