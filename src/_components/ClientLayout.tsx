// src/_components/ClientLayout.tsx

'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/_components/ui/Navbar';

interface ClientLayoutProps {
  children: ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';
  const isStrategyPage = pathname.startsWith('/build') || pathname.startsWith('/results');

  return (
    <>
      {/* Show navbar on all pages now */}
      <Navbar />
      
      <main className={
        isLandingPage 
          ? '' // Landing page handles its own layout
          : isStrategyPage 
            ? '' // Strategy pages are full-width
            : 'max-w-5xl mx-auto px-4 py-8' // Other pages get container
      }>
        {children}
      </main>
    </>
  );
}