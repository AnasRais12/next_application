'use client';
import { useEffect, useState } from 'react';
import { FiShoppingCart, FiUser, FiSearch, FiHeart } from 'react-icons/fi';
import Wishlist from '../FlowbiteComponent/WishList';
import { useRouter } from 'next/navigation';
import { getCart, getWishList } from '@/utils/reduxGlobalStates/ReduxStates';
import { RxCross2 } from 'react-icons/rx';
import { motion } from 'framer-motion';
import { GlobalDetails } from '@/context/globalprovider/globalProvider';
import { addtoWishList } from '@/app/store/features/wishList/WishList';
import { fetchExchangeRates } from '@/helper/CurrenyConver';

export default function Navbar() {
  const router = useRouter();
  const { user,setRates,setFrom,from,symbol,setSymbol} = GlobalDetails();
  const cartItem = getCart();
  const wishListState = getWishList();
  const [searchBar, setSearchBar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [wishlistModal, setWishlistModal] = useState(false);
    const [countries, setCountries] = useState([]);
  
    // Fetch exchange rates when the 'from' currency changes
    useEffect(() => {
      fetchExchangeRates(from).then((data) => {
        if (data) setRates(data);
      });
  
      // Fetch countries for flag selection
      fetch("https://restcountries.com/v3.1/all")
        .then((res) => res.json())
        .then((data) => {
          setCountries(data)
        });

    }, [from]);
  

    

  const [showModal, setShowModal] = useState(false);
  const DropdownMenu = user ? ['Dashboard', 'Settings', 'Orders','Currency '] : ['Login'];

  console.log("From Is Here!",from)
  console.log('cartState', cartItem);
  console.log('wishListState', wishListState);

  return (
    <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-[9999]">
      <div className=" px-4 sm:px-6 md:px-6 lg:px-8">
        <div className="flex items-center sm:justify-start justify-between py-3">
          {/* Logo */}
           <div className="flex-shrink-0">
            <img
              className="h-8 w-auto transform hover:scale-105 transition-transform duration-200"
              src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=150&h=40"
              alt="Company Logo"
            />
          </div>

          {/* Search Bar */}
          <div className="sm:flex hidden border-[#ccc] items-center border rounded-md mx-3 overflow-hidden w-[80%]  shadow-sm">
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
          <div className="flex items-center space-x-2 sm:space-x-2">
            <button
              className="sm:hidden block"
              onClick={() => setSearchBar(true)}
            >
              <FiSearch className="sm:text-[30px] text-[27px] text-gray-700 hover:text-orange-600" />
            </button>

            <div className=" ">
        <div 
          className="mt-1 flex items-center justify-between  py-1 bg-white  rounded-md shadow-sm cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img src={countries.find(c => c.currencies && Object.keys(c.currencies)[0] === from)?.flags.png} 
               alt={from} 
               className="w-6 h-4 mr-2"/>
          <span className="ml-auto">▼</span>
        </div>

        {/* Dropdown List */}
        {isOpen && (
    <div className="absolute right-28 z-10 w-[30%] top-full bg-white rounded-md shadow-lg max-h-40 overflow-y-auto">
      {countries.map((country) => {
        const currencyCode = country.currencies
          ? Object.keys(country.currencies)[0]
          : "USD";
        return (
          <div
            key={country.cca3}
            className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setFrom(currencyCode); 
              const currencySymbol = country.currencies?.[currencyCode]?.symbol || "$"; // Agar symbol na mile toh default '$' use karein
              setSymbol(currencySymbol)
              setIsOpen(false);
            }}
          >
            <img
              src={country.flags.png}
              alt={country.name.common}
              className="w-6 h-4 mr-2"
            />
            <span>{country.name.common} ({currencyCode})</span>
          </div>
        );
      })}
    </div>
  )}
      </div>
            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowModal(!showModal)}
                className={`flex items-center justify-center  ${
                  user
                    ? ' bg-orange-500 text-white  size-7 md:size-8 rounded-full  hover:text-black'
                    : ' text-black'
                }`}
              >
                {user ? (
                  <span className="text-lg text-center font-normal">
                    {user?.email.slice(0, 1).toUpperCase()}
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
                          className={`px-4 text-[13px] md:text-[16px] whitespace-nowrap py-2 hover:bg-gray-100 cursor-pointer ${
                            item === 'Become A buyer'
                              ? 'bg-[green] text-white hover:bg-[#4dd14d]'
                              : 'text-black'
                          }`}
                          onClick={() =>
                            // router.push(`/signup?role=${role}`)
                            router.push(`/login`)
                          }
                        >
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
      
            {/* Wishlist */}
            <button onClick={() => setWishlistModal(true)} className="relative">
              <FiHeart className="sm:text-[27px] text-[25px] text-gray-700 hover:text-orange-600" />
              {wishListState?.length > 0 ? (
                <span className="absolute top-[-9px]   md:top-[-10px] md:right-[-7px] right-[-3px] text-white md:size-6 size-5 text-sm sm:mt-0 text-center rounded-full bg-orange-400">
                  {wishListState?.length}
                </span>
              ) : null}
            </button>
            {/* Shopping Cart */}
            <button
              onClick={() => router.push('/shoppingcart')}
              className="relative"
            >
              <FiShoppingCart className="sm:text-[30px] text-[25px] text-gray-700 hover:text-orange-600" />
              {cartItem?.length > 0 ? (
                <span className="absolute top-[-10px]   md:top-[-10px]  right-[-10px] text-white md:size-6 size-5 text-sm sm:mt-0 text-center rounded-full bg-orange-400">
                  {cartItem?.length}
                </span>
              ) : null}
            </button>

  
          </div>
        </div>
        {searchBar ? (
          <>
            <motion.div
              initial={{ x: '100%', opacity: 0 }} // Start position (Right side)
              animate={{ x: 0, opacity: 1 }} // End position (Visible)
              exit={{
                x: '-100%',
                opacity: 1,
                transition: { duration: 0.7, ease: 'easeInOut' },
              }}
              transition={{ duration: 1, ease: 'anticipate' }} // Smooth animation
              className="fixed top-0 sm:hidden   inset-x-0 w-full flex justify-center  z-50 bg-opacity-50 bg-black  shadow-lg"
            >
              {/* Search Bar Section */}
              {/* Search Input */}
              <div className="w-full  bg-white py-2">
                <div className="text-[22px] w-[100%] hover:text-red-900 px-4  flex mb-4 justify-between md:text-[25px] ">
                  <div className="text-[20px] md:text-[25px] font-bold text-orange-600">
                    ShopEase
                  </div>
                  <button className="" onClick={() => setSearchBar(false)}>
                    <RxCross2 />
                  </button>
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
          <Wishlist setWishlistModal={setWishlistModal} />
       
        )}
      </div>
    </nav>
  );
}
