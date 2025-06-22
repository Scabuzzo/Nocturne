// src/_lib/constants/trading.ts

import type { Timeframe } from '@/_lib/types';

/**
 * Available trading pairs
 */
export const TRADING_PAIRS = [
  'BTC/USDT',
  'ETH/USDT', 
  'SOL/USDT',
  'ADA/USDT',
  'DOT/USDT',
] as const;

/**
 * Timeframe display labels
 */
export const TIMEFRAME_LABELS: Record<Timeframe, string> = {
  '15m': '15 Minutes',
  '1h': '1 Hour',
  '4h': '4 Hours',
  '1d': '1 Day',
};

/**
 * Default risk management settings
 */
export const DEFAULT_RISK_MANAGEMENT = {
  stopLoss: 2,
  takeProfit: 4,
  positionSize: 100,
  maxDrawdown: 20,
  maxDailyLoss: 5,
  trailingStop: {
    enabled: false,
    percentage: 2,
  },
};

/**
 * Minimum and maximum values for risk parameters
 */
export const RISK_LIMITS = {
  stopLoss: { min: 0.1, max: 50 },
  takeProfit: { min: 0.1, max: 500 },
  positionSize: { min: 1, max: 10000 },
  maxDrawdown: { min: 1, max: 100 },
  maxDailyLoss: { min: 0.5, max: 50 },
  trailingStopPercentage: { min: 0.1, max: 10 },
};