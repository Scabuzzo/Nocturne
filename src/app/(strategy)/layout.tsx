// src/app/(strategy)/layout.tsx

import { ReactNode } from 'react';
import { Navbar } from '@/_components/ui/Navbar';

interface StrategyLayoutProps {
  children: ReactNode;
}

export default function StrategyLayout({ children }: StrategyLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Global Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main className="h-screen pt-16">
        {children}
      </main>
    </div>
  );
}