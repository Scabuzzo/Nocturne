// src/_lib/types/index.ts

/**
 * Basic types to get started
 */

export type IndicatorType = 
  | 'RSI' 
  | 'Moving Average' 
  | 'MACD' 
  | 'Bollinger Bands';

export type Timeframe = '15m' | '1h' | '4h' | '1d';

export interface Indicator {
  id: string;
  type: IndicatorType;
  params: Record<string, any>;
}

export interface Strategy {
  id: string;
  name: string;
  timeframe: Timeframe;
  entryConditions: Indicator[];
  exitConditions: Indicator[];
  riskManagement: {
    stopLoss: number;
    takeProfit: number;
    positionSize: number;
  };
}