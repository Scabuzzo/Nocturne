// src/_lib/constants/indicators.ts

import type { IndicatorType } from '@/_lib/types';

/**
 * Indicator categories for organization
 */
export type IndicatorCategory = 'momentum' | 'trend' | 'volatility' | 'volume';

/**
 * Color mapping for indicator categories
 */
export const INDICATOR_COLORS: Record<IndicatorCategory, string> = {
  momentum: '#3B82F6', // Blue
  trend: '#10B981',    // Green
  volatility: '#F59E0B', // Amber
  volume: '#8B5CF6',   // Purple
};

/**
 * Parameter configuration for indicator inputs
 */
export interface ParameterConfig {
  type: 'number' | 'select';
  label: string;
  description: string;
  min?: number;
  max?: number;
  step?: number;
  options?: Array<{ value: string | number; label: string }>;
}

/**
 * Indicator configuration
 */
export interface IndicatorConfig {
  name: string;
  description: string;
  category: IndicatorCategory;
  parameters: Record<string, ParameterConfig>;
  defaultParams: Record<string, any>;
}

/**
 * Configuration for all available indicators
 */
export const INDICATOR_CONFIG: Record<IndicatorType, IndicatorConfig> = {
  'RSI': {
    name: 'RSI',
    description: 'Relative Strength Index - measures momentum and identifies overbought/oversold conditions',
    category: 'momentum',
    parameters: {
      period: {
        type: 'number',
        label: 'Period',
        description: 'Number of periods to calculate RSI',
        min: 2,
        max: 100,
        step: 1,
      },
      overbought: {
        type: 'number',
        label: 'Overbought Level',
        description: 'RSI level considered overbought',
        min: 50,
        max: 100,
        step: 1,
      },
      oversold: {
        type: 'number',
        label: 'Oversold Level',
        description: 'RSI level considered oversold',
        min: 0,
        max: 50,
        step: 1,
      },
    },
    defaultParams: {
      period: 14,
      overbought: 70,
      oversold: 30,
    },
  },
  
  'Moving Average': {
    name: 'Moving Average',
    description: 'Simple or Exponential Moving Average - identifies trend direction',
    category: 'trend',
    parameters: {
      type: {
        type: 'select',
        label: 'MA Type',
        description: 'Type of moving average',
        options: [
          { value: 'SMA', label: 'Simple MA' },
          { value: 'EMA', label: 'Exponential MA' },
        ],
      },
      period: {
        type: 'number',
        label: 'Period',
        description: 'Number of periods for calculation',
        min: 1,
        max: 200,
        step: 1,
      },
    },
    defaultParams: {
      type: 'SMA',
      period: 50,
    },
  },
  
  'MACD': {
    name: 'MACD',
    description: 'Moving Average Convergence Divergence - trend following momentum indicator',
    category: 'momentum',
    parameters: {
      fastPeriod: {
        type: 'number',
        label: 'Fast Period',
        description: 'Fast EMA period',
        min: 1,
        max: 50,
        step: 1,
      },
      slowPeriod: {
        type: 'number',
        label: 'Slow Period',
        description: 'Slow EMA period',
        min: 10,
        max: 100,
        step: 1,
      },
      signalPeriod: {
        type: 'number',
        label: 'Signal Period',
        description: 'Signal line EMA period',
        min: 1,
        max: 50,
        step: 1,
      },
    },
    defaultParams: {
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9,
    },
  },
  
  'Bollinger Bands': {
    name: 'Bollinger Bands',
    description: 'Volatility indicator that creates a band around the moving average',
    category: 'volatility',
    parameters: {
      period: {
        type: 'number',
        label: 'Period',
        description: 'Number of periods for calculation',
        min: 2,
        max: 100,
        step: 1,
      },
      stdDev: {
        type: 'number',
        label: 'Standard Deviation',
        description: 'Number of standard deviations for bands',
        min: 0.1,
        max: 5,
        step: 0.1,
      },
    },
    defaultParams: {
      period: 20,
      stdDev: 2,
    },
  },
};