// src/app/explore/page.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ExploreLeaderboard() {
  const [sortBy, setSortBy] = useState<'roi' | 'drawdown' | 'popularity' | 'winRate'>('roi');
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  const [filterPair, setFilterPair] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock leaderboard data
  const leaderboardStrategies = [
    {
      id: '1',
      rank: 1,
      name: 'Alpha Momentum Pro',
      creator: 'CryptoWhale',
      description: 'Advanced momentum strategy using multiple timeframe analysis and volume confirmation',
      pair: 'BTC/USDT',
      timeframe: '1h',
      roi: 147.3,
      drawdown: 8.2,
      winRate: 78.4,
      sharpeRatio: 2.34,
      totalTrades: 156,
      followers: 2847,
      copyFee: 0.15,
      lastMonth: 23.7,
      indicators: ['EMA', 'RSI', 'Volume'],
      tags: ['momentum', 'volume', 'high-frequency'],
      avatar: '🐋',
      verified: true,
      published: '2024-05-15',
    },
    {
      id: '2',
      rank: 2,
      name: 'Divergence Hunter',
      creator: 'TechAnalyst',
      description: 'Spots RSI and MACD divergences for high-probability entries',
      pair: 'ETH/USDT',
      timeframe: '4h',
      roi: 134.8,
      drawdown: 12.1,
      winRate: 71.2,
      sharpeRatio: 1.89,
      totalTrades: 89,
      followers: 1923,
      copyFee: 0.20,
      lastMonth: 18.4,
      indicators: ['RSI', 'MACD', 'Bollinger'],
      tags: ['divergence', 'swing-trading'],
      avatar: '📈',
      verified: true,
      published: '2024-04-22',
    },
    {
      id: '3',
      rank: 3,
      name: 'Scalping Machine',
      creator: 'QuickTrader',
      description: 'High-frequency scalping strategy for quick profits',
      pair: 'SOL/USDT',
      timeframe: '15m',
      roi: 98.6,
      drawdown: 15.7,
      winRate: 65.8,
      sharpeRatio: 1.67,
      totalTrades: 432,
      followers: 1456,
      copyFee: 0.25,
      lastMonth: 15.2,
      indicators: ['EMA', 'Stoch', 'Volume'],
      tags: ['scalping', 'high-frequency'],
      avatar: '⚡',
      verified: false,
      published: '2024-06-01',
    },
    {
      id: '4',
      rank: 4,
      name: 'Breakout Beast',
      creator: 'ChartMaster',
      description: 'Captures explosive breakouts with precision timing',
      pair: 'ADA/USDT',
      timeframe: '1h',
      roi: 89.2,
      drawdown: 9.8,
      winRate: 69.4,
      sharpeRatio: 1.92,
      totalTrades: 127,
      followers: 1287,
      copyFee: 0.18,
      lastMonth: 21.3,
      indicators: ['Bollinger', 'Volume', 'RSI'],
      tags: ['breakout', 'volatility'],
      avatar: '🚀',
      verified: true,
      published: '2024-05-03',
    },
    {
      id: '5',
      rank: 5,
      name: 'Mean Reversion Pro',
      creator: 'StatTrader',
      description: 'Statistical mean reversion with risk management',
      pair: 'DOT/USDT',
      timeframe: '2h',
      roi: 76.4,
      drawdown: 6.3,
      winRate: 74.1,
      sharpeRatio: 2.12,
      totalTrades: 203,
      followers: 892,
      copyFee: 0.12,
      lastMonth: 12.8,
      indicators: ['Bollinger', 'RSI', 'MACD'],
      tags: ['mean-reversion', 'statistical'],
      avatar: '📊',
      verified: true,
      published: '2024-04-10',
    },
  ];

  const pairs = ['all', 'BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'ADA/USDT', 'DOT/USDT'];

  const filteredStrategies = leaderboardStrategies
    .filter(strategy => {
      const matchesSearch = strategy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          strategy.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          strategy.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPair = filterPair === 'all' || strategy.pair === filterPair;
      return matchesSearch && matchesPair;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'roi':
          return b.roi - a.roi;
        case 'drawdown':
          return a.drawdown - b.drawdown;
        case 'popularity':
          return b.followers - a.followers;
        case 'winRate':
          return b.winRate - a.winRate;
        default:
          return a.rank - b.rank;
      }
    });

  const handleCopyStrategy = (strategyId: string) => {
    console.log('Copy strategy:', strategyId);
    // In production, this would navigate to copy/deploy page
  };

  const handleFollowCreator = (creator: string) => {
    console.log('Follow creator:', creator);
    // In production, this would call your API
  };

  const handleAddToWatchlist = (strategyId: string) => {
    console.log('Add to watchlist:', strategyId);
    // In production, this would call your API
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Strategy Leaderboard</h1>
        <p className="text-gray-400">Discover and copy the best performing trading strategies</p>
      </div>

      {/* Trending Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-500/30 rounded-xl p-4 overflow-hidden group hover:border-blue-400/50 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="text-2xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">2,847</div>
            <div className="text-sm text-blue-200">Total Strategies</div>
            <div className="text-xs text-blue-300 mt-1 flex items-center gap-1">
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
              +127 this week
            </div>
          </div>
        </div>
        
        <div className="relative bg-gradient-to-br from-green-900/30 to-emerald-800/30 border border-green-500/30 rounded-xl p-4 overflow-hidden group hover:border-green-400/50 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="text-2xl font-bold text-green-400 group-hover:text-green-300 transition-colors">$2.4M</div>
            <div className="text-sm text-green-200">Total Volume</div>
            <div className="text-xs text-green-300 mt-1 flex items-center gap-1">
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
              +15.3% today
            </div>
          </div>
        </div>
        
        <div className="relative bg-gradient-to-br from-purple-900/30 to-violet-800/30 border border-purple-500/30 rounded-xl p-4 overflow-hidden group hover:border-purple-400/50 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-300 transition-all">147.3%</div>
            <div className="text-sm text-purple-200">Top ROI</div>
            <div className="text-xs text-purple-300 mt-1">Alpha Momentum Pro</div>
          </div>
        </div>
        
        <div className="relative bg-gradient-to-br from-amber-900/30 to-orange-800/30 border border-amber-500/30 rounded-xl p-4 overflow-hidden group hover:border-amber-400/50 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="text-2xl font-bold text-amber-400 group-hover:text-amber-300 transition-colors">1,456</div>
            <div className="text-sm text-amber-200">Active Followers</div>
            <div className="text-xs text-amber-300 mt-1">Top 100 strategies</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row gap-4">
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
                placeholder="Search strategies, creators, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="roi">Best ROI</option>
              <option value="drawdown">Lowest Drawdown</option>
              <option value="popularity">Most Popular</option>
              <option value="winRate">Highest Win Rate</option>
            </select>

            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as any)}
              className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="all">All Time</option>
            </select>

            <select
              value={filterPair}
              onChange={(e) => setFilterPair(e.target.value)}
              className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {pairs.map((pair) => (
                <option key={pair} value={pair}>
                  {pair === 'all' ? 'All Pairs' : pair}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="space-y-4">
        {filteredStrategies.map((strategy) => (
          <div key={strategy.id} className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 group overflow-hidden">
            {/* Subtle background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10 flex items-start gap-6">
              {/* Rank */}
              <div className="flex-shrink-0 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-2 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
                  <span className="text-white font-bold">#{strategy.rank}</span>
                </div>
                <div className="text-xs text-gray-400">Rank</div>
              </div>

              {/* Strategy Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-100 transition-colors">{strategy.name}</h3>
                      {strategy.verified && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-400/50 transition-all">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{strategy.avatar}</span>
                      <span className="text-blue-400 font-medium hover:text-cyan-300 cursor-pointer transition-colors">
                        @{strategy.creator}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-400 text-sm">{strategy.pair}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-400 text-sm">{strategy.timeframe}</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3 group-hover:text-gray-200 transition-colors">{strategy.description}</p>
                    
                    {/* Tags */}
                    <div className="flex items-center gap-2 mb-2">
                      {strategy.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full border border-blue-500/30 group-hover:border-cyan-400/40 group-hover:text-cyan-300 transition-all">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Performance Stats */}
                  <div className="text-right flex-shrink-0">
                    <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent group-hover:from-green-300 group-hover:to-emerald-200 transition-all mb-1">
                      +{strategy.roi}%
                    </div>
                    <div className="text-sm text-gray-400 mb-2">Total ROI</div>
                    <div className="text-lg font-semibold text-blue-400 group-hover:text-cyan-300 transition-colors">
                      +{strategy.lastMonth}%
                    </div>
                    <div className="text-xs text-gray-400">Last 30d</div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-white group-hover:text-cyan-100 transition-colors">{strategy.winRate}%</div>
                    <div className="text-xs text-gray-400">Win Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-red-400 group-hover:text-red-300 transition-colors">{strategy.drawdown}%</div>
                    <div className="text-xs text-gray-400">Max DD</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-purple-400 group-hover:text-purple-300 transition-colors">{strategy.sharpeRatio}</div>
                    <div className="text-xs text-gray-400">Sharpe</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-amber-400 group-hover:text-amber-300 transition-colors">{strategy.totalTrades}</div>
                    <div className="text-xs text-gray-400">Trades</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-400 group-hover:text-cyan-300 transition-colors">{strategy.followers.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Followers</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleCopyStrategy(strategy.id)}
                      className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-green-500/25 hover:scale-105 transform"
                    >
                      Copy Strategy - {strategy.copyFee}% fee
                    </button>
                    <button
                      onClick={() => handleAddToWatchlist(strategy.id)}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition-all hover:shadow-md hover:scale-105 transform"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleFollowCreator(strategy.creator)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all text-sm hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 transform"
                    >
                      Follow
                    </button>
                  </div>
                  
                  <Link 
                    href={`/strategy/${strategy.id}`}
                    className="text-blue-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}