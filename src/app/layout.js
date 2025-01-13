'use client'
import localFont from 'next/font/local';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './globals.css';
import UserProvider from '@/context/userProvider/userProvider';
import { SessionProvider } from 'next-auth/react';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>      
        <UserProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
        </UserProvider>
        </Provider> 
      </body>
    </html>
  );
}
