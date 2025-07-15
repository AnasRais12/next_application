"use client";
import React from 'react'
import  Navbar_ from '@/components/navbar/App-Bar'
import { usePathname } from 'next/navigation';

export default function LayoutNavbar() {
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/signup";
  const isForgetPage = pathname === "/verifyaccount";
  const isResetPasswordPage = pathname === "/resetPassword";

  const shouldShowNavbar =

    !isLoginPage &&
      !isRegisterPage &&
      !isForgetPage &&
      !isResetPasswordPage 

  return shouldShowNavbar ? <Navbar_ /> : null;
}

