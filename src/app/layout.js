'use client'
import localFont from 'next/font/local';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar_ from '@/components/LibaryComponent/MaterialUi Compomnent/App-Bar';
import './globals.css';
import { usePathname } from 'next/navigation';
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
  const pathName = usePathname()
  const isLoginPage = pathName === '/login';
  const isRegisterPage = pathName === '/register';
  const isForgetPage = pathName === '/forget_account';


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>      
        <UserProvider>
          <SessionProvider>
          {!isLoginPage && !isRegisterPage && !isForgetPage && <Navbar_ />}
            {children}
          </SessionProvider>
        </UserProvider>
        </Provider> 
      </body>
    </html>
  );
}
