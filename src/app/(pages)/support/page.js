"use client"
import React from 'react';
import Footer from '@/components/LibaryComponent/FlowbiteComponent/Footer';
import Navbar from '@/components/LibaryComponent/MaterialUi Compomnent/App-Bar';
import CustomSpinner from '@/components/Spinner';
import { useFetchCartlist } from '@/customHooks/useFetchCartList';
import { useFetchWishlist } from '@/customHooks/useFetchWishList';
import useSession from '@/utils/UserExist/GetSession';
export default function AccountSupportPage() {
  const session = useSession();
  
          const { cartListLoading } = useFetchCartlist(session?.user?.id);
          const { wishListLoading } = useFetchWishlist(session?.user?.id);
        
          if ((session?.user?.id && wishListLoading) || cartListLoading) {
            return <CustomSpinner />;
          }
    return (
      <>
      <Navbar/>
      <div className="min-h-screen bg-gray-50 pt-10">
        <div className="  bg-white rounded-xl shadow-sm">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-100">
          <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 p-6 md:p-8 xl:px-14 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl pt-6  font-bold text-white mb-2">
            Account Support
            </h1>
            <p className="text-emerald-100 text-lg">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          <div className="p-6 md:p-8 xl:px-14">
            <div className="flex items-start bg-emerald-50 rounded-lg p-4 border-l-4 border-emerald-500">
              <svg className="w-6 h-6 text-emerald-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg text-gray-600">
                At <span className="font-bold text-emerald-700">Shopease</span>, Manage your account and get help.
              </p>
            </div>
          </div>
        </div>
  
          {/* Common Issues */}
          <div className="mb-8 p-6 md:p-8 xl:px-14">
            <h2 className="font-semibold text-[#047857] mb-4">
              Quick Solutions
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Forgot Password</h3>
                <p className="text-gray-600 text-sm">
                  Reset your password using your email
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Update Account Details</h3>
                <p className="text-gray-600 text-sm">
                  Change your personal information
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Close Account</h3>
                <p className="text-gray-600 text-sm">
                  Permanently delete your account
                </p>
              </div>
            </div>
          </div>
  
          {/* Contact Options */}
          <div className="mb-8 p-6 md:p-8 xl:px-14">
            <h2 className="font-semibold text-[#047857] mb-4">
              Contact Support
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#047857] text-white p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Call Us</h3>
                  <p className="text-gray-600 text-sm">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
  
              <div className="flex items-center gap-3">
                <div className="bg-[#047857] text-white p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Email Us</h3>
                  <p className="text-gray-600 text-sm">
                    support@example.com
                  </p>
                </div>
              </div>
            </div>
          </div>
  
          {/* FAQ */}
          <div className="mb-6 p-6 md:p-8 xl:px-14">
            <h2 className="font-semibold text-[#047857] mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              <details className="border-b pb-3">
                <summary className="font-medium cursor-pointer">How do I update my email address?</summary>
                <p className="text-gray-600 text-sm mt-2 pl-5">
                  Go to Account Settings → Personal Information → Edit Email
                </p>
              </details>
              <details className="border-b pb-3">
                <summary className="font-medium cursor-pointer">Why can't I log in?</summary>
                <p className="text-gray-600 text-sm mt-2 pl-5">
                  Try resetting your password or contact support if the issue persists
                </p>
              </details>
            </div>
          </div>
  
          {/* Live Chat Button */}
        
        </div>
      </div>
      <Footer/>
      </>
    );
  }