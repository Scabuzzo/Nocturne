// src/_components/ui/Navbar.tsx - Futuristic Jup.ag-inspired navbar

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const [walletConnected, setWalletConnected] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-800/30">
      {/* Futuristic backdrop with layered effects */}
      <div className="absolute inset-0 bg-gray-950/95 backdrop-blur-2xl"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/10 via-purple-950/5 to-cyan-950/10 animate-gradient bg-size-200"></div>
      
      {/* Smooth animated border glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-60"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-gradient bg-size-300"></div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Section: Logo + Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo with enhanced futuristic styling */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                {/* Glow effect behind logo */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-all duration-300 border border-blue-400/30 shadow-lg shadow-blue-500/25">
                  {/* Proper crescent moon shape */}
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    {/* Simple, clean crescent moon */}
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.3 0 2.5-.2 3.7-.7-2.4-1.1-4.1-3.6-4.1-6.5 0-3.9 3.1-7 7-7 .8 0 1.5.1 2.2.4C19.4 4.6 16 2 12 2z"/>
                    
                    {/* Small stars around */}
                    <circle cx="7" cy="7" r="0.8" fill="currentColor" opacity="0.6"/>
                    <circle cx="17" cy="8" r="0.5" fill="currentColor" opacity="0.4"/>
                    <circle cx="6" cy="16" r="0.6" fill="currentColor" opacity="0.5"/>
                  </svg>
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent group-hover:from-cyan-200 group-hover:via-white group-hover:to-blue-100 transition-all duration-300">
                Nocturne
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group overflow-hidden
                    ${isActivePath(item.href)
                      ? 'text-white bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 shadow-lg shadow-blue-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/30 hover:border-gray-700/30 border border-transparent'
                    }
                  `}
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  <span className="relative z-10">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Center Section: Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full relative group">
              <div className={`
                relative flex items-center bg-gray-900/50 border rounded-xl transition-all duration-300 backdrop-blur-sm
                ${isSearchFocused 
                  ? 'border-blue-500/50 shadow-lg shadow-blue-500/20 bg-gray-900/70' 
                  : 'border-gray-700/50 hover:border-gray-600/50'
                }
              `}>
                {/* Search icon */}
                <div className="pl-4 pr-3">
                  <svg 
                    className={`w-4 h-4 transition-colors duration-200 ${
                      isSearchFocused ? 'text-blue-400' : 'text-gray-400'
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
                {/* Search input */}
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search strategies, tokens, or creators..."
                  className="flex-1 py-3 pr-4 bg-transparent text-white placeholder-gray-400 text-sm focus:outline-none"
                />
                
                {/* Search shortcut hint */}
                <div className="pr-4">
                  <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-mono text-gray-400 bg-gray-800/50 border border-gray-600/30 rounded">
                    /
                  </kbd>
                </div>
              </div>
              
              {/* Glow effect on focus */}
              {isSearchFocused && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-md -z-10 animate-pulse-glow"></div>
              )}
            </form>
          </div>

          {/* Right Section: Connect Wallet */}
          <div className="flex items-center gap-4">
            {/* Mobile search button */}
            <button className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Wallet Connection */}
            <div className="relative">
              {!walletConnected ? (
                <button
                  onClick={handleWalletClick}
                  className="group relative px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-medium rounded-xl transition-all duration-300 border border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 overflow-hidden"
                >
                  {/* Button glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Connect Wallet
                  </span>
                </button>
              ) : (
                <div className="relative">
                  <button
                    onClick={handleWalletClick}
                    className="group flex items-center gap-3 px-4 py-2.5 bg-gray-900/60 hover:bg-gray-800/60 border border-gray-700/50 hover:border-gray-600/50 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/20"
                  >
                    {/* Connection status indicator with pulse */}
                    <div className="relative">
                      <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center border border-green-400/30 shadow-lg shadow-green-500/25">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="absolute inset-0 bg-green-500/30 rounded-full animate-ping"></div>
                    </div>
                    
                    <div className="text-left hidden sm:block">
                      <div className="text-sm font-medium text-white group-hover:text-cyan-100 transition-colors duration-200">Connected</div>
                      <div className="text-xs text-gray-400 font-mono">0x1234...5678</div>
                    </div>
                    
                    <svg 
                      className={`w-4 h-4 text-gray-400 transition-all duration-300 ${
                        isDropdownOpen ? 'rotate-180 text-blue-400' : 'group-hover:text-gray-300'
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu with futuristic styling */}
                  {isDropdownOpen && (
                    <>
                      {/* Backdrop */}
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsDropdownOpen(false)}
                      />
                      
                      {/* Dropdown */}
                      <div className="absolute right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl shadow-gray-900/50 z-20 overflow-hidden animate-in scale-in">
                        {/* Header */}
                        <div className="p-4 border-b border-gray-700/30 bg-gradient-to-r from-gray-800/30 to-gray-900/30">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">Phantom Wallet</div>
                              <div className="text-xs text-gray-400 font-mono">0x1234...5678</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Balance */}
                        <div className="p-4 border-b border-gray-700/30">
                          <div className="text-xs text-gray-400 mb-1">Portfolio Balance</div>
                          <div className="text-xl font-bold text-white">$47,582.34</div>
                          <div className="text-xs text-green-400">+$1,247.89 (2.69%)</div>
                        </div>
                        
                        {/* Menu Items */}
                        <div className="p-2">
                          {[
                            { name: 'Profile', icon: '👤', href: '/profile' },
                            { name: 'Settings', icon: '⚙️', href: '/settings' },
                            { name: 'Help & Support', icon: '❓', href: '/help' },
                          ].map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200 group"
                            >
                              <span className="text-sm group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                              <span className="text-sm font-medium">{item.name}</span>
                            </Link>
                          ))}
                        </div>
                        
                        {/* Disconnect */}
                        <div className="p-2 border-t border-gray-700/30">
                          <button
                            onClick={() => {
                              setWalletConnected(false);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all duration-200 group"
                          >
                            <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="text-sm font-medium">Disconnect</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="lg:hidden border-t border-gray-800/30 p-4">
        <form onSubmit={handleSearch} className="relative group">
          <div className="flex items-center bg-gray-900/50 border border-gray-700/50 rounded-lg focus-within:border-blue-500/50 focus-within:shadow-lg focus-within:shadow-blue-500/20 transition-all duration-300">
            <div className="pl-3">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search strategies..."
              className="flex-1 py-3 px-3 bg-transparent text-white placeholder-gray-400 text-sm focus:outline-none"
            />
          </div>
        </form>
      </div>
    </nav>
  );
}