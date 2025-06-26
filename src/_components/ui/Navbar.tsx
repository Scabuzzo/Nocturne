// src/_components/ui/Navbar.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const [walletConnected, setWalletConnected] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigation = [
    { name: 'Build', href: '/build' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Explore', href: '/explore' },
  ];

  const isActivePath = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const handleWalletClick = () => {
    if (walletConnected) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      setWalletConnected(true);
      // In real app, would trigger wallet connection
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-700/20">
      {/* Updated Gradient Background - from bottom to top */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/80 to-gray-950/95 backdrop-blur-xl"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-purple-950/10"></div>
      
      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-blue-500/25">
                <span className="text-white text-lg">🌙</span>
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Nocturne
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActivePath(item.href)
                    ? 'text-white bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/40 shadow-lg shadow-blue-500/20'
                    : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-800/40 hover:to-gray-700/40 hover:backdrop-blur-sm'
                  }
                `}
              >
                {item.name}
                {isActivePath(item.href) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg blur-sm"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Wallet Section */}
          <div className="relative">
            {!walletConnected ? (
              <button
                onClick={handleWalletClick}
                className="group relative px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                <span className="relative z-10">Connect Wallet</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={handleWalletClick}
                  className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-gray-800/60 to-gray-700/60 hover:from-gray-700/60 hover:to-gray-600/60 border border-gray-600/30 hover:border-gray-500/30 text-white rounded-lg transition-all backdrop-blur-sm"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/25">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="text-sm font-medium">Connected</div>
                    <div className="text-xs text-gray-400 font-mono">0x1234...5678</div>
                  </div>
                  <svg 
                    className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl shadow-black/50 z-10">
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-3 pb-3 border-b border-gray-700/50">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">Wallet Connected</div>
                          <div className="text-xs text-gray-400 font-mono">0x1234...5678</div>
                        </div>
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                      >
                        <div className="w-5 h-5 rounded bg-blue-600/20 flex items-center justify-center">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        </div>
                        View Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          setWalletConnected(false);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <div className="w-5 h-5 rounded bg-red-600/20 flex items-center justify-center">
                          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        </div>
                        Disconnect
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="p-2 text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}