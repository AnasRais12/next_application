// components/ResponsiveFooter.jsx
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Footer from "@/components/LibaryComponent/FlowbiteComponent/Footer";

export default function LayoutFooter() {
  const [windowWidth, setWindowWidth] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // Initial run
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/signup";
  const isForgetPage = pathname === "/verifyaccount";
  const isResetPasswordPage = pathname === "/resetPassword";
  const isSettingPage = pathname === "/settings";

  const shouldShowFooter =
    (isSettingPage && windowWidth >= 1024) || // only desktop for settings
    (!isLoginPage &&
      !isRegisterPage &&
      !isForgetPage &&
      !isResetPasswordPage &&
      !isSettingPage); // default for others

  return shouldShowFooter ? <Footer /> : null;
}
