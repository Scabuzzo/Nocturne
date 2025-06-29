// src/app/page.tsx - Enhanced with futuristic animations

'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectWallet = () => {
    setIsWalletConnected(!isWalletConnected);
    // In real app, would trigger wallet connection
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thanks for your interest! We'll notify ${email} when we launch.`);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white overflow-hidden">
      {/* Hero Section with enhanced futuristic effects */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        {/* Enhanced background with layered gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-cyan-900/15 animate-gradient bg-size-300"></div>
        
        {/* Animated background elements with glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl animate-float opacity-60"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl animate-pulse opacity-50" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-cyan-600/10 rounded-full blur-3xl animate-pulse opacity-40" style={{ animationDelay: '2s' }}></div>
          
          {/* Additional glow orbs */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse opacity-70" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-32 left-20 w-48 h-48 bg-purple-500/15 rounded-full blur-2xl animate-float opacity-60" style={{ animationDelay: '1.5s' }}></div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Main Headline with enhanced gradients */}
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight animate-in slide-in-from-bottom-4">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent bg-size-300 animate-gradient">
              Design by Day.
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent bg-size-300 animate-gradient" style={{ animationDelay: '0.5s' }}>
              Earn by Night.
            </span>
          </h1>

          {/* Subtitle with glow effect */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-in slide-in-from-bottom-4" style={{ animationDelay: '0.2s' }}>
            Build crypto trading strategies with <span className="text-blue-400 font-semibold hover:text-cyan-400 transition-colors duration-300">no coding required</span>. 
            Deploy automated bots that trade while you sleep. 
            <span className="text-green-400 font-semibold hover:text-green-300 transition-colors duration-300"> Earn royalties</span> when others profit from your strategies.
          </p>

          {/* Enhanced CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-in slide-in-from-bottom-4" style={{ animationDelay: '0.4s' }}>
            <Link
              href="/build"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-semibold text-lg transition-all duration-300 border border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105 overflow-hidden"
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center gap-3">
                🚀 Start Building
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            
            <button
              onClick={handleConnectWallet}
              className="group relative px-8 py-4 bg-gray-900/60 hover:bg-gray-800/60 border-2 border-gray-700/50 hover:border-cyan-500/50 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 hover:scale-105 backdrop-blur-sm"
            >
              <span className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${isWalletConnected ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                {isWalletConnected ? 'Wallet Connected' : 'Connect Wallet'}
              </span>
            </button>
          </div>

          {/* Live strategy ticker with glow effects */}
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-gray-900/40 backdrop-blur-xl border border-gray-700/40 rounded-full text-sm animate-in slide-in-from-bottom-4" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <span className="text-gray-300">Live:</span>
            </div>
            <div className="text-green-400 font-semibold">+$1,247 earned today</div>
            <div className="text-gray-400">•</div>
            <div className="text-blue-400 font-semibold">23 active strategies</div>
          </div>
        </div>
      </section>

      {/* Three Pillars with enhanced animations */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-black/70"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">
              Why Choose Nocturne?
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎨',
                title: 'No-Code Strategy Builder',
                description: 'Visual drag-and-drop interface makes complex trading strategies accessible to everyone.',
                gradient: 'from-blue-500 to-cyan-500',
                delay: '0s'
              },
              {
                icon: '🤖',
                title: 'Automated Execution',
                description: 'Deploy bots that trade 24/7, never missing opportunities while you sleep.',
                gradient: 'from-purple-500 to-pink-500',
                delay: '0.2s'
              },
              {
                icon: '💰',
                title: 'Passive Income',
                description: 'Earn royalties when other traders profit from your published strategies.',
                gradient: 'from-green-500 to-emerald-500',
                delay: '0.4s'
              }
            ].map((pillar, index) => (
              <div
                key={index}
                className="group relative bg-gray-900/50 backdrop-blur-xl border border-gray-700/40 rounded-2xl p-8 hover:border-gray-600/50 transition-all duration-500 hover:scale-105 animate-in slide-in-from-bottom-4"
                style={{ animationDelay: pillar.delay }}
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${pillar.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl blur-xl`}></div>
                
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {pillar.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-100 transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works with futuristic step indicators */}
      <section className="py-20 bg-gradient-to-b from-black/70 to-gray-900/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Design Strategy',
                description: 'Use our visual builder to create your trading logic with indicators',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                step: '2',
                title: 'Backtest Performance',
                description: 'Test your strategy against historical data to validate performance',
                gradient: 'from-cyan-500 to-purple-500'
              },
              {
                step: '3',
                title: 'Deploy Bot',
                description: 'Launch your automated trading bot to execute trades 24/7',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                step: '4',
                title: 'Earn',
                description: 'Profit from your trades or earn royalties by publishing strategies',
                gradient: 'from-pink-500 to-green-500'
              }
            ].map((step, index) => (
              <div key={index} className="text-center group animate-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-r ${step.gradient} rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold text-white shadow-2xl group-hover:scale-110 transition-all duration-300 border border-white/20`}>
                    {step.step}
                  </div>
                  {/* Glow effect */}
                  <div className={`absolute inset-0 w-20 h-20 bg-gradient-to-r ${step.gradient} rounded-2xl mx-auto opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl -z-10`}></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-100 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators with glow effects */}
      <section className="py-16 bg-black border-t border-gray-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: (
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ),
                title: 'Non-Custodial',
                bg: 'bg-green-600',
                glow: 'shadow-green-500/25'
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                ),
                title: 'Bank-Grade Security',
                bg: 'bg-blue-600',
                glow: 'shadow-blue-500/25'
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ),
                title: 'GDPR Compliant',
                bg: 'bg-purple-600',
                glow: 'shadow-purple-500/25'
              }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center gap-4 group animate-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`w-10 h-10 ${item.bg} rounded-full flex items-center justify-center shadow-lg ${item.glow} group-hover:scale-110 transition-all duration-300`}>
                  {item.icon}
                </div>
                <span className="text-gray-300 font-medium text-lg group-hover:text-white transition-colors duration-300">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter signup with futuristic styling */}
      <section className="py-20 bg-gradient-to-t from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">
              Ready to Start Trading Smarter?
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of traders who are already building and deploying automated strategies with Nocturne.
          </p>
          
          <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 bg-gray-900/60 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:shadow-lg focus:shadow-blue-500/20 transition-all duration-300 backdrop-blur-sm"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105"
            >
              Get Early Access
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}