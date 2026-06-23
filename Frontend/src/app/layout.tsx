import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Unity State Bentiu Website',
    template: '%s | Unity State Bentiu Website',
  },
  description:
    'Official digital nerve center for Unity State, South Sudan — verified news, public notices, and digital services.',
  openGraph: {
    title: 'Unity State Bentiu Website',
    description: 'Verified government information and digital services for Unity State citizens.',
    type: 'website',
  },
  icons: {
    icon: '/unity-state-bentiu-logo.png',
    apple: '/unity-state-bentiu-logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
