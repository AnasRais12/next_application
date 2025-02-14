'use client'
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import useSession from "@/utils/UserExist/GetSession";
import { getUser } from "@/lib/Auth";
import { motion } from "framer-motion";
import { GlobalDetails } from "@/context/globalprovider/globalProvider";
import { useRouter } from "next/navigation";
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch, FiLogIn } from "react-icons/fi";
export default function Navbar() {

  const router = useRouter()

  const [searchBar, setSearchBar] = useState(false);
  const { user } = GlobalDetails()
  const userss = useSession()
  const [query, setQuery] = useState("");

  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const DropdownMenu = user
    ? ["Dashboard", "Settings", "Orders",]
    : ["Become A Seller", "Become A buyer"];
  console.log("Itemss1 ", userss);

  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto sm:px-6 px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="sm:text-[30px] text-[22px]  font-bold text-orange-600">ShopEase</div>

          {/* Navigation Links - Centered */}
          <div className="hidden md:flex space-x-8 text-[22px] absolute left-1/2 transform -translate-x-1/2">
            <a href="#" className="text-gray-700 font-medium hover:text-orange-600">
              Home
            </a>
            <a href="#" className="text-gray-700 font-medium hover:text-orange-600">
              Shop
            </a>
            <a href="#" className="text-gray-700 font-medium hover:text-orange-600">
              Categories
            </a>
            <a href="#" className="text-gray-700 font-medium hover:text-orange-600">
              Contact
            </a>
          </div>

          {/* Icons: Search, Cart, User, Mobile Menu */}
          {/* Search Button */}
          <div className="flex items-center   sm:w-fit w-[60%] justify-end  space-x-2 lg:gap-2 relative">
            {/* Search Button */}
            <button onClick={() => setSearchBar(true)}>
              <FiSearch className="sm:text-[30px] text-[22px] text-gray-700 hover:text-orange-600" />
            </button>



            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowModal(!showModal)}
                className={`flex items-center justify-center  ${user ? " bg-orange-500 text-white  size-7 md:size-8 rounded-full  hover:text-black" : " text-black"
                  }`}
              >

                {user ? (
                  <span className="text-lg text-center font-normal">
                    {user.email.slice(0, 1).toUpperCase()}
                  </span>
                ) : (
                  <FiUser className="sm:text-[30px] text-[22px]" />
                )}
              </button>

              {/* Dropdown Menu (Responsive Fix) */}
              {showModal && (
                <div className="absolute md:-right-4 -right-7 mt-2  bg-white border rounded-md shadow-lg z-50">
                  <ul className="py-1">

                    {DropdownMenu.map((item, index) => {
                      const role = item === "Become A Seller" ? "seller" : "buyer";

                      return (
                        <li
                          key={index}
                          className={`px-4 text-[13px] md:text-[16px] whitespace-nowrap py-2 hover:bg-gray-100 cursor-pointer ${item === "Become A buyer" ? "bg-[green] text-white hover:bg-[#4dd14d]" : "text-black"
                            }`}
                          onClick={() =>
                            router.push(`/signup?role=${role}`)
                          }
                        >
                          {item}
                        </li>
                      )
                    })}
                  </ul>

                </div>
              )}
            </div>
            {/* Shopping Cart */}
            <button className="relative">
              <FiShoppingCart className="sm:text-[30px] text-[22px] text-gray-700 hover:text-orange-600" />
              {/* <span className="absolute -top-2 md:-right-2 -right-1 z-50 bg-orange-500  text-black text-xs px-1.5 py-1.3 rounded-full">
                3
              </span> */}
            </button>

            {/* Search bar Div */}

            {/* Mobile Menu Toggle */}
            <button className="md:hidden px-1" onClick={() => setIsOpen(!isOpen)}>

              {isOpen ? (
                <FiX className="sm:text-[30px] text-[22px] text-gray-700" />
              ) : (
                <FiMenu className="sm:text-[30px] text-[22px] text-gray-700" />
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
      {searchBar ? (
        <>
          <motion.div
            initial={{ x: "100%", opacity: 0 }} // Start position (Right side)
            animate={{ x: 0, opacity: 1 }} // End position (Visible)
            exit={{ x: "-100%", opacity: 1, transition: { duration: 0.7, ease: "easeInOut" } }}
            transition={{ duration: 0.4, ease: "linear" }} // Smooth animation
            className="fixed top-0 left-0 py-1 right-0 z-50 bg-gray-200 shadow-lg">
            {/* Search Bar Section */}
            <div className="w-full flex sm:flex-row flex-col sm:items-center gap-2 justify-between  p-4  backdrop-blur-md rounded-b-2xl">
              {/* Logo */}
              <div className="sm:text-2xl px-4 text-[22px] sm:block hidden font-bold text-orange-600">ShopEase</div>

              {/* Search Input */}
              <div className="flex w-full justify-start sm:justify-center gap-2  sm:gap-6">
                <div className="flex items-center  sm:px-4 px-2 rounded-[15px] border-[#ccc] outline-2 focus:outline-2 focus:outline-orange-600 w-[100%] sm:w-[70%]  bg-white border-2">
                  <div className="size-7 flex justify-center items-center bg-gray-100  rounded-full transition">
                    <FiSearch className="text-xl text-gray-800" />
                  </div>
                  <input
                    className="flex-1 bg-transparent w-full pl-2 h-10 outline-none "
                    placeholder="Search..."
                  />
                </div>

                {/* Cancel Button */}
                <button
                  onClick={() => setSearchBar(false)}
                  className=" pr-4"
                >
                  <RxCross2 className=" text-[red] sm:text-[30px] text-[22px]" />
                </button>
              </div>
            </div>

            {/* Popular Search Section */}
            {/* <div className="w-[100%] flex justify-center flex-col items-center pt-6 px-6 pb-4 bg-white backdrop-blur-md rounded-b-2xl">
    <h2 className=" text-lg mb-3 text-start text-black font-semibold"> Popular Searches</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {["Air Force 1", "Jordan", "Air Max", "Blazer"].map((item, index) => (
        <button
          key={index}
          className="text-white text-lg font-semibold bg-orange-600 p-3 rounded-lg shadow-lg hover:bg-purple-600 transition duration-200"
        >
          {item}
        </button>
      ))}
    </div>
  </div> */}
          </motion.div>

        </>
      ) : null}
    </nav>
  );
}

