'use client'
import { useState } from "react";
import { FiShoppingCart, FiUser, FiSearch, FiHeart } from "react-icons/fi";
import Wishlist from "../FlowbiteComponent/WishList";
import { useRouter } from "next/navigation";
import { getCart,getWishList } from "@/utils/reduxGlobalStates/ReduxStates";
import { RxCross2 } from "react-icons/rx"
import { motion } from "framer-motion";
import { GlobalDetails } from "@/context/globalprovider/globalProvider";
import { addtoWishList } from "@/app/store/features/wishList/WishList";

export default function Navbar() {
  const router = useRouter();
  const { user } = GlobalDetails();
  const cartState = getCart()
const wishListState = getWishList()
  const [searchBar, setSearchBar] = useState(false);
  const [wishlistModal, setWishlistModal] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const DropdownMenu = user ? ["Dashboard", "Settings", "Orders"] : ["Login"];
  return (
    <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
      <div className="  px-6 md:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div className="text-[20px] md:text-[25px] font-bold text-orange-600">
            ShopEase
          </div>

          {/* Search Bar */}
          <div className="sm:flex hidden border-[#ccc] items-center border rounded-md mx-3 overflow-hidden w-[70%]  shadow-sm">
            <select className="px-1 sm:px-2 py-2  w-[25%] sm:w-[20%] text-sm border-r outline-none ">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Books</option>
              <option>Arts & Crafts</option>
            </select>
            <input
              type="text"
              className=" flex-1 px-3 py-2 outline-none text-gray-700"
              placeholder="Search Amazon..."
            />
            <button className="bg-orange-600 sm:px-4 px-1 py-3">
              <FiSearch size={18} className="text-white" />
            </button>
          </div>

          {/* User Profile & Cart Section */}
          <div className="flex items-center space-x-2 sm:space-x-3">

            <button className="sm:hidden block" onClick={() => setSearchBar(true)}>
              <FiSearch className="sm:text-[30px] text-[22px] text-gray-700 hover:text-orange-600" />
            </button>
            {/* User Profile */}
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
                  <FiUser className="sm:text-[30px] text-[25px]" />
                )}
              </button>

              {/* Dropdown Menu (Responsive Fix) */}
              {showModal && (
                <div className="absolute md:-right-4 -right-7 mt-2  bg-white border rounded-md shadow-lg z-50">
                  <ul className="py-1">

                    {DropdownMenu.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className={`px-4 text-[13px] md:text-[16px] whitespace-nowrap py-2 hover:bg-gray-100 cursor-pointer ${item === "Become A buyer" ? "bg-[green] text-white hover:bg-[#4dd14d]" : "text-black"
                            }`}
                          onClick={() =>
                            // router.push(`/signup?role=${role}`)
                            router.push(`/login`)

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
            {/* Wishlist */}
            <button onClick={() => setWishlistModal(true)} className="relative">
              <FiHeart className="sm:text-[27px] text-[25px] text-gray-700 hover:text-orange-600" />
              {wishListState?.length > 0 ? <span className="absolute top-[-9px]   md:top-[-10px] md:right-[-7px] right-[-3px] text-white md:size-6 size-5 text-sm sm:mt-0 text-center rounded-full bg-orange-400">{wishListState?.length}</span> : null}
            </button>
            {/* Shopping Cart */}
            <button onClick={() => router.push('/shoppingcart')} className="relative">
              <FiShoppingCart className="sm:text-[30px] text-[25px] text-gray-700 hover:text-orange-600" />
              {cartState?.length > 0 ? <span className="absolute top-[-10px]   md:top-[-10px]  right-[-10px] text-white md:size-6 size-5 text-sm sm:mt-0 text-center rounded-full bg-orange-400">{cartState?.length}</span> : null}
            </button>

          </div>
        </div>
        {searchBar ? (
          <>
            <motion.div
              initial={{ x: "100%", opacity: 0 }} // Start position (Right side)
              animate={{ x: 0, opacity: 1 }} // End position (Visible)
              exit={{ x: "-100%", opacity: 1, transition: { duration: 0.7, ease: "easeInOut" } }}
              transition={{ duration: 1, ease: "anticipate" }} // Smooth animation
              className="fixed top-0 sm:hidden   inset-x-0 w-full flex justify-center  z-50 bg-opacity-50 bg-black  shadow-lg">
              {/* Search Bar Section */}
              {/* Search Input */}
              <div className="w-full  bg-white py-2">
                <div className="text-[22px] w-[100%] hover:text-red-900 px-4  flex mb-4 justify-between md:text-[25px] ">
                  <div className="text-[20px] md:text-[25px] font-bold text-orange-600">
                    ShopEase
                  </div>
                  <button className="" onClick={() => setSearchBar(false)}><RxCross2 /></button>

                </div>
                <div className="sm:hidden flex  items-center border rounded-md mx-2 overflow-hidden   w-[95%]  shadow-sm">
                  <select className="px-1 sm:px-2 py-2  w-[6rem]  text-sm border-r outline-none ">
                    <option>All Categories</option>
                    <option>Electronics</option>
                    <option>Books</option>
                    <option>Arts & Crafts</option>
                  </select>
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 w-[40%] outline-none text-gray-700"
                    placeholder="Search"
                  />
                  <button className="bg-orange-600 sm:px-4 px-1 py-3">
                    <FiSearch size={18} className="text-white" />
                  </button>
                </div>
              </div>
            </motion.div>

          </>
        ) : null}
        {wishlistModal && (
          <Wishlist setWishlistModal={setWishlistModal
          } />
          // <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setWishlistModal(false)}>
          //   <motion.div 
          //     initial={{ x: "100%" }} 
          //     animate={{ x: 0 }} 
          //     exit={{ x: "100%" }}
          //     transition={{ type: "spring", stiffness: 100, damping: 20 }}
          //     className="fixed top-0 right-0 sm:w-80 w-full h-full bg-white shadow-lg sm:p-6"
          //     onClick={(e) => e.stopPropagation()} // Stop click from closing modal when clicking inside
          //   >
          //     <div className="flex justify-between items-center mb-4">
          //       <h2 className="text-lg font-bold">Your Wishlist</h2>
          //       <button onClick={() => setWishlistModal(false)}>
          //         <RxCross2 size={24} className="text-gray-700 hover:text-red-600" />
          //       </button>
          //     </div>
          //     <p>Wishlist items yahan dikhayenge...</p>
          //   </motion.div>
          // </div>
        )}

      </div>
    </nav>
  );
}
