'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    // Admin pages — no Navbar, no Footer, no padding
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
