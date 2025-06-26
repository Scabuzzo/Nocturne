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
    <nav className="sticky top-0 z-50 w-full border-b border-gray-800/20">
      {/* Subtle backdrop with better blur */}
      <div className="absolute inset-0 bg-gray-950/90 backdrop-blur-xl"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/5 via-transparent to-purple-950/5"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - More Professional */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-sm">
                {/* Replaced emoji with icon */}
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <span className="text-lg font-semibold text-white">
                Nocturne
              </span>
            </div>
          </Link>

          {/* Navigation Links - Cleaner Styling */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActivePath(item.href)
                    ? 'text-white bg-gray-800/50 border border-gray-700/50'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/30'
                  }
                `}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Wallet Section - More Professional */}
          <div className="relative">
            {!walletConnected ? (
              <button
                onClick={handleWalletClick}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Connect Wallet
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={handleWalletClick}
                  className="flex items-center gap-3 px-3 py-2 bg-gray-800/60 hover:bg-gray-700/60 border border-gray-700/40 hover:border-gray-600/40 text-white rounded-lg transition-all duration-200"
                >
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="text-sm font-medium">Connected</div>
                    <div className="text-xs text-gray-400 font-mono">0x1234...5678</div>
                  </div>
                  <svg 
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-xl z-50">
                    <div className="p-4 border-b border-gray-700/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">Wallet Connected</div>
                          <div className="text-xs text-gray-400 font-mono">0x1234...5678</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setWalletConnected(false);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
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
            <button className="p-2 text-gray-400 hover:text-white rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}