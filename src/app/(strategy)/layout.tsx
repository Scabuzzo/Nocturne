// src/app/(strategy)/layout.tsx
import { ReactNode } from 'react';

interface StrategyLayoutProps {
  children: ReactNode;
}

export default function StrategyLayout({ children }: StrategyLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Remove the Navbar from here */}
      <main > {/* Keep padding for the root navbar */}
        {children}
      </main>
    </div>
  );
}