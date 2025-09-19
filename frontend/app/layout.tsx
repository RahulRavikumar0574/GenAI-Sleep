import './globals.css';
import { ReactNode } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import AppThemeProvider from '../providers/AppThemeProvider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <AppThemeProvider>
          <NavBar />
          <main>
            {children}
          </main>
          <Footer />
        </AppThemeProvider>
      </body>
    </html>
  );
}
