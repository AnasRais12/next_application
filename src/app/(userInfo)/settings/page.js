'use client'
import React, { useState } from "react";

import { GlobalDetails } from "@/context/globalprovider/globalProvider";
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch, FiLogIn } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";

const SettingsPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {user} = GlobalDetails()
 console.log("!!!!!!_____________-",user)
  return (
<div className="flex min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-3 m-4 justify-start items-start flex bg-orange-600 text-white rounded-lg shadow-lg"
       
      >
        <FiMenu  onClick={() => setIsMenuOpen(true)}/>
      </button>
      
      {/* Sidebar */}
      <aside 
        className={`w-72  bg-gradient-to-b from-orange-700 to-orange-700 text-white sm:p-6 p-3 shadow-lg fixed inset-y-0 left-0 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 md:relative md:block rounded-r-lg`}
      >
        {/* Close Button for Mobile */}
        <button 
          className="md:hidden absolute top-4 right-4 text-white text-[30px]"
          onClick={() => setIsMenuOpen(false)}
        >
          <FiX/>
        </button>

        <div className=" sm:mt-0 mt-10  mb-6">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full  flex items-center justify-center text-xl font-bold">
            {user?.email?.charAt(0)?.toUpperCase()}
          </div>
          <h2 className="mt-2 font-semibold text-lg">{user?.user_metadata?.full_name || user?.email?.split("@")[0]}</h2>
          <p className="text-sm text-gray-300">{user?.email }</p>
        </div>
        <nav>
          <ul className="space-y-3">
            <li className="text-white font-semibold">Personal Information</li>
            <li className="text-gray-300 hover:text-orange-400  rounded-md py-2 px-2 mr-2 border-2 cursor-pointer transition-colors">Billing & Payments</li>
            <li className="text-gray-300 hover:text-orange-400 cursor-pointe rounded-md border-2 py-2 px-2 mr-2 transition-colors">Order History</li>
            <li className="text-gray-300 hover:text-orange-400 cursor-pointe rounded-md border-2 py-2 px-2 mr-2 transition-colors">Change Password</li>
            <li className="text-gray-300 hover:text-orange-400 flex items-center gap-2 cursor-pointe rounded-md border-2 py-2 px-2 mr-2 transition-colors">Logout </li>
            {/* <span><IoLogOut className="text-[25px]"/></span> */}
 
          </ul>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-xl font-semibold mb-4 text-gray-800">Personal Information</h1>
        <p className="text-gray-600 mb-6">Manage your personal information, including phone numbers and email address.</p>
        <h1 className="text-xl font-semibold text-center mb-4 text-gray-800">Hello {user?.user_metadata?.full_name || user?.email?.split("@")[0]}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white-500 px-2 py-2 rounded-lg shadow-md border-l-4 border-orange-600">
            <h2 className="font-semibold text-gray-700">Name</h2>
            <p className="text-gray-500">{user?.user_metadata?.full_name || user?.email?.split("@")[0]}</p>
          </div>
          <div className="bg-white px-2 py-2 rounded-lg shadow-md border-l-4 border-orange-600">
            <h2 className="font-semibold text-gray-700">Date of Birth</h2>
            <p className="text-gray-500">07 July 1993</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-orange-600">
            <h2 className="font-semibold text-gray-700">Country Region</h2>
            <p className="text-gray-500">Georgia, Tbilisi</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-orange-600">
            <h2 className="font-semibold text-gray-700">Language</h2>
            <p className="text-gray-500">English (UK) - English</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-orange-600">
            <h2 className="font-semibold text-gray-700">Contactable at</h2>
            <p className="text-gray-500">ikakodesign@gmail.com</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;


