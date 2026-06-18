import './globals.css';
import type { Metadata, Viewport } from 'next';
export const metadata: Metadata = { title: 'VASEY.AUDIO Music Intelligence Suite', description: 'MusicSpec compiler and QA console by Vasey Multimedia', manifest: '/manifest.webmanifest', appleWebApp: { capable: true, title: 'VASEY.AI Music' } };
export const viewport: Viewport = { themeColor: '#00090E', width: 'device-width', initialScale: 1, viewportFit: 'cover' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
