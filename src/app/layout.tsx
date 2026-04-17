import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KeenKeeper — Stay Close to the People Who Matter',
  description: 'Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.',
  keywords: 'friends, relationships, connection tracker, social, contact manager',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50`}>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1a3a33',
              color: '#fff',
              borderRadius: '10px',
              fontSize: '14px',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
            },
            success: {
              iconTheme: { primary: '#4ecdc4', secondary: '#1a3a33' },
            },
          }}
        />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
