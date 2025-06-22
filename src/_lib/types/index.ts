// src/_lib/types/index.ts

/**
 * Re-export all types for easy importing
 */

// Strategy types
export type {
  IndicatorType,
  Timeframe,
  Indicator,
  RiskManagement,
  Strategy,
  BacktestResult,
  Trade,
  EquityPoint,
} from './strategy';

// Results types
export type {
  BacktestMetrics,
  TradeResult,
  EquityPoint as ResultsEquityPoint,
} from './results';