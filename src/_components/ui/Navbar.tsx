// src/_components/ui/Navbar.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export function Navbar() {
  const [walletConnected, setWalletConnected] = useState(false);

  return (
    <nav className="w-full border-b border-gray-800 px-4 py-3 flex justify-between items-center bg-black">
      <Link href="/" className="text-2xl font-bold text-blue-500">
        <Image src="/nocturne-logo1.png" alt="Nocturne Logo" className="inline-block h-8 w-8" width={50} height={60}/>
        Nocturne
      </Link>
      
      <div className="flex gap-6 text-gray-500 ml-6">
        <Link href="/build" className="hover:text-white py-1">Build</Link>
        <Link href="/dashboard" className="hover:text-white py-1">Dashboard</Link>
        <Link href="/explore" className="hover:text-white py-1">Explore</Link>
      </div>

      <button
        onClick={() => setWalletConnected(!walletConnected)}
        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
      >
        {walletConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
      </button>
    </nav>
  );
}