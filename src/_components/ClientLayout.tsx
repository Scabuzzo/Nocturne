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

  return (
    <>
      {/* Only show navbar if not on landing page */}
      {!isLandingPage && <Navbar />}
      
      <main className={isLandingPage ? '' : 'max-w-5xl mx-auto px-4 py-8'}>
        {children}
      </main>
    </>
  );
}