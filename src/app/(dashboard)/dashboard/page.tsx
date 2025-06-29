// src/app/(dashboard)/dashboard/page.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface PortfolioStats {
  totalValue: number;
  dayChange: number;
  dayChangePercent: string;
  weekChange: number;
  weekChangePercent: string;
}

interface QuickStat {
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ReactNode;
}

interface ActiveStrategy {
  id: string;
  name: string;
  pair: string;
  timeframe: string;
  status: 'running' | 'paused';
  pnl: number;
  winRate: number;
}

interface RecentActivity {
  id: string;
  type: 'profit' | 'entry' | 'stop' | 'create';
  message: string;
  time: string;
  amount?: string;
}

export default function DashboardPage() {
  // Portfolio stats with animated values
  const [portfolioStats] = useState<PortfolioStats>({
    totalValue: 47582.34,
    dayChange: 1247.89,
    dayChangePercent: '+2.69',
    weekChange: 3456.78,
    weekChangePercent: '+7.84'
  });

  // Quick stats with glow effects
  const [quickStats] = useState<QuickStat[]>([
    {
      label: 'Active Strategies',
      value: '12',
      change: '+3',
      changeType: 'positive',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      label: 'Win Rate',
      value: '73.2%',
      change: '+5.1%',
      changeType: 'positive',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'Total Trades',
      value: '1,247',
      change: '+89',
      changeType: 'positive',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
    },
    {
      label: 'Avg Return',
      value: '8.4%',
      change: '+1.2%',
      changeType: 'positive',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ]);

  // Active strategies with live data
  const [activeStrategies] = useState<ActiveStrategy[]>([
    {
      id: 'strat-1',
      name: 'RSI Divergence Pro',
      pair: 'BTC/USDT',
      timeframe: '1h',
      status: 'running',
      pnl: 1247.89,
      winRate: 78.5,
    },
    {
      id: 'strat-2',
      name: 'MACD Golden Cross',
      pair: 'ETH/USDT',
      timeframe: '4h',
      status: 'running',
      pnl: 534.22,
      winRate: 65.8,
    },
    {
      id: 'strat-3',
      name: 'Bollinger Band Squeeze',
      pair: 'SOL/USDT',
      timeframe: '2h',
      status: 'paused',
      pnl: -125.45,
      winRate: 58.2,
    },
  ]);

  // Recent activity feed
  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: 'act-1',
      type: 'profit',
      message: 'RSI Divergence Pro closed profitable trade',
      time: '2 min ago',
      amount: '+$89.45',
    },
    {
      id: 'act-2',
      type: 'entry',
      message: 'MACD Golden Cross entered BUY position',
      time: '15 min ago',
    },
    {
      id: 'act-3',
      type: 'create',
      message: 'New strategy "Momentum Breakout" created',
      time: '1 hour ago',
    },
    {
      id: 'act-4',
      type: 'stop',
      message: 'Bollinger Band Squeeze stopped by user',
      time: '2 hours ago',
    },
    {
      id: 'act-5',
      type: 'profit',
      message: 'Mean Reversion Alpha closed profitable trade',
      time: '3 hours ago',
      amount: '+$234.67',
    },
  ]);

  return (
    <div className="w-full space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      {/* Portfolio Overview Header with Futuristic Design */}
      <div className="relative bg-gradient-to-br from-gray-900/70 via-gray-900/50 to-blue-900/30 backdrop-blur-xl border border-gray-700/40 rounded-2xl p-8 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-cyan-600/5 to-purple-600/5 animate-pulse"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent animate-pulse">
                Welcome Back
              </span>
            </h1>
            <div className="text-5xl font-bold mb-2">
              <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent bg-size-300 animate-gradient">
                ${portfolioStats.totalValue.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                portfolioStats.dayChange >= 0 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30 shadow-lg shadow-green-500/20' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              } transition-all duration-300 hover:scale-105`}>
                {portfolioStats.dayChange >= 0 ? '+' : ''}${portfolioStats.dayChange}
              </div>
              <div className="text-sm text-gray-400">({portfolioStats.dayChangePercent}%)</div>
            </div>
          </div>

          <div className="text-center lg:text-right">
            <Link
              href="/build"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-medium transition-all hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105 transform duration-300 border border-blue-500/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Strategy
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid with Enhanced Glow Effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div 
            key={index} 
            className="group relative bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Animated glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
            
            {/* Neon border effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 group-hover:bg-cyan-500/30 group-hover:border-cyan-500/50 group-hover:text-cyan-300 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/25 group-hover:scale-110">
                  {stat.icon}
                </div>
                <div className={`text-xs px-3 py-1 rounded-full font-medium ${
                  stat.changeType === 'positive' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30 group-hover:shadow-lg group-hover:shadow-green-500/25'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                } transition-all duration-300`}>
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2 group-hover:text-cyan-100 transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Strategies Section */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 hover:border-gray-600/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Active Strategies</h3>
              <Link 
                href="/dashboard/active"
                className="text-blue-400 hover:text-cyan-400 text-sm font-medium transition-colors duration-200 hover:underline"
              >
                View All →
              </Link>
            </div>
            
            <div className="space-y-4">
              {activeStrategies.map((strategy, index) => (
                <div 
                  key={strategy.id} 
                  className="group bg-gray-800/30 border border-gray-700/50 rounded-lg p-4 hover:bg-gray-800/60 hover:border-gray-600/60 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/20"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full shadow-lg ${
                        strategy.status === 'running' 
                          ? 'bg-green-400 shadow-green-400/50 animate-pulse' 
                          : 'bg-yellow-400 shadow-yellow-400/50'
                      }`} />
                      <div>
                        <div className="font-semibold text-white group-hover:text-cyan-100 transition-colors duration-200">
                          {strategy.name}
                        </div>
                        <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                          {strategy.pair} • {strategy.timeframe}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`font-semibold transition-colors duration-200 ${
                        strategy.pnl >= 0 ? 'text-green-400 group-hover:text-green-300' : 'text-red-400 group-hover:text-red-300'
                      }`}>
                        {strategy.pnl >= 0 ? '+' : ''}${strategy.pnl}
                      </div>
                      <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                        {strategy.winRate}% WR
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div>
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 hover:border-gray-600/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
              <Link 
                href="/dashboard/history"
                className="text-blue-400 hover:text-cyan-400 text-sm font-medium transition-colors duration-200 hover:underline"
              >
                View All →
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div 
                  key={activity.id} 
                  className="flex items-start gap-3 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 shadow-lg transition-all duration-200 ${
                    activity.type === 'profit' ? 'bg-green-400 shadow-green-400/50 group-hover:scale-125' :
                    activity.type === 'entry' ? 'bg-blue-400 shadow-blue-400/50 group-hover:scale-125' :
                    activity.type === 'stop' ? 'bg-red-400 shadow-red-400/50 group-hover:scale-125' :
                    'bg-gray-400 shadow-gray-400/50 group-hover:scale-125'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white mb-1 group-hover:text-cyan-100 transition-colors duration-200">
                      {activity.message}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                        {activity.time}
                      </div>
                      {activity.amount && (
                        <div className={`text-xs font-medium transition-colors duration-200 ${
                          activity.amount.startsWith('+') 
                            ? 'text-green-400 group-hover:text-green-300' 
                            : 'text-red-400 group-hover:text-red-300'
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

      {/* Quick Actions Section with Enhanced Styling */}
      <div className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-cyan-900/20 border border-blue-500/30 rounded-xl p-8 backdrop-blur-xl">
        <h3 className="text-lg font-semibold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            href="/build"
            className="group flex items-center gap-3 p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/40 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
          >
            <div className="p-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 group-hover:scale-110 group-hover:text-blue-300 transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <div className="font-medium text-white group-hover:text-cyan-100 transition-colors duration-200">
                Build Strategy
              </div>
              <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                Create new trading strategy
              </div>
            </div>
          </Link>

          <Link 
            href="/explore"
            className="group flex items-center gap-3 p-4 bg-green-600/20 border border-green-500/30 rounded-lg hover:bg-green-600/40 hover:border-green-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25"
          >
            <div className="p-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 group-hover:scale-110 group-hover:text-green-300 transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <div className="font-medium text-white group-hover:text-cyan-100 transition-colors duration-200">
                Explore Strategies
              </div>
              <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                Browse community strategies
              </div>
            </div>
          </Link>

          <div className="group flex items-center gap-3 p-4 bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/40 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 cursor-pointer">
            <div className="p-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 group-hover:scale-110 group-hover:text-purple-300 transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <div className="font-medium text-white group-hover:text-cyan-100 transition-colors duration-200">
                View Analytics
              </div>
              <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                Deep performance insights
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add custom CSS animations in your global styles if needed:
/*
@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient {
  animation: gradient 3s ease infinite;
}

.bg-300% {
  background-size: 300% 300%;
}
*/