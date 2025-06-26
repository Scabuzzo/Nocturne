// src/app/dashboard/page.tsx

'use client';

import { useState } from 'react';

export default function DashboardProfile() {
  const [isEditing, setIsEditing] = useState(false);

  // Mock data - in production, this would come from your API/state management
  const userProfile = {
    avatar: '🌙',
    walletAddress: '7A8F...9B2C',
    fullAddress: '7A8F5E2D9B3C4A1F6E8D2B5C9A3E7F1D4B2C8A5E',
    joinDate: 'March 2024',
    bio: 'Algorithmic trader focused on momentum strategies. Building the future of automated trading.',
    socials: {
      twitter: '@nocturne_trader',
      discord: 'nocturne#1234',
    }
  };

  const stats = {
    strategies: 12,
    activeBots: 3,
    followers: 47,
    totalPnL: 1247.83,
    winRate: 67,
    bestStrategy: 'Momentum Breakout',
    bestStrategyReturn: 23.4,
  };

  const recentActivity = [
    {
      id: 1,
      type: 'bot_started',
      strategy: 'RSI Divergence Pro',
      pair: 'BTC/USDT',
      timestamp: '2 hours ago',
      icon: '🤖',
    },
    {
      id: 2,
      type: 'strategy_created',
      strategy: 'MACD Golden Cross',
      timestamp: '1 day ago',
      icon: '⚡',
    },
    {
      id: 3,
      type: 'profit_taken',
      strategy: 'Momentum Breakout',
      amount: '+$142.50',
      timestamp: '2 days ago',
      icon: '💰',
    },
    {
      id: 4,
      type: 'strategy_published',
      strategy: 'Bollinger Squeeze',
      timestamp: '3 days ago',
      icon: '📢',
    },
  ];

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Profile Overview</h1>
          <p className="text-gray-400">Manage your trading profile and view your performance</p>
        </div>
        
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            isEditing
              ? 'bg-green-600 hover:bg-green-500 text-white'
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
          }`}
        >
          {isEditing ? '💾 Save Changes' : '✏️ Edit Profile'}
        </button>
      </div>

      {/* Profile Card & Stats Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Profile Card */}
        <div className="xl:col-span-1">
          <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6">
            <div className="text-center">
              {/* Avatar */}
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
                {userProfile.avatar}
              </div>
              
              {/* Wallet Address */}
              <div className="mb-4">
                <div className="text-lg font-semibold text-white mb-2">{userProfile.walletAddress}</div>
                <div className="text-xs text-gray-500 font-mono bg-gray-800/50 rounded px-3 py-2 break-all leading-relaxed">
                  {userProfile.fullAddress.slice(0, 20)}
                  <br />
                  {userProfile.fullAddress.slice(20)}
                </div>
              </div>

              {/* Member Since */}
              <div className="text-sm text-gray-400 mb-6">
                Member since {userProfile.joinDate}
              </div>

              {/* Bio */}
              {isEditing ? (
                <textarea
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm resize-none"
                  rows={4}
                  defaultValue={userProfile.bio}
                  placeholder="Tell us about your trading style..."
                />
              ) : (
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {userProfile.bio}
                </p>
              )}

              {/* Social Links */}
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                    placeholder="Twitter handle"
                    defaultValue={userProfile.socials.twitter}
                  />
                  <input
                    type="text"
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                    placeholder="Discord username"
                    defaultValue={userProfile.socials.discord}
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                    title="Twitter"
                  >
                    🐦 {userProfile.socials.twitter}
                  </a>
                  <a
                    href="#"
                    className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
                    title="Discord"
                  >
                    💬 {userProfile.socials.discord}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="xl:col-span-3">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Strategies Created */}
            <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">⚡</div>
              <div className="text-3xl font-bold text-white mb-1">{stats.strategies}</div>
              <div className="text-sm text-gray-400">Strategies</div>
            </div>

            {/* Active Bots */}
            <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">🤖</div>
              <div className="text-3xl font-bold text-green-400 mb-1">{stats.activeBots}</div>
              <div className="text-sm text-gray-400">Active Bots</div>
            </div>

            {/* Followers */}
            <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">👥</div>
              <div className="text-3xl font-bold text-blue-400 mb-1">{stats.followers}</div>
              <div className="text-sm text-gray-400">Followers</div>
            </div>

            {/* Total P&L */}
            <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">💰</div>
              <div className="text-3xl font-bold text-green-400 mb-1">+${stats.totalPnL}</div>
              <div className="text-sm text-gray-400">Total P&L</div>
            </div>

            {/* Win Rate */}
            <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">🎯</div>
              <div className="text-3xl font-bold text-yellow-400 mb-1">{stats.winRate}%</div>
              <div className="text-sm text-gray-400">Win Rate</div>
            </div>

            {/* Best Strategy */}
            <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">🏆</div>
              <div className="text-3xl font-bold text-purple-400 mb-1">+{stats.bestStrategyReturn}%</div>
              <div className="text-sm text-gray-400">Best Strategy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
            >
              <div className="text-2xl flex-shrink-0">{activity.icon}</div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-white text-sm">
                    {activity.type === 'bot_started' && 'Bot Started'}
                    {activity.type === 'strategy_created' && 'Strategy Created'}
                    {activity.type === 'profit_taken' && 'Profit Taken'}
                    {activity.type === 'strategy_published' && 'Strategy Published'}
                  </span>
                  {activity.amount && (
                    <span className="text-green-400 font-bold text-sm">{activity.amount}</span>
                  )}
                </div>
                
                <div className="text-xs text-gray-400 truncate">
                  {activity.strategy}
                  {activity.pair && ` · ${activity.pair}`}
                </div>
              </div>

              <div className="text-xs text-gray-500 flex-shrink-0">
                {activity.timestamp}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
            View All Activity →
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 p-6 rounded-xl text-white font-medium transition-all hover:scale-105 shadow-lg shadow-blue-500/25">
          <div className="text-2xl mb-2">⚡</div>
          <div>Create New Strategy</div>
        </button>

        <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 p-6 rounded-xl text-white font-medium transition-all hover:scale-105 shadow-lg shadow-green-500/25">
          <div className="text-2xl mb-2">🚀</div>
          <div>Deploy Bot</div>
        </button>

        <button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 p-6 rounded-xl text-white font-medium transition-all hover:scale-105 shadow-lg shadow-amber-500/25">
          <div className="text-2xl mb-2">📊</div>
          <div>Browse Strategies</div>
        </button>
      </div>
    </div>
  );
}