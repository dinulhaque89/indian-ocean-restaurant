import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from '../components/Header'
import Footer from '../components/Footer'
import { BasketProvider } from '../components/BasketContext';
import { Plus_Jakarta_Sans } from "next/font/google";
import { UserProvider } from '@auth0/nextjs-auth0/client';


const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '700'], // Add the weights you need
});
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'The Indian Ocean Restaurant',
  description: 'Delicious Indian cuisine',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <UserProvider>

        <BasketProvider>
          <Header />
            {children}
          <Footer />
        </BasketProvider>
        </UserProvider>

      </body>
    </html>
  );
}