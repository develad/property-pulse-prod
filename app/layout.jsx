import '@/assets/styles/globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
// next-auth
import AuthProvider from '@/components/AuthProvider';
// next-themes
import { Providers as ThemeProvider } from './providers';
import { Toaster } from 'react-hot-toast';
import { GlobalProvider } from '@/context/GlobalContext';
import 'photoswipe/dist/photoswipe.css';

export const metadata = {
  title: 'PropertyPulse | Find The Perfect Rental',
  description: 'Find your dream rental property',
  keywords: 'rental, find rentals, find properties',
};

const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html
          lang="en"
          suppressHydrationWarning
        >
          <body className="flex flex-col min-h-screen">
            <ThemeProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
              <Toaster />
            </ThemeProvider>
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
};

export default MainLayout;
