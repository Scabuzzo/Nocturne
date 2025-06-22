// src/_lib/types/index.ts

/**
 * Re-export all types for easy importing
 */
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

// // Legacy exports for compatibility
// export type {
//   IndicatorType as Indicator,
//   Timeframe,
//   Strategy,
// } from './strategy';