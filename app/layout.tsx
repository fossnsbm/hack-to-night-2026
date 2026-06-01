import type { Metadata } from 'next';
import { Orbitron, Rajdhani } from 'next/font/google';
import './globals.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap'
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'Hack To Night 2026',
  description: 'A TRON: Legacy-inspired hackathon experience for NSBM FOSS Community.',
  metadataBase: new URL('https://hacktonight2026.example'),
  openGraph: {
    title: 'Hack To Night 2026',
    description: 'Enter the grid and build the future with NSBM FOSS Community.',
    type: 'website'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${orbitron.variable} ${rajdhani.variable} bg-bg font-body text-ink antialiased`}>
        {children}
      </body>
    </html>
  );
}
