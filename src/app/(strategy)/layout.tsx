export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-950 text-white font-sans antialiased">
        {/* Global Navigation */}
        <Navbar />
        
        {/* Main Content */}
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* Global Scripts/Analytics would go here */}
        {process.env.NODE_ENV === 'production' && (
          // Add analytics script here when ready
          <></>
        )}
      </body>
    </html>
  );
}