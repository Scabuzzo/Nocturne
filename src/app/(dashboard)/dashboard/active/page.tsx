// src/app/dashboard/active/page.tsx

'use client';

import { useState } from 'react';

interface ActiveBot {
  id: string;
  strategyName: string;
  pair: string;
  status: 'running' | 'paused' | 'error';
  startTime: string;
  initialCapital: number;
  currentValue: number;
  totalPnL: number;
  totalPnLPercent: number;
  openPositions: number;
  totalTrades: number;
  winRate: number;
  lastSignal: string;
  mode: 'manual' | 'strict';
}

export default function ActiveStrategiesPage() {
  const [selectedBots, setSelectedBots] = useState<string[]>([]);
  
  // Mock data - in production, this would come from your API
  const activeBots: ActiveBot[] = [
    {
      id: 'bot-1',
      strategyName: 'RSI Divergence Pro',
      pair: 'BTC/USDT',
      status: 'running',
      startTime: '2024-06-20 14:30',
      initialCapital: 10000,
      currentValue: 10847.50,
      totalPnL: 847.50,
      totalPnLPercent: 8.47,
      openPositions: 1,
      totalTrades: 23,
      winRate: 73.9,
      lastSignal: '2 min ago',
      mode: 'strict',
    },
    {
      id: 'bot-2',
      strategyName: 'MACD Golden Cross',
      pair: 'ETH/USDT',
      status: 'running',
      startTime: '2024-06-19 09:15',
      initialCapital: 5000,
      currentValue: 5234.80,
      totalPnL: 234.80,
      totalPnLPercent: 4.70,
      openPositions: 0,
      totalTrades: 15,
      winRate: 66.7,
      lastSignal: '1 hour ago',
      mode: 'manual',
    },
    {
      id: 'bot-3',
      strategyName: 'Momentum Breakout',
      pair: 'SOL/USDT',
      status: 'paused',
      startTime: '2024-06-21 16:45',
      initialCapital: 3000,
      currentValue: 3165.20,
      totalPnL: 165.20,
      totalPnLPercent: 5.51,
      openPositions: 0,
      totalTrades: 8,
      winRate: 62.5,
      lastSignal: '3 hours ago',
      mode: 'strict',
    },
    {
      id: 'bot-4',
      strategyName: 'Bollinger Squeeze',
      pair: 'ADA/USDT',
      status: 'error',
      startTime: '2024-06-22 11:20',
      initialCapital: 2000,
      currentValue: 1890.45,
      totalPnL: -109.55,
      totalPnLPercent: -5.48,
      openPositions: 0,
      totalTrades: 12,
      winRate: 41.7,
      lastSignal: 'Error',
      mode: 'manual',
    },
  ];

  const handleBotAction = (botId: string, action: 'pause' | 'resume' | 'stop') => {
    console.log(`${action} bot:`, botId);
    // In production, this would call your API
  };

  const handleBulkAction = (action: 'pause' | 'resume' | 'stop') => {
    console.log(`${action} selected bots:`, selectedBots);
    // In production, this would call your API for multiple bots
  };

  const toggleBotSelection = (botId: string) => {
    setSelectedBots(prev => 
      prev.includes(botId) 
        ? prev.filter(id => id !== botId)
        : [...prev, botId]
    );
  };

  const selectAllBots = () => {
    setSelectedBots(selectedBots.length === activeBots.length ? [] : activeBots.map(bot => bot.id));
  };

  const getStatusColor = (status: ActiveBot['status']) => {
    switch (status) {
      case 'running': return 'text-green-400 bg-green-900/30 border-green-500/50';
      case 'paused': return 'text-yellow-400 bg-yellow-900/30 border-yellow-500/50';
      case 'error': return 'text-red-400 bg-red-900/30 border-red-500/50';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-500/50';
    }
  };

  const getStatusIcon = (status: ActiveBot['status']) => {
    switch (status) {
      case 'running': return '🟢';
      case 'paused': return '⏸️';
      case 'error': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Active Strategies</h1>
          <p className="text-gray-400">Monitor and control your running trading bots</p>
        </div>
        
        {/* Bulk Actions */}
        {selectedBots.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">{selectedBots.length} selected</span>
            <button
              onClick={() => handleBulkAction('pause')}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg font-medium transition-colors"
            >
              ⏸️ Pause
            </button>
            <button
              onClick={() => handleBulkAction('resume')}
              className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium transition-colors"
            >
              ▶️ Resume
            </button>
            <button
              onClick={() => handleBulkAction('stop')}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors"
            >
              ⏹️ Stop
            </button>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 text-center">
          <div className="text-2xl mb-2">🤖</div>
          <div className="text-2xl font-bold text-white">{activeBots.length}</div>
          <div className="text-sm text-gray-400">Total Bots</div>
        </div>
        
        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 text-center">
          <div className="text-2xl mb-2">🟢</div>
          <div className="text-2xl font-bold text-green-400">
            {activeBots.filter(bot => bot.status === 'running').length}
          </div>
          <div className="text-sm text-gray-400">Running</div>
        </div>
        
        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 text-center">
          <div className="text-2xl mb-2">💰</div>
          <div className="text-2xl font-bold text-green-400">
            +${activeBots.reduce((sum, bot) => sum + bot.totalPnL, 0).toFixed(2)}
          </div>
          <div className="text-sm text-gray-400">Total P&L</div>
        </div>
        
        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-xl p-6 text-center">
          <div className="text-2xl mb-2">📊</div>
          <div className="text-2xl font-bold text-blue-400">
            {activeBots.reduce((sum, bot) => sum + bot.totalTrades, 0)}
          </div>
          <div className="text-sm text-gray-400">Total Trades</div>
        </div>
      </div>

      {/* Bots Table */}
      <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-700/30">
          <h3 className="text-xl font-bold text-white">Running Bots</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="p-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedBots.length === activeBots.length}
                    onChange={selectAllBots}
                    className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                  />
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Strategy</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Pair</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Status</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">P&L</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Win Rate</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Trades</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Last Signal</th>
                <th className="p-4 text-left text-sm font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeBots.map((bot) => (
                <tr
                  key={bot.id}
                  className="border-t border-gray-700/30 hover:bg-gray-800/30 transition-colors"
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedBots.includes(bot.id)}
                      onChange={() => toggleBotSelection(bot.id)}
                      className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                    />
                  </td>
                  
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-white">{bot.strategyName}</div>
                      <div className="text-xs text-gray-500">
                        Started: {bot.startTime}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          bot.mode === 'strict' ? 'bg-blue-900/30 text-blue-400' : 'bg-purple-900/30 text-purple-400'
                        }`}>
                          {bot.mode === 'strict' ? '🔒 Strict' : '✋ Manual'}
                        </span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <span className="font-mono text-white">{bot.pair}</span>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getStatusIcon(bot.status)}</span>
                      <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(bot.status)}`}>
                        {bot.status.charAt(0).toUpperCase() + bot.status.slice(1)}
                      </span>
                    </div>
                    {bot.openPositions > 0 && (
                      <div className="text-xs text-gray-400 mt-1">
                        {bot.openPositions} open position{bot.openPositions > 1 ? 's' : ''}
                      </div>
                    )}
                  </td>
                  
                  <td className="p-4">
                    <div className={`font-bold ${bot.totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {bot.totalPnL >= 0 ? '+' : ''}${bot.totalPnL.toFixed(2)}
                    </div>
                    <div className={`text-sm ${bot.totalPnLPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {bot.totalPnLPercent >= 0 ? '+' : ''}{bot.totalPnLPercent.toFixed(2)}%
                    </div>
                    <div className="text-xs text-gray-500">
                      ${bot.currentValue.toLocaleString()}
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div className="font-medium text-white">{bot.winRate.toFixed(1)}%</div>
                    <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
                      <div
                        className={`h-1 rounded-full ${
                          bot.winRate >= 70 ? 'bg-green-500' : 
                          bot.winRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${bot.winRate}%` }}
                      ></div>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div className="font-medium text-white">{bot.totalTrades}</div>
                    <div className="text-xs text-gray-500">
                      {Math.round(bot.totalTrades * bot.winRate / 100)}W / {Math.round(bot.totalTrades * (100 - bot.winRate) / 100)}L
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div className="text-sm text-gray-300">{bot.lastSignal}</div>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {bot.status === 'running' ? (
                        <button
                          onClick={() => handleBotAction(bot.id, 'pause')}
                          className="p-2 text-yellow-400 hover:bg-yellow-400/20 rounded-lg transition-colors"
                          title="Pause bot"
                        >
                          ⏸️
                        </button>
                      ) : bot.status === 'paused' ? (
                        <button
                          onClick={() => handleBotAction(bot.id, 'resume')}
                          className="p-2 text-green-400 hover:bg-green-400/20 rounded-lg transition-colors"
                          title="Resume bot"
                        >
                          ▶️
                        </button>
                      ) : null}
                      
                      <button
                        onClick={() => handleBotAction(bot.id, 'stop')}
                        className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
                        title="Stop bot"
                      >
                        ⏹️
                      </button>
                      
                      <button
                        className="p-2 text-blue-400 hover:bg-blue-400/20 rounded-lg transition-colors"
                        title="View details"
                      >
                        📊
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {activeBots.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-white mb-2">No Active Bots</h3>
            <p className="text-gray-400 mb-6">
              Deploy your first strategy to start automated trading
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-medium transition-all hover:scale-105 shadow-lg shadow-blue-500/25">
              Deploy Strategy
            </button>
          </div>
        )}
      </div>

      {/* Quick Deploy */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">🚀 Quick Deploy</h3>
            <p className="text-blue-200">
              Deploy a new strategy or restart a previously successful bot
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors">
              Deploy New Strategy
            </button>
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg font-medium transition-colors">
              Browse Templates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}