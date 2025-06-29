// src/app/(dashboard)/dashboard/page.tsx

'use client';

import Link from 'next/link';

export default function DashboardOverview() {
  // Mock data - in production, this would come from your API
  const portfolioStats = {
    totalValue: 12847.32,
    totalReturn: 2847.32,
    totalReturnPercent: 28.47,
    dayChange: 142.50,
    dayChangePercent: 1.12,
  };

  const quickStats = [
    {
      label: 'Active Strategies',
      value: '3',
      change: '+1',
      changeType: 'positive',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      label: 'Win Rate',
      value: '68.4%',
      change: '+2.1%',
      changeType: 'positive',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'Total Strategies',
      value: '12',
      change: '+2',
      changeType: 'positive',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      label: 'Watchlist',
      value: '8',
      change: '+3',
      changeType: 'positive',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
    },
  ];

  const activeStrategies = [
    {
      id: '1',
      name: 'RSI Divergence Pro',
      pair: 'BTC/USDT',
      timeframe: '1h',
      status: 'running',
      pnl: 247.83,
      pnlPercent: 4.96,
      trades: 12,
      winRate: 75,
      lastSignal: '2h ago',
    },
    {
      id: '2',
      name: 'MACD Golden Cross',
      pair: 'ETH/USDT',
      timeframe: '4h',
      status: 'running',
      pnl: 156.42,
      pnlPercent: 3.13,
      trades: 8,
      winRate: 62.5,
      lastSignal: '6h ago',
    },
    {
      id: '3',
      name: 'Momentum Breakout',
      pair: 'SOL/USDT',
      timeframe: '1h',
      status: 'paused',
      pnl: -34.27,
      pnlPercent: -0.69,
      trades: 15,
      winRate: 46.7,
      lastSignal: '3h ago',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'profit',
      message: 'RSI Divergence Pro took profit',
      amount: '+$47.25',
      time: '2h ago',
      pair: 'BTC/USDT',
    },
    {
      id: 2,
      type: 'entry',
      message: 'MACD Golden Cross entered position',
      time: '6h ago',
      pair: 'ETH/USDT',
    },
    {
      id: 3,
      type: 'stop',
      message: 'Momentum Breakout hit stop loss',
      amount: '-$23.15',
      time: '1d ago',
      pair: 'SOL/USDT',
    },
    {
      id: 4,
      type: 'created',
      message: 'New strategy "Bollinger Squeeze" created',
      time: '2d ago',
      pair: 'ADA/USDT',
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Overview</h1>
        <p className="text-gray-400">Monitor your portfolio and strategy performance</p>
      </div>

      {/* Portfolio Overview - Top Section */}
      <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-xl p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div>
            <h2 className="text-lg font-medium text-gray-300 mb-2">Portfolio Value</h2>
            <div className="text-4xl font-bold text-white mb-2">
              ${portfolioStats.totalValue.toLocaleString()}
            </div>
            <div className={`flex items-center gap-1 text-lg font-semibold ${
              portfolioStats.totalReturn >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {portfolioStats.totalReturn >= 0 ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
                </svg>
              )}
              +${portfolioStats.totalReturn.toLocaleString()} ({portfolioStats.totalReturnPercent}%)
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-1">Today's Change</div>
            <div className={`text-2xl font-bold ${
              portfolioStats.dayChange >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {portfolioStats.dayChange >= 0 ? '+' : ''}${portfolioStats.dayChange}
            </div>
            <div className="text-sm text-gray-400">({portfolioStats.dayChangePercent}%)</div>
          </div>

          <div className="text-center lg:text-right">
            <Link
              href="/build"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg font-medium transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Strategy
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 hover:border-gray-600/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400">
                {stat.icon}
              </div>
              <div className={`text-xs px-2 py-1 rounded-full ${
                stat.changeType === 'positive' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {stat.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Strategies */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Active Strategies</h3>
              <Link 
                href="/dashboard/active"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
              >
                View All →
              </Link>
            </div>
            
            <div className="space-y-4">
              {activeStrategies.map((strategy) => (
                <div key={strategy.id} className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4 hover:bg-gray-800/50 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${
                        strategy.status === 'running' ? 'bg-green-400' : 'bg-yellow-400'
                      }`} />
                      <div>
                        <div className="font-semibold text-white">{strategy.name}</div>
                        <div className="text-sm text-gray-400">{strategy.pair} • {strategy.timeframe}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`font-semibold ${
                        strategy.pnl >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {strategy.pnl >= 0 ? '+' : ''}${strategy.pnl}
                      </div>
                      <div className="text-sm text-gray-400">{strategy.winRate}% WR</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
              <Link 
                href="/dashboard/history"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
              >
                View All →
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    activity.type === 'profit' ? 'bg-green-400' :
                    activity.type === 'entry' ? 'bg-blue-400' :
                    activity.type === 'stop' ? 'bg-red-400' :
                    'bg-gray-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white mb-1">{activity.message}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-400">{activity.time}</div>
                      {activity.amount && (
                        <div className={`text-xs font-medium ${
                          activity.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {activity.amount}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            href="/build"
            className="flex items-center gap-3 p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition-all group"
          >
            <div className="p-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <div className="font-medium text-white">Create Strategy</div>
              <div className="text-sm text-blue-200">Build a new trading strategy</div>
            </div>
          </Link>

          <Link 
            href="/explore"
            className="flex items-center gap-3 p-4 bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-all group"
          >
            <div className="p-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <div className="font-medium text-white">Explore Strategies</div>
              <div className="text-sm text-purple-200">Discover top performing strategies</div>
            </div>
          </Link>

          <Link 
            href="/dashboard/active"
            className="flex items-center gap-3 p-4 bg-green-600/20 border border-green-500/30 rounded-lg hover:bg-green-600/30 transition-all group"
          >
            <div className="p-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="font-medium text-white">Manage Bots</div>
              <div className="text-sm text-green-200">Control your active strategies</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}