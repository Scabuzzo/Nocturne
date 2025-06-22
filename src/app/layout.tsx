// src/app/layout.tsx

import './globals.css';
import { ReactNode } from 'react';
import { ClientLayout } from '@/_components/ClientLayout';

export const metadata = {
  title: 'Nocturne – Design by Day. Earn by Night.',
  description: 'Build crypto trading strategies with no coding required. Deploy automated bots and earn royalties.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground font-sans antialiased">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}