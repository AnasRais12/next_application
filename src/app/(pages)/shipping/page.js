"use client"
import React from 'react';
import Footer from '@/components/LibaryComponent/FlowbiteComponent/Footer';
import Navbar from '@/components/LibaryComponent/MaterialUi Compomnent/App-Bar';
import CustomSpinner from '@/components/Spinner';
import { useFetchCartlist } from '@/customHooks/useFetchCartList';
import { useFetchWishlist } from '@/customHooks/useFetchWishList';
import useSession from '@/utils/UserExist/GetSession';
import Link from "next/link";

export default function ShippingInfoPage() {
    const session = useSession();
     
            const { cartListLoading } = useFetchCartlist(session?.user?.id);
            const { wishListLoading } = useFetchWishlist(session?.user?.id);
          
            if ((session?.user?.id && wishListLoading) || cartListLoading) {
              return <CustomSpinner />;
            }
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 pt-10 ">
      <div className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden ">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-100">
          <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 p-6 md:p-8 xl:px-14 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl pt-6  font-bold text-white mb-2">
              Shipping Information
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
                At <span className="font-bold text-emerald-700">Shopease</span>, we want you to be completely satisfied with your purchase. If you're not happy with your order, we'll make it right.
              </p>
            </div>
          </div>
        </div>

        {/* How to Track Order */}
        <div className="mb-10 p-6 md:p-8 xl:px-14">
          <h2 className="text-xl font-semibold text-[#047857] mb-4">
            How to Track Your Order
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#047857] flex items-center justify-center text-white font-bold mr-4">
                1
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Check Your Email
                </h3>
                <p className="text-gray-600">
                  You’ll receive a confirmation email with your order number and a tracking link.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#047857] flex items-center justify-center text-white font-bold mr-4">
                2
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Visit the Tracking Page
                </h3>
                <p className="text-gray-600">
                  Click the tracking link in your email or enter your order number on our website.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#047857] flex items-center justify-center text-white font-bold mr-4">
                3
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Track in Real-Time
                </h3>
                <p className="text-gray-600">
                  View live updates on your shipment’s location and estimated delivery date.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery FAQs */}
        <div className="mb-10 p-6 md:p-8 xl:px-14">
          <h2 className="text-xl font-semibold text-[#047857] mb-4">
            Delivery FAQs
          </h2>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-medium text-gray-900">
                How long does delivery take?
              </h3>
              <p className="text-gray-600 mt-1">
                Standard delivery takes 3-5 business days. Express options are available at checkout.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-medium text-gray-900">
                What if my package is delayed?
              </h3>
              <p className="text-gray-600 mt-1">
                Check tracking for updates. If delayed beyond the estimated date, contact our support team.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-medium text-gray-900">
                Can I change my shipping address?
              </h3>
              <p className="text-gray-600 mt-1">
                Address changes are only possible before your order is shipped. Contact us immediately for assistance.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-6 md:p-8 xl:px-14">
          <p className="text-gray-600 mb-4">
            Need help? Contact our support team.
          </p>
          <Link href="/contact" className="bg-[#047857] hover:bg-[#03684d] text-white font-medium py-2 px-6 rounded-lg transition duration-200">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}