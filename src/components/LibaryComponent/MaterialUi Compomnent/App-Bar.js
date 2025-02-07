'use client'
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react'
import { GlobalDetails } from "@/context/globalprovider/globalProvider";
import { useRouter } from "next/navigation";
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch, FiLogIn } from "react-icons/fi";
export default function Navbar() {
  const router = useRouter()
  const [click, setclick] = useState(false);
  const {user} = GlobalDetails()
  console.log("Mai hu USER", user?.email?.slice(0, 2).toUpperCase().split("").join(" "));
  const {data } = useSession()
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="sm:text-2xl text-[22px] font-bold text-orange-600">ShopEase</div>

          {/* Navigation Links - Centered */}
          <div className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
            <a href="#" className="text-gray-700 hover:text-orange-600">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-600">
              Shop
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-600">
              Categories
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-600">
              Contact
            </a>
          </div>

          {/* Icons: Search, Cart, User, Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button onClick={()=> setclick(true)}>
              <FiSearch className="text-2xl text-gray-700 hover:text-orange-600" />
            </button>
           

            <button className="relative">
              <FiShoppingCart className="text-2xl text-gray-700 hover:text-orange-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                3
              </span>
            </button>
            <button className={`px-2 ml-2 py-2 text-[14px] rounded-full bg-orange-600 text-white`}>
              {user?   user?.email?.slice(0, 2).toUpperCase() :  <FiLogIn onClick={()=> router.push('/login')} className="text-2xl text-gray-700 hover:text-orange-600"/> }
            </button>
            {/* Search bar Div */} 
            {click? (
            <>
              <div className=" gimm  block   overflow-hidden top-full h-[300px] bg-white absolute left-0 right-0   ">
                <div className="w-full bg-white pt-[20px]  pb-[10px] flex ">
                  <img className="z-10" src="images/favicon.ico" />
                  <div className="flex bg-gray-100 w-[65%]  items-center rounded-[20px]">
                    <div className="w-[40px] h-[40px] rounded-[50%] hover:bg-gray-300 bg-white flex justify-center items-center">
                      <FiSearch className="text-[25px] " />
                    </div>

                    <input
                      className="pl-[10px] h-[5vh] w-full rounded-[20px] hover:bg-gray-200 border-gray-200 border-2"
                      placeholder="Search"
                    />
                  </div>

                  <button
                    onClick={()=> setclick(false)}
                    className="bg-white font-bold rounded-[15px] py-1 px-4 border-2 border-gray-100 hover:bg-gray-100 "
                  >
                    Cancel
                  </button>
                </div>
                <div className="w-full bg-white pt-[20px] pl-[18%] pb-[20px]">
                  <div className=" flex flex-col">
                    <h1 className="mb-[15px] text-gray-400">
                      Popular Search Items
                    </h1>
                    <h1 className="mb-[5px] text-[20px] font-semi-bold">
                      Air Force 1
                    </h1>
                    <h1 className="mb-[5px] text-[20px] font-semi-bold">
                      Jordan
                    </h1>
                    <h1 className="mb-[5px] text-[20px]  font-semi-bold">
                      Air Max
                    </h1>
                    <h1 className="mb-[5px] text-[20px]  font-semi-bold">
                      Blazer
                    </h1>
                  </div>
                </div>
              </div>
            </>
          ) : null}
            {/* Mobile Menu Toggle */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        
              {isOpen ? (
                <FiX className="text-2xl text-gray-700" />
              ) : (
                <FiMenu className="text-2xl text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-4 py-4">
            <a href="#" className="text-gray-700 hover:text-orange-600">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-600">
              Shop
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-600">
              Categories
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-600">
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
