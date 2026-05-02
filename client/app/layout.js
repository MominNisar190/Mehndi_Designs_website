import './globals.css';
import { Toaster } from 'react-hot-toast';
import ConditionalLayout from '@/components/layout/ConditionalLayout';
import { AuthProvider } from '@/context/AuthContext';
import { AppProvider } from '@/context/AppContext';

export const metadata = {
  title: {
    default: 'Saniya Mehndi Designs',
    template: '%s | Saniya Mehndi Designs',
  },
  description:
    'Premium mehndi designs for every occasion. Browse our gallery, preview designs on your hand, and book your appointment online.',
  keywords: ['mehndi', 'henna', 'bridal mehndi', 'arabic mehndi', 'mehndi designs', 'mehndi booking'],
  openGraph: {
    title: 'Saniya Mehndi Designs',
    description: 'Let your hands tell your beautiful story',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AppProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: '#141414',
                  color: '#f5f5f5',
                  border: '1px solid #2a2a2a',
                },
                success: {
                  iconTheme: { primary: '#d4af37', secondary: '#0a0a0a' },
                },
              }}
            />
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
