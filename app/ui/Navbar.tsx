'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Navbar() {
  const [walletConnected, setWalletConnected] = useState(false);

  return (
    <nav className="w-full border-b border-gray-800 px-4 py-3 flex justify-between items-center bg-black">
      <div className="flex gap-6">
        <Link href="/backtest" className="hover:text-blue-400">Backtest</Link>
        <Link href="/results" className="hover:text-blue-400">Results</Link>
        <Link href="/history" className="hover:text-blue-400">History</Link>
        <Link href="/active-strategies" className="hover:text-blue-400">Active</Link>
        <Link href="/open-trades" className="hover:text-blue-400">Trades</Link>
      </div>

      <button
        onClick={() => setWalletConnected(!walletConnected)}
        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        {walletConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
      </button>
    </nav>
  );
}
