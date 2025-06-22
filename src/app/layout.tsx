// src/app/layout.tsx

import './globals.css';
import { ReactNode } from 'react';
import { Navbar } from '@/_components/ui/Navbar';

export const metadata = {
  title: 'Nocturne – Earn money while you sleep',
  description: 'Backtest and deploy crypto strategies effortlessly.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground font-sans antialiased">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}