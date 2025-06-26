// src/app/dashboard/history/page.tsx

'use client';

import { useState } from 'react';

interface HistoryItem {
  id: string;
  type: 'backtest' | 'bot';
  strategyName: string;
  pair: string;
  timeframe: string;
  startDate: string;
  endDate?: string;
  duration: string;
  initialCapital: number;
  finalValue: number;
  totalReturn: number;
  totalReturnPercent: number;
  totalTrades: number;
  winRate: number;
  maxDrawdown: number;
  sharpeRatio: number;
  status: 'completed' | 'stopped' | 'error';
  indicators: string[];
  notes?: string;
  tags: string[];
}

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'backtests' | 'bots'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'return' | 'winRate' | 'trades'>('date');
  const [dateFilter, setDateFilter] = useState<'all' | '7d' | '30d' | '90d'>('all');

  // Mock data - in production, this would come from your API
  const historyItems: HistoryItem[] = [
    {
      id: 'hist-1',
      type: 'bot',
      strategyName: 'RSI Divergence Pro',
      pair: 'BTC/USDT',
      timeframe: '1h',
      startDate: '2024-06-20',
      endDate: '2024-06-24',
      duration: '4 days',
      initialCapital: 10000,
      finalValue: 10847.50,
      totalReturn: 847.50,
      totalReturnPercent: 8.47,
      totalTrades: 23,
      winRate: 73.9,
      maxDrawdown: 4.2,
      sharpeRatio: 1.85,
      status: 'stopped',
      indicators: ['RSI', 'Moving Average'],
      notes: 'Manually stopped due to market volatility',
      tags: ['profitable', 'momentum'],
    },
    {
      id: 'hist-2',
      type: 'backtest',
      strategyName: 'MACD Golden Cross',
      pair: 'ETH/USDT',
      timeframe: '4h',
      startDate: '2024-06-19',
      duration: '90 days',
      initialCapital: 5000,
      finalValue: 5234.80,
      totalReturn: 234.80,
      totalReturnPercent: 4.70,
      totalTrades: 15,
      winRate: 66.7,
      maxDrawdown: 8.1,
      sharpeRatio: 1.32,
      status: 'completed',
      indicators: ['MACD', 'Moving Average'],
      tags: ['trending', 'long-term'],
    },
    {
      id: 'hist-3',
      type: 'backtest',
      strategyName: 'Bollinger Band Squeeze',
      pair: 'SOL/USDT',
      timeframe: '1h',
      startDate: '2024-06-18',
      duration: '30 days',
      initialCapital: 3000,
      finalValue: 2785.30,
      totalReturn: -214.70,
      totalReturnPercent: -7.16,
      totalTrades: 28,
      winRate: 42.9,
      maxDrawdown: 15.3,
      sharpeRatio: -0.45,
      status: 'completed',
      indicators: ['Bollinger Bands', 'Volume'],
      notes: 'Poor performance in trending market',
      tags: ['volatility', 'unprofitable'],
    },
    {
      id: 'hist-4',
      type: 'bot',
      strategyName: 'Momentum Breakout',
      pair: 'ADA/USDT',
      timeframe: '1h',
      startDate: '2024-06-15',
      endDate: '2024-06-17',
      duration: '2 days',
      initialCapital: 2000,
      finalValue: 1850.25,
      totalReturn: -149.75,
      totalReturnPercent: -7.49,
      totalTrades: 12,
      winRate: 33.3,
      maxDrawdown: 12.8,
      sharpeRatio: -0.78,
      status: 'error',
      indicators: ['RSI', 'MACD'],
      notes: 'Bot stopped due to API connection error',
      tags: ['error', 'short-term'],
    },
    {
      id: 'hist-5',
      type: 'backtest',
      strategyName: 'Mean Reversion Pro',
      pair: 'BTC/USDT',
      timeframe: '1h',
      startDate: '2024-06-10',
      duration: '60 days',
      initialCapital: 8000,
      finalValue: 9240.60,
      totalReturn: 1240.60,
      totalReturnPercent: 15.51,
      totalTrades: 45,
      winRate: 68.9,
      maxDrawdown: 6.7,
      sharpeRatio: 2.15,
      status: 'completed',
      indicators: ['RSI', 'Bollinger Bands'],
      tags: ['profitable', 'mean-reversion'],
    },
    {
      id: 'hist-6',
      type: 'backtest',
      strategyName: 'Triple EMA Crossover',
      pair: 'LINK/USDT',
      timeframe: '2h',
      startDate: '2024-06-05',
      duration: '45 days',
      initialCapital: 4000,
      finalValue: 4320.15,
      totalReturn: 320.15,
      totalReturnPercent: 8.00,
      totalTrades: 19,
      winRate: 63.2,
      maxDrawdown: 9.4,
      sharpeRatio: 1.21,
      status: 'completed',
      indicators: ['Moving Average', 'Volume'],
      tags: ['trending', 'crossover'],
    },
  ];

  const filteredItems = historyItems
    .filter(item => {
      const matchesTab = activeTab === 'all' || 
                       (activeTab === 'backtests' && item.type === 'backtest') ||
                       (activeTab === 'bots' && item.type === 'bot');
      
      const matchesSearch = item.strategyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.pair.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesDate = dateFilter === 'all' || (() => {
        const itemDate = new Date(item.startDate);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24));
        
        switch (dateFilter) {
          case '7d': return daysDiff <= 7;
          case '30d': return daysDiff <= 30;
          case '90d': return daysDiff <= 90;
          default: return true;
        }
      })();
      
      return matchesTab && matchesSearch && matchesDate;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'return':
          return b.totalReturnPercent - a.totalReturnPercent;
        case 'winRate':
          return b.winRate - a.winRate;
        case 'trades':
          return b.totalTrades - a.totalTrades;
        default:
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      }
    });

  const exportToCSV = () => {
    const headers = [
      'Strategy Name', 'Type', 'Pair', 'Timeframe', 'Start Date', 'End Date', 
      'Duration', 'Initial Capital', 'Final Value', 'Total Return', 'Return %', 
      'Total Trades', 'Win Rate', 'Max Drawdown', 'Sharpe Ratio', 'Status', 'Notes'
    ];
    
    const csvContent = [
      headers.join(','),
      ...filteredItems.map(item => [
        item.strategyName,
        item.type,
        item.pair,
        item.timeframe,
        item.startDate,
        item.endDate || '',
        item.duration,
        item.initialCapital,
        item.finalValue,
        item.totalReturn,
        item.totalReturnPercent,
        item.totalTrades,
        item.winRate,
        item.maxDrawdown,
        item.sharpeRatio,
        item.status,
        item.notes || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nocturne-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: HistoryItem['status']) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-900/30 border-green-500/50';
      case 'stopped': return 'text-yellow-400 bg-yellow-900/30 border-yellow-500/50';
      case 'error': return 'text-red-400 bg-red-900/30 border-red-500/50';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-500/50';
    }
  };

  const getTypeIcon = (type: HistoryItem['type']) => {
    return type === 'backtest' ? '📊' : '🤖';
  };

  const stats = {
    totalItems: historyItems.length,
    totalBacktests: historyItems.filter(item => item.type === 'backtest').length,
    totalBots: historyItems.filter(item => item.type === 'bot').length,
    totalPnL: historyItems.reduce((sum, item) => sum + item.totalReturn, 0),
    avgWinRate: historyItems.reduce((sum, item) => sum + item.winRate, 0) / historyItems.length,
    profitable: historyItems.filter(item => item.totalReturn > 0).length,
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Trading History</h1>
          <p className="text-gray-400">Review your completed backtests and bot deployments</p>
        </div>
        
        <button 
          onClick={exportToCSV}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          📁 Export CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-xl p-4 text-center">
          <div className="text-lg font-bold text-white">{stats.totalItems}</div>
          <div className="text-xs text-gray-400">Total</div>
        </div>
        
        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-xl p-4 text-center">
          <div className="text-lg font-bold text-blue-400">{stats.totalBacktests}</div>
          <div className="text-xs text-gray-400">Backtests</div>
        </div>
        
        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-xl p-4 text-center">
          <div className="text-lg font-bold text-green-400">{stats.totalBots}</div>
          <div className="text-xs text-gray-400">Bots</div>
        </div>
        
        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-xl p-4 text-center">
          <div className={`text-lg font-bold ${stats.totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {stats.totalPnL >= 0 ? '+' : ''}${stats.totalPnL.toFixed(0)}
          </div>
          <div className="text-xs text-gray-400">Total P&L</div>
        </div>
        
        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-xl p-4 text-center">
          <div className="text-lg font-bold text-yellow-400">{stats.avgWinRate.toFixed(1)}%</div>
          <div className="text-xs text-gray-400">Avg Win Rate</div>
        </div>
        
        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-xl p-4 text-center">
          <div className="text-lg font-bold text-purple-400">{stats.profitable}</div>
          <div className="text-xs text-gray-400">Profitable</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Tabs */}
          <div className="flex bg-gray-800/50 rounded-lg p-1">
            {(['all', 'backtests', 'bots'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab === 'all' ? 'All' : tab === 'backtests' ? 'Backtests' : 'Live Bots'}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search strategies, pairs, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Date Filter */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as any)}
            className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="date">Newest First</option>
            <option value="return">Highest Return</option>
            <option value="winRate">Best Win Rate</option>
            <option value="trades">Most Trades</option>
          </select>
        </div>
      </div>

      {/* History Items */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 hover:border-gray-600/50 transition-all"
          >
            <div className="flex items-start gap-6">
              {/* Type Icon & Basic Info */}
              <div className="flex-shrink-0">
                <div className="text-3xl mb-2">{getTypeIcon(item.type)}</div>
                <div className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(item.status)}`}>
                  {item.status}
                </div>
              </div>

              {/* Strategy Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{item.strategyName}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span className="font-mono">{item.pair}</span>
                      <span>•</span>
                      <span>{item.timeframe}</span>
                      <span>•</span>
                      <span>{item.duration}</span>
                      <span>•</span>
                      <span>{item.startDate} {item.endDate && `- ${item.endDate}`}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-lg font-bold ${item.totalReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {item.totalReturn >= 0 ? '+' : ''}${item.totalReturn.toFixed(2)}
                    </div>
                    <div className={`text-sm ${item.totalReturnPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {item.totalReturnPercent >= 0 ? '+' : ''}{item.totalReturnPercent.toFixed(2)}%
                    </div>
                  </div>
                </div>

                {/* Performance Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-sm font-bold text-white">{item.totalTrades}</div>
                    <div className="text-xs text-gray-500">Trades</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-400">{item.winRate.toFixed(1)}%</div>
                    <div className="text-xs text-gray-500">Win Rate</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-bold text-yellow-400">{item.maxDrawdown.toFixed(1)}%</div>
                    <div className="text-xs text-gray-500">Max DD</div>
                  </div>
                  
                  <div className="text-center">
                    <div className={`text-sm font-bold ${item.sharpeRatio >= 0 ? 'text-purple-400' : 'text-red-400'}`}>
                      {item.sharpeRatio.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">Sharpe</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-bold text-gray-300">
                      ${item.initialCapital.toLocaleString()} → ${item.finalValue.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">Capital</div>
                  </div>
                </div>

                {/* Indicators & Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.indicators.map((indicator) => (
                    <span
                      key={indicator}
                      className="bg-blue-900/30 text-blue-400 text-xs px-2 py-1 rounded-full"
                    >
                      {indicator}
                    </span>
                  ))}
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-700/50 text-gray-300 text-xs px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Notes */}
                {item.notes && (
                  <div className="bg-gray-800/30 rounded-lg p-3 mb-3">
                    <div className="text-sm text-gray-300">{item.notes}</div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors text-sm">
                    📊 View Details
                  </button>
                  
                  {item.type === 'backtest' && (
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium transition-colors text-sm">
                      🚀 Deploy Bot
                    </button>
                  )}
                  
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg font-medium transition-colors text-sm">
                    📋 Clone Strategy
                  </button>
                  
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg font-medium transition-colors text-sm">
                    ⭐ Add to Watchlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-bold text-white mb-2">No History Found</h3>
          <p className="text-gray-400 mb-6">
            {searchQuery || dateFilter !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Start creating strategies and running backtests to build your trading history'
            }
          </p>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors">
            Create Strategy
          </button>
        </div>
      )}

      {/* Performance Summary */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">📈 Performance Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl mb-2">🏆</div>
            <div className="text-sm text-blue-200 mb-1">Best Performing Strategy</div>
            <div className="text-white font-bold">
              {historyItems.sort((a, b) => b.totalReturnPercent - a.totalReturnPercent)[0]?.strategyName || 'None'}
            </div>
            <div className="text-green-400 text-sm">
              +{historyItems.sort((a, b) => b.totalReturnPercent - a.totalReturnPercent)[0]?.totalReturnPercent.toFixed(2) || 0}%
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-sm text-blue-200 mb-1">Most Consistent</div>
            <div className="text-white font-bold">
              {historyItems.sort((a, b) => b.winRate - a.winRate)[0]?.strategyName || 'None'}
            </div>
            <div className="text-blue-400 text-sm">
              {historyItems.sort((a, b) => b.winRate - a.winRate)[0]?.winRate.toFixed(1) || 0}% Win Rate
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-sm text-blue-200 mb-1">Most Active</div>
            <div className="text-white font-bold">
              {historyItems.sort((a, b) => b.totalTrades - a.totalTrades)[0]?.strategyName || 'None'}
            </div>
            <div className="text-yellow-400 text-sm">
              {historyItems.sort((a, b) => b.totalTrades - a.totalTrades)[0]?.totalTrades || 0} Trades
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}