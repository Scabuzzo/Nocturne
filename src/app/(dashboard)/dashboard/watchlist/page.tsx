// src/app/dashboard/watchlist/page.tsx

'use client';

import { useState } from 'react';

interface WatchlistStrategy {
  id: string;
  name: string;
  creator: string;
  creatorAddress: string;
  description: string;
  pair: string;
  timeframe: string;
  totalReturn: number;
  winRate: number;
  maxDrawdown: number;
  sharpeRatio: number;
  totalTrades: number;
  followers: number;
  lastBacktest: string;
  indicators: string[];
  priceAlert: {
    enabled: boolean;
    condition: 'above' | 'below';
    value: number;
    currentPrice: number;
  };
  tags: string[];
  isFavorite: boolean;
  dateAdded: string;
}

export default function WatchlistPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'dateAdded' | 'return' | 'winRate' | 'followers'>('dateAdded');
  const [filterTag, setFilterTag] = useState<string>('all');

  // Mock data - in production, this would come from your API
  const watchlistStrategies: WatchlistStrategy[] = [
    {
      id: 'strategy-1',
      name: 'Golden Cross Momentum',
      creator: 'CryptoMaster',
      creatorAddress: '7A8F...9B2C',
      description: 'A trend-following strategy using MA crossovers with RSI confirmation for high-probability entries.',
      pair: 'BTC/USDT',
      timeframe: '1h',
      totalReturn: 23.4,
      winRate: 68.5,
      maxDrawdown: 8.2,
      sharpeRatio: 1.85,
      totalTrades: 47,
      followers: 156,
      lastBacktest: '2 days ago',
      indicators: ['Moving Average', 'RSI'],
      priceAlert: {
        enabled: true,
        condition: 'above',
        value: 65000,
        currentPrice: 64750,
      },
      tags: ['momentum', 'trending'],
      isFavorite: true,
      dateAdded: '2024-06-20',
    },
    {
      id: 'strategy-2',
      name: 'Bollinger Band Squeeze',
      creator: 'VolatilityHunter',
      creatorAddress: '3F2D...7E9A',
      description: 'Captures explosive moves after periods of low volatility using Bollinger Bands and volume indicators.',
      pair: 'ETH/USDT',
      timeframe: '4h',
      totalReturn: 18.7,
      winRate: 72.3,
      maxDrawdown: 12.1,
      sharpeRatio: 1.42,
      totalTrades: 31,
      followers: 89,
      lastBacktest: '1 week ago',
      indicators: ['Bollinger Bands', 'Volume'],
      priceAlert: {
        enabled: false,
        condition: 'below',
        value: 3000,
        currentPrice: 3245,
      },
      tags: ['volatility', 'breakout'],
      isFavorite: false,
      dateAdded: '2024-06-18',
    },
    {
      id: 'strategy-3',
      name: 'MACD Divergence Pro',
      creator: 'TechnicalTrader',
      creatorAddress: '9B4C...2F8E',
      description: 'Advanced divergence detection strategy combining MACD signals with price action analysis.',
      pair: 'SOL/USDT',
      timeframe: '1h',
      totalReturn: 31.2,
      winRate: 65.4,
      maxDrawdown: 15.3,
      sharpeRatio: 1.67,
      totalTrades: 52,
      followers: 203,
      lastBacktest: '5 days ago',
      indicators: ['MACD', 'RSI'],
      priceAlert: {
        enabled: true,
        condition: 'above',
        value: 150,
        currentPrice: 148.5,
      },
      tags: ['divergence', 'momentum'],
      isFavorite: true,
      dateAdded: '2024-06-15',
    },
  ];

  const allTags = ['all', ...Array.from(new Set(watchlistStrategies.flatMap(s => s.tags)))];

  const filteredStrategies = watchlistStrategies
    .filter(strategy => {
      const matchesSearch = strategy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          strategy.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          strategy.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = filterTag === 'all' || strategy.tags.includes(filterTag);
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'return':
          return b.totalReturn - a.totalReturn;
        case 'winRate':
          return b.winRate - a.winRate;
        case 'followers':
          return b.followers - a.followers;
        default:
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
    });

  const handleRemoveFromWatchlist = (strategyId: string) => {
    console.log('Remove from watchlist:', strategyId);
    // In production, this would call your API
  };

  const handleToggleFavorite = (strategyId: string) => {
    console.log('Toggle favorite:', strategyId);
    // In production, this would call your API
  };

  const handleTogglePriceAlert = (strategyId: string) => {
    console.log('Toggle price alert:', strategyId);
    // In production, this would call your API
  };

  const handleDeployStrategy = (strategyId: string) => {
    console.log('Deploy strategy:', strategyId);
    // In production, this would navigate to deploy page
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Watchlist</h1>
          <p className="text-gray-400">Track your saved strategies and set price alerts</p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">{filteredStrategies.length} strategies</span>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors">
            + Add Strategy
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
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
                placeholder="Search strategies, creators, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Tag Filter */}
          <div className="flex gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterTag === tag
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="dateAdded">Recently Added</option>
            <option value="return">Highest Return</option>
            <option value="winRate">Best Win Rate</option>
            <option value="followers">Most Popular</option>
          </select>
        </div>
      </div>

      {/* Strategies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredStrategies.map((strategy) => (
          <div
            key={strategy.id}
            className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 hover:border-gray-600/50 transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-white">{strategy.name}</h3>
                  <button
                    onClick={() => handleToggleFavorite(strategy.id)}
                    className={`text-lg transition-colors ${
                      strategy.isFavorite ? 'text-yellow-400' : 'text-gray-500 hover:text-yellow-400'
                    }`}
                  >
                    {strategy.isFavorite ? '⭐' : '☆'}
                  </button>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <span>by {strategy.creator}</span>
                  <span>•</span>
                  <span className="font-mono">{strategy.creatorAddress}</span>
                  <span>•</span>
                  <span>{strategy.followers} followers</span>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed">
                  {strategy.description}
                </p>
              </div>

              <button
                onClick={() => handleRemoveFromWatchlist(strategy.id)}
                className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                title="Remove from watchlist"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Trading Info */}
            <div className="flex items-center gap-4 mb-4 text-sm">
              <span className="bg-gray-800/50 px-2 py-1 rounded font-mono">{strategy.pair}</span>
              <span className="bg-gray-800/50 px-2 py-1 rounded">{strategy.timeframe}</span>
              <span className="text-gray-400">Last backtest: {strategy.lastBacktest}</span>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className={`text-lg font-bold ${strategy.totalReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {strategy.totalReturn >= 0 ? '+' : ''}{strategy.totalReturn.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500">Return</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">{strategy.winRate.toFixed(1)}%</div>
                <div className="text-xs text-gray-500">Win Rate</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-400">{strategy.maxDrawdown.toFixed(1)}%</div>
                <div className="text-xs text-gray-500">Max DD</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-bold text-purple-400">{strategy.sharpeRatio.toFixed(2)}</div>
                <div className="text-xs text-gray-500">Sharpe</div>
              </div>
            </div>

            {/* Price Alert */}
            {strategy.priceAlert.enabled && (
              <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">🔔</span>
                    <span className="text-sm text-amber-200">
                      Alert when {strategy.pair.split('/')[0]} goes {strategy.priceAlert.condition} ${strategy.priceAlert.value.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => handleTogglePriceAlert(strategy.id)}
                    className="text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5h5v5z" />
                    </svg>
                  </button>
                </div>
                <div className="text-xs text-amber-300 mt-1">
                  Current: ${strategy.priceAlert.currentPrice.toLocaleString()}
                </div>
              </div>
            )}

            {/* Indicators & Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {strategy.indicators.map((indicator) => (
                <span
                  key={indicator}
                  className="bg-blue-900/30 text-blue-400 text-xs px-2 py-1 rounded-full"
                >
                  {indicator}
                </span>
              ))}
              {strategy.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-700/50 text-gray-300 text-xs px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleDeployStrategy(strategy.id)}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-lg font-medium transition-all hover:scale-105 shadow-lg shadow-green-500/25"
              >
                🚀 Deploy
              </button>
              
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg font-medium transition-colors">
                📊 Details
              </button>
              
              <button
                onClick={() => handleTogglePriceAlert(strategy.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  strategy.priceAlert.enabled
                    ? 'bg-amber-600 hover:bg-amber-500 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                🔔
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredStrategies.length === 0 && (
        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">⭐</div>
          <h3 className="text-xl font-bold text-white mb-2">No Strategies Found</h3>
          <p className="text-gray-400 mb-6">
            {searchQuery || filterTag !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Start building your watchlist by saving strategies you\'re interested in'
            }
          </p>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors">
            Browse Strategies
          </button>
        </div>
      )}
    </div>
  );
}