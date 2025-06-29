// src/app/explore/watchlist/page.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ExploreWatchlist() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState('all');
  const [sortBy, setSortBy] = useState<'dateAdded' | 'return' | 'winRate' | 'followers'>('dateAdded');

  // Mock watchlist data
  const watchlistStrategies = [
    {
      id: '1',
      name: 'Alpha Momentum Pro',
      creator: 'CryptoWhale',
      description: 'Advanced momentum strategy using multiple timeframe analysis',
      pair: 'BTC/USDT',
      timeframe: '1h',
      totalReturn: 147.3,
      winRate: 78.4,
      maxDrawdown: 8.2,
      sharpeRatio: 2.34,
      totalTrades: 156,
      followers: 2847,
      lastBacktest: '2 days ago',
      indicators: ['EMA', 'RSI', 'Volume'],
      priceAlert: {
        enabled: true,
        condition: 'above',
        value: 95000,
        currentPrice: 94250,
      },
      tags: ['momentum', 'volume'],
      isFavorite: true,
      dateAdded: '2024-06-20',
      avatar: '🐋',
      verified: true,
    },
    {
      id: '2',
      name: 'Divergence Hunter',
      creator: 'TechAnalyst',
      description: 'Spots RSI and MACD divergences for high-probability entries',
      pair: 'ETH/USDT',
      timeframe: '4h',
      totalReturn: 89.7,
      winRate: 71.2,
      maxDrawdown: 12.1,
      sharpeRatio: 1.89,
      totalTrades: 89,
      followers: 1923,
      lastBacktest: '1 day ago',
      indicators: ['RSI', 'MACD', 'Bollinger'],
      priceAlert: {
        enabled: false,
        condition: 'below',
        value: 3000,
        currentPrice: 3150,
      },
      tags: ['divergence', 'swing-trading'],
      isFavorite: false,
      dateAdded: '2024-06-18',
      avatar: '📈',
      verified: true,
    },
    {
      id: '3',
      name: 'Breakout Beast',
      creator: 'ChartMaster',
      description: 'Captures explosive breakouts with precision timing',
      pair: 'SOL/USDT',
      timeframe: '1h',
      totalReturn: 124.5,
      winRate: 69.4,
      maxDrawdown: 9.8,
      sharpeRatio: 1.92,
      totalTrades: 127,
      followers: 1287,
      lastBacktest: '3 hours ago',
      indicators: ['Bollinger', 'Volume', 'RSI'],
      priceAlert: {
        enabled: true,
        condition: 'above',
        value: 160,
        currentPrice: 148.5,
      },
      tags: ['breakout', 'volatility'],
      isFavorite: true,
      dateAdded: '2024-06-15',
      avatar: '🚀',
      verified: false,
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

  const handleCopyStrategy = (strategyId: string) => {
    console.log('Copy strategy:', strategyId);
    // In production, this would navigate to copy/deploy page
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Watchlist</h1>
          <p className="text-gray-400">Track your saved strategies and monitor performance</p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">{filteredStrategies.length} strategies</span>
          <Link 
            href="/explore"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
          >
            + Browse Strategies
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-4">
          <div className="text-2xl font-bold text-white">{watchlistStrategies.length}</div>
          <div className="text-sm text-gray-400">Total Saved</div>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-4">
          <div className="text-2xl font-bold text-green-400">
            {(watchlistStrategies.reduce((sum, s) => sum + s.totalReturn, 0) / watchlistStrategies.length).toFixed(1)}%
          </div>
          <div className="text-sm text-gray-400">Avg Return</div>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-4">
          <div className="text-2xl font-bold text-blue-400">
            {watchlistStrategies.filter(s => s.priceAlert.enabled).length}
          </div>
          <div className="text-sm text-gray-400">Active Alerts</div>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-4">
          <div className="text-2xl font-bold text-yellow-400">
            {watchlistStrategies.filter(s => s.isFavorite).length}
          </div>
          <div className="text-sm text-gray-400">Favorites</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6">
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
      {filteredStrategies.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No strategies found</h3>
          <p className="text-gray-400 mb-4">
            {searchQuery || filterTag !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Start building your watchlist by adding strategies from the leaderboard'
            }
          </p>
          <Link 
            href="/explore"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
          >
            Explore Strategies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredStrategies.map((strategy) => (
            <div
              key={strategy.id}
              className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 hover:border-gray-600/50 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{strategy.avatar}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-white">{strategy.name}</h3>
                      {strategy.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                        </div>
                      )}
                      <button
                        onClick={() => handleToggleFavorite(strategy.id)}
                        className={`text-lg transition-colors ${
                          strategy.isFavorite ? 'text-yellow-400' : 'text-gray-500 hover:text-yellow-400'
                        }`}
                      >
                        {strategy.isFavorite ? '★' : '☆'}
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-blue-400">@{strategy.creator}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-400">{strategy.pair}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-400">{strategy.timeframe}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleRemoveFromWatchlist(strategy.id)}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-4">{strategy.description}</p>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-400">+{strategy.totalReturn}%</div>
                  <div className="text-xs text-gray-400">Total Return</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-400">{strategy.winRate}%</div>
                  <div className="text-xs text-gray-400">Win Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-400">{strategy.followers.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">Followers</div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-2 mb-4">
                {strategy.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full border border-blue-500/30">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Price Alert */}
              {strategy.priceAlert.enabled && (
                <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                      <span className="text-amber-300 text-sm font-medium">Price Alert Active</span>
                    </div>
                    <button
                      onClick={() => handleTogglePriceAlert(strategy.id)}
                      className="text-amber-400 hover:text-amber-300 text-sm"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="text-amber-200 text-xs mt-1">
                    Alert when {strategy.pair} goes {strategy.priceAlert.condition} ${strategy.priceAlert.value.toLocaleString()}
                    (Current: ${strategy.priceAlert.currentPrice.toLocaleString()})
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyStrategy(strategy.id)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium transition-all text-sm"
                  >
                    Copy Strategy
                  </button>
                  <button
                    onClick={() => handleTogglePriceAlert(strategy.id)}
                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                      strategy.priceAlert.enabled
                        ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 3h8v8H4V3zm8 0h8v8h-8V3z" />
                    </svg>
                  </button>
                </div>
                
                <Link 
                  href={`/strategy/${strategy.id}`}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}