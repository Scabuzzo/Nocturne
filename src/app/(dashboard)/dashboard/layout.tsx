// src/app/dashboard/layout.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const sidebarItems = [
    {
      id: 'profile',
      name: 'Profile',
      href: '/dashboard',
      icon: '👤',
      description: 'Overview & stats',
    },
    {
      id: 'active',
      name: 'Active Strategies',
      href: '/dashboard/active',
      icon: '🤖',
      description: 'Running bots',
    },
    {
      id: 'watchlist',
      name: 'Watchlist',
      href: '/dashboard/watchlist',
      icon: '⭐',
      description: 'Saved strategies',
    },
    {
      id: 'history',
      name: 'History',
      href: '/dashboard/history',
      icon: '📊',
      description: 'Past results',
    },
  ];

  const isActivePath = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Sidebar - Fixed Position */}
      <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] bg-gray-900/40 backdrop-blur-xl border-r border-gray-700/30 overflow-hidden z-40">
        <div className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} h-full transition-all duration-300`}>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-700/30">
            <div className="flex items-center justify-between">
              {!isSidebarCollapsed && (
                <h2 className="text-xl font-bold text-white">Dashboard</h2>
              )}
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all"
              >
                <svg 
                  className={`w-5 h-5 transition-transform ${isSidebarCollapsed ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  group relative flex items-center rounded-lg transition-all duration-200
                  ${isActivePath(item.href)
                    ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-blue-500/40 shadow-lg shadow-blue-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                  }
                  ${isSidebarCollapsed ? 'p-3 justify-center' : 'p-4'}
                `}
              >
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                {!isSidebarCollapsed && (
                  <div className="ml-3 min-w-0">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                )}

                {/* Tooltip for collapsed state */}
                {isSidebarCollapsed && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-400">{item.description}</div>
                  </div>
                )}
              </Link>
            ))}
          </nav>

          {/* Quick Stats (when expanded) */}
          {!isSidebarCollapsed && (
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700/30">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Quick Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Active Bots</span>
                    <span className="text-green-400 font-medium">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total P&L</span>
                    <span className="text-green-400 font-medium">+$1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Win Rate</span>
                    <span className="text-blue-400 font-medium">67%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area - Fixed positioning */}
      <main className="pt-16 ml-6 mr-6">
        <div className="max-w-6xl mx-auto px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}