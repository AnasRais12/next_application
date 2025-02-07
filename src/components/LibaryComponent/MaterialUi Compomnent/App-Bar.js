'use client'
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react'
import { getUser } from "@/lib/Auth";
import { GlobalDetails } from "@/context/globalprovider/globalProvider";
import { useRouter } from "next/navigation";
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch, FiLogIn } from "react-icons/fi";
export default function Navbar() {

  const router = useRouter()
  const [click, setclick] = useState(false);
  const { user } = GlobalDetails()
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const DropdownMenu = user
    ? ["Dashboard", "Settings", "Orders", ]
    : ["Login"];
  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto sm:px-6 px-4 lg:px-8">
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
          {/* Search Button */}
          <div className="flex items-center  sm:w-fit w-[60%] justify-end  space-x-2 lg:gap-2 relative">
            {/* Search Button */}
            <button>
              <FiSearch className="text-2xl text-gray-700 hover:text-orange-600" />
            </button>

            {/* Shopping Cart */}
            <button className="relative">
              <FiShoppingCart className="text-[20px] text-gray-700 hover:text-orange-600" />
              <span className="absolute -top-2 -right-2 z-50 bg-orange-500  text-black text-xs px-1.5  rounded-full">
                3
              </span>
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowModal(!showModal)}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${user ? " text-orange-500 hover:bg-gray-100"  : "bg-gray-100 text-black"
                  }`}
              >
                {user ? (
                  <span className="text-md font-semibold">
                    {user.email.slice(0, 2).toUpperCase()}
                  </span>
                ) : (
                  <FiUser className="text-2xl" />
                )}
              </button>

              {/* Dropdown Menu (Responsive Fix) */}
              {showModal && (
                <div className="absolute md:right-0 -right-7 mt-2  bg-white border rounded-md shadow-lg z-50">
                  <ul className="py-1">
                    {DropdownMenu.map((item, index) => (
                      <li
                        key={index}
                        className={`px-4 whitespace-nowrap py-2 hover:bg-gray-100 cursor-pointer ${item === "Login" ? "text-[red]" : "text-black"
                          }`}
                        onClick={() =>
                           router.push(`/${item.toLowerCase()}`)
                        }
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                </div>
              )}
            </div>
            {/* Search bar Div */}
            {click ? (
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
                      onClick={() => setclick(false)}
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

