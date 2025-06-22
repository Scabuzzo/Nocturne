// src/_lib/utils/mockResults.ts

import type { BacktestMetrics, TradeResult, EquityPoint } from '@/_lib/types/results';
import type { Strategy } from '@/_lib/types/strategy';

/**
 * Generate realistic mock backtest results with proper risk-based position sizing
 */
export function generateMockResults(strategy: Strategy): {
  metrics: BacktestMetrics;
  trades: TradeResult[];
  equityCurve: EquityPoint[];
} {
  const initialCapital = 10000; // $10,000 starting capital
  const duration = 90; // 90 days
  
  // Generate trades based on strategy settings with realistic position sizing
  const trades = generateRealisticTrades(strategy, duration, initialCapital);
  
  // Calculate metrics from trades
  const metrics = calculateMetrics(trades, initialCapital, duration);
  
  // Generate equity curve
  const equityCurve = generateEquityCurve(trades, initialCapital);
  
  return { metrics, trades, equityCurve };
}

function generateRealisticTrades(strategy: Strategy, durationDays: number, initialCapital: number): TradeResult[] {
  const trades: TradeResult[] = [];
  let basePrice = 45000; // Starting BTC price - CHANGED FROM const TO let
  let currentCapital = initialCapital; // Track running capital for compounding
  
  // Simulate 1-3 trades per week based on timeframe
  const tradesPerWeek = strategy.timeframe === '15m' ? 3 : strategy.timeframe === '1h' ? 2 : 1;
  const totalTrades = Math.floor((durationDays / 7) * tradesPerWeek);
  
  // Risk percentages from strategy
  const riskPercentage = strategy.riskManagement.stopLoss / 100; // e.g., 0.02 for 2%
  const rewardPercentage = strategy.riskManagement.takeProfit / 100; // e.g., 0.04 for 4%
  
  for (let i = 0; i < totalTrades; i++) {
    const entryDate = new Date();
    entryDate.setDate(entryDate.getDate() - (durationDays - (i * (durationDays / totalTrades))));
    
    const exitDate = new Date(entryDate);
    const holdTime = Math.random() * 48 + 1; // 1-48 hours
    exitDate.setHours(exitDate.getHours() + holdTime);
    
    // Calculate realistic entry price with some randomness
    const priceMovement = (Math.random() - 0.5) * 0.2; // +/- 10% price variation
    const entryPrice = basePrice * (1 + priceMovement);
    
    // Calculate position size based on risk percentage of CURRENT capital
    const riskAmount = currentCapital * riskPercentage; // e.g., $200 for 2% of $10,000
    const quantity = riskAmount / (entryPrice * riskPercentage); // Position size to risk exactly $200
    
    // Determine if win or loss (aim for realistic 60% win rate)
    const isWin = Math.random() < 0.6;
    
    let exitPrice: number;
    let exitReason: TradeResult['exitReason'];
    let actualPnL: number;
    
    if (isWin) {
      // Hit take profit, but add some slippage and fees
      const perfectExitPrice = entryPrice * (1 + rewardPercentage);
      const slippage = (Math.random() - 0.5) * 0.001; // +/- 0.05% slippage
      const fees = 0.001; // 0.1% trading fees
      exitPrice = perfectExitPrice * (1 + slippage - fees);
      exitReason = 'take-profit';
    } else {
      // Hit stop loss, but add some slippage and fees
      const perfectExitPrice = entryPrice * (1 - riskPercentage);
      const slippage = (Math.random() - 0.5) * 0.001; // +/- 0.05% slippage
      const fees = 0.001; // 0.1% trading fees
      exitPrice = perfectExitPrice * (1 - slippage - fees); // Losses get worse with slippage
      exitReason = 'stop-loss';
    }
    
    // Calculate actual P&L
    actualPnL = (exitPrice - entryPrice) * quantity;
    const pnlPercentage = ((exitPrice - entryPrice) / entryPrice) * 100;
    
    // Update running capital for next trade (compounding effect)
    currentCapital += actualPnL;
    
    trades.push({
      id: `trade-${i + 1}`,
      entryTime: entryDate.toISOString(),
      exitTime: exitDate.toISOString(),
      entryPrice,
      exitPrice,
      quantity,
      side: 'long',
      pnl: actualPnL,
      pnlPercentage,
      duration: formatDuration(holdTime),
      exitReason,
    });
    
    // Update base price to simulate market movement over time
    basePrice *= (1 + (Math.random() - 0.5) * 0.02); // Gradual price drift - NOW WORKS!
  }
  
  return trades.sort((a, b) => new Date(a.entryTime).getTime() - new Date(b.entryTime).getTime());
}

function calculateMetrics(trades: TradeResult[], initialCapital: number, durationDays: number): BacktestMetrics {
  const totalPnL = trades.reduce((sum, trade) => sum + trade.pnl, 0);
  const winningTrades = trades.filter(t => t.pnl > 0);
  const losingTrades = trades.filter(t => t.pnl < 0);
  
  const totalReturn = (totalPnL / initialCapital) * 100;
  const winRate = trades.length > 0 ? (winningTrades.length / trades.length) * 100 : 0;
  
  const averageWin = winningTrades.length > 0 
    ? winningTrades.reduce((sum, t) => sum + t.pnl, 0) / winningTrades.length 
    : 0;
  const averageLoss = losingTrades.length > 0 
    ? Math.abs(losingTrades.reduce((sum, t) => sum + t.pnl, 0) / losingTrades.length)
    : 0;
  
  const profitFactor = averageLoss > 0 ? averageWin / averageLoss : 0;
  
  // Calculate more realistic drawdown based on running equity
  let runningEquity = initialCapital;
  let peakEquity = initialCapital;
  let maxDrawdownPercent = 0;
  
  trades.forEach(trade => {
    runningEquity += trade.pnl;
    if (runningEquity > peakEquity) {
      peakEquity = runningEquity;
    } else {
      const currentDrawdown = ((peakEquity - runningEquity) / peakEquity) * 100;
      maxDrawdownPercent = Math.max(maxDrawdownPercent, currentDrawdown);
    }
  });
  
  return {
    totalReturn,
    totalReturnUSD: totalPnL,
    winRate,
    profitFactor,
    maxDrawdown: maxDrawdownPercent,
    sharpeRatio: Math.random() * 2 + 0.5, // 0.5-2.5 Sharpe
    sortinoRatio: Math.random() * 3 + 1, // 1-4 Sortino
    totalTrades: trades.length,
    winningTrades: winningTrades.length,
    losingTrades: losingTrades.length,
    averageWin,
    averageLoss,
    largestWin: trades.length > 0 ? Math.max(...trades.map(t => t.pnl)) : 0,
    largestLoss: trades.length > 0 ? Math.min(...trades.map(t => t.pnl)) : 0,
    startDate: trades[0]?.entryTime || new Date().toISOString(),
    endDate: trades[trades.length - 1]?.exitTime || new Date().toISOString(),
    duration: `${durationDays} days`,
  };
}

function generateEquityCurve(trades: TradeResult[], initialCapital: number): EquityPoint[] {
  const points: EquityPoint[] = [
    {
      timestamp: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      equity: initialCapital,
      drawdown: 0,
    }
  ];
  
  let runningEquity = initialCapital;
  let peakEquity = initialCapital;
  
  trades.forEach(trade => {
    runningEquity += trade.pnl;
    peakEquity = Math.max(peakEquity, runningEquity);
    const drawdown = ((peakEquity - runningEquity) / peakEquity) * 100;
    
    points.push({
      timestamp: trade.exitTime,
      equity: runningEquity,
      drawdown,
    });
  });
  
  return points;
}

function formatDuration(hours: number): string {
  if (hours < 1) {
    return `${Math.round(hours * 60)}m`;
  } else if (hours < 24) {
    return `${Math.floor(hours)}h ${Math.round((hours % 1) * 60)}m`;
  } else {
    const days = Math.floor(hours / 24);
    const remainingHours = Math.floor(hours % 24);
    return `${days}d ${remainingHours}h`;
  }
}