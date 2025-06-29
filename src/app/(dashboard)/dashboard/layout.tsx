// src/app/(dashboard)/dashboard/layout.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  const sidebarItems = [
    {
      id: 'overview',
      name: 'Overview',
      href: '/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      id: 'active',
      name: 'Active Strategies',
      href: '/dashboard/active',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: 'history',
      name: 'History',
      href: '/dashboard/history',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
  ];

  const isActivePath = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="fixed inset-0 top-16 flex bg-gradient-to-br from-gray-950 via-black to-gray-900">
      {/* Sidebar - Enhanced with futuristic styling */}
      <div className="w-64 h-full border-r border-gray-800/50 bg-gray-900/40 backdrop-blur-xl flex-shrink-0 relative overflow-hidden">
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-purple-900/5 to-cyan-900/10 animate-pulse"></div>
        
        <div className="relative z-10">
          {/* Header Section */}
          <div className="p-6 border-b border-gray-800/50">
            <h2 className="text-xl font-semibold text-white mb-1">Dashboard</h2>
            <p className="text-sm text-gray-400">Manage your strategies</p>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  group flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300
                  ${isActivePath(item.href)
                    ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 text-white shadow-lg shadow-blue-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50 hover:border-gray-700/50 border border-transparent'
                  }
                  hover:scale-105 hover:shadow-lg hover:shadow-gray-900/20
                `}
              >
                <div className={`
                  p-1.5 rounded-lg transition-all duration-300
                  ${isActivePath(item.href)
                    ? 'bg-blue-500/20 text-blue-400 shadow-md shadow-blue-500/20'
                    : 'text-gray-400 group-hover:text-blue-400 group-hover:bg-blue-500/10'
                  }
                `}>
                  {item.icon}
                </div>
                <span className="group-hover:text-cyan-100 transition-colors duration-200">
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>

          {/* Quick Stats in Sidebar */}
          <div className="p-4 mt-6">
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/50 border border-gray-700/30 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="text-sm font-medium text-gray-300 mb-3">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-400">Total P&L</span>
                  <span className="text-xs font-semibold text-green-400">+$3,247.89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-400">Active Bots</span>
                  <span className="text-xs font-semibold text-blue-400">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-400">Win Rate</span>
                  <span className="text-xs font-semibold text-purple-400">73.2%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upgrade Section */}
          <div className="p-4 mt-auto">
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-xs font-medium text-purple-300 mb-2">Pro Features</div>
              <div className="text-xs text-gray-400 mb-3">Unlock advanced analytics and unlimited strategies</div>
              <button className="w-full px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 h-full overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}