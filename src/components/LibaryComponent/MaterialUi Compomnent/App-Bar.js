'use client';
import { useEffect, useState } from 'react';
import { FiShoppingCart, FiUser, FiSearch, FiHeart, FiChevronDown, FiCheck, FiX, FiChevronRight } from 'react-icons/fi';
import Wishlist from '../FlowbiteComponent/WishList';
import { useRouter } from 'next/navigation';
import { getCart, getWishList } from '@/utils/reduxGlobalStates/ReduxStates';
import { RxCross2 } from 'react-icons/rx';
import { motion } from 'framer-motion';
import { GlobalDetails } from '@/context/globalprovider/globalProvider';
import UserQuery from '@/DbQuery/UserDetailQuery';
import { addtoWishList } from '@/app/store/features/wishList/WishList';
import { fetchExchangeRates } from '@/helper/CurrenyConver';
import Link from 'next/link';

export default function Navbar() {
  const router = useRouter();
  const { user, setRates, setFrom, from, symbol, setSymbol } = GlobalDetails();
  const { userDetails } = UserQuery();
  const cartItem = getCart();
  const wishListState = getWishList();
  const [searchBar, setSearchBar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [wishlistModal, setWishlistModal] = useState(false);
  const [countries, setCountries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const DropdownMenu = user ? ['home', 'settings'] : ['login'];

  // Fetch countries and set initial currency
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        setCountries(data);

        // Set user's currency if available
        if (userDetails?.currency_code) {
          const userCurrency = userDetails.currency_code;
          const countryWithCurrency = data.find(country => 
            country.currencies?.[userCurrency]
          );
          
          if (countryWithCurrency) {
            setFrom(userCurrency);
            const currencySymbol = countryWithCurrency.currencies[userCurrency]?.symbol || "$";
            setSymbol(currencySymbol);
          }
        }

        // Fetch exchange rates
        const rates = await fetchExchangeRates(from);
        if (rates) setRates(rates);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [from, setFrom, setRates, setSymbol, userDetails]);

  return (
    <nav className="bg-white shadow w-full fixed top-0 left-0 z-[9999]">
      <div className="px-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between py-3 gap-4 sm:gap-0">
          {/* Logo */}
          <div className="flex items-center">
            <img
              className="h-10 sm:h-12 w-auto transition-transform duration-200 hover:scale-105"
              src="/images/logo.jpg"
              alt="Logo"
            />
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 items-center mx-6 border border-gray-300 rounded-md shadow-sm bg-white">
            <select className="bg-light px-3 py-2 w-1/5 text-sm text-dark border-r outline-none">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Books</option>
              <option>Crafts</option>
            </select>
            <input
              type="text"
              className="flex-1 px-4 py-2 text-dark outline-none"
              placeholder="Search products..."
            />
            <button className="bg-primary px-4 py-2 hover:bg-blue-700">
              <FiSearch className="text-white" />
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Mobile Search */}
            <button className="block lg:hidden" onClick={() => setSearchBar(true)}>
              <FiSearch className="text-2xl text-dark hover:text-primary" />
            </button>

            {/* Enhanced Currency Dropdown */}
            <div className="relative sm:flex hidden group">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center px-2 py-1.5 border border-gray-200 rounded-md hover:border-primary cursor-pointer transition-colors"
              >
                <img
                  src={countries.find(c => c.currencies && Object.keys(c.currencies)[0] === from)?.flags.png}
                  className="w-5 h-4 mr-2 object-cover"
                  alt="Country flag"
                />
                <span className="text-sm font-medium">{from}</span>
                <FiChevronDown className={`ml-1 text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </div>
              
              {isOpen && (
                <div className="absolute right-[-20px]  top-full mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50 max-h-80 overflow-y-auto">
                  <div className="py-1">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <p className="text-xs font-semibold text-gray-500">SELECT CURRENCY</p>
                    </div>
                    {countries.map((country) => {
                      const code = Object.keys(country.currencies || {})[0] || "USD";
                      const currencySymbol = country.currencies?.[code]?.symbol || "$";
                      return (
                        <div
                          key={country.cca3}
                          className={`flex items-center px-3 py-2 hover:bg-blue-50 cursor-pointer ${from === code ? 'bg-blue-50' : ''}`}
                          onClick={() => {
                            setFrom(code);
                            setSymbol(currencySymbol);
                            setIsOpen(false);
                          }}
                        >
                          <img 
                            src={country.flags.png} 
                            className="w-5 h-4 mr-3 object-cover" 
                            alt={country.name.common}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">{country.name.common}</p>
                            <p className="text-xs text-gray-500">{code} • {currencySymbol}</p>
                          </div>
                          {from === code && <FiCheck className="text-primary ml-2" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
  <button
    onClick={() => setShowModal(!showModal)}
    className={`rounded-full size-8 flex items-center justify-center transition ${
      user ? 'bg-primary text-white hover:bg-blue-700' : 'text-dark hover:text-primary'
    }`}
  >
    {user ? (
      <span className="text-base font-semibold">{user.email[0].toUpperCase()}</span>
    ) : (
      <FiUser className="text-xl" />
    )}
  </button>

  {/* Slider Overlay */}
  {showModal && (
    <>
      {/* Background overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setShowModal(false)}
      ></div>
      
      {/* Slider panel */}
      <div className="fixed top-0 sm:right-2 right-0 sm:h-fit h-full  w-full sm:w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
  {/* Header with close button */}
  <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
    <h3 className="font-semibold text-lg">Menu</h3>
    <button 
      onClick={() => setShowModal(false)}
      className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
    >
      <FiX className="text-xl" />
    </button>
  </div>

  {/* Main Menu Items */}
  <ul className="py-2">
    {DropdownMenu.map((item, index) => (
      <li
        key={index}
        className="px-4 py-3 hover:bg-gray-50 capitalize cursor-pointer transition-colors flex items-center"
        onClick={async () => {
          await router.push(`/${item}`);
          setShowModal(false);
        }}
      >
        <span className="flex-1">{item}</span>
         {/* <FiChevronRight className="text-gray-400" /> */}
      </li>
    ))}
  </ul>

  {/* Currency Selector Section */}
  <div className="border-t sm:hidden block border-gray-100 px-4 py-3">
    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
      Currency Selection
    </h4>
    
    <div className="relative ">
      {/* Selected Currency Display */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
      >
        <div className="flex items-center">
          <img
            src={countries.find(c => c.currencies && Object.keys(c.currencies)[0] === from)?.flags.png}
            className="w-6 h-4 mr-3 object-cover rounded-sm"
            alt="Country flag"
          />
          <div>
            <p className="text-sm font-medium">{from}</p>
            <p className="text-xs text-gray-500">
              {countries.find(c => c.currencies && Object.keys(c.currencies)[0] === from)?.name.common}
            </p>
          </div>
        </div>
        <FiChevronDown className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {/* Currency Dropdown */}
      {isOpen && (
        <div className="absolute top-full h-[200px] overflow-auto mb-2 left-0 right-0 bg-white rounded-lg shadow-lg border border-gray-200 z-20 max-h-80 overflow-y-auto">
          <div className="py-1">
            <div className="px-4 py-2 bg-gray-50 sticky top-0">
              <p className="text-xs font-semibold text-gray-600">SELECT CURRENCY</p>
            </div>
            {countries.map((country) => {
              const code = Object.keys(country.currencies || {})[0] || "USD";
              const currency = country.currencies?.[code];
              return (
                <div
                  key={country.cca3}
                  className={`flex items-center px-4 py-3 hover:bg-blue-50 cursor-pointer ${from === code ? 'bg-blue-50' : ''}`}
                  onClick={() => {
                    setFrom(code);
                    setSymbol(currency?.symbol || "$");
                    setIsOpen(false);
                  }}
                >
                  <img 
                    src={country.flags.png} 
                    className="w-6 h-4 mr-3 object-cover rounded-sm" 
                    alt={country.name.common}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{country.name.common}</p>
                    <p className="text-xs text-gray-500">
                      {code} • {currency?.name || "US Dollar"}
                    </p>
                  </div>
                  {from === code && <FiCheck className="text-primary ml-2 shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  </div>
</div>
    </>
  )}
</div>

            {/* Wishlist */}
            <button 
              onClick={() => setWishlistModal(true)} 
              className="relative p-1 hover:text-primary transition-colors"
            >
              <FiHeart className="text-[25px] text-dark hover:text-primary" />
              {wishListState?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs size-5 flex items-center justify-center rounded-full">
                  {wishListState.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <Link href="/shoppingcart" className="relative p-1 hover:text-primary transition-colors">
              <FiShoppingCart className="text-[25px] text-dark hover:text-primary" />
              {cartItem?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs size-5 flex items-center justify-center rounded-full">
                  {cartItem.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar Overlay */}
        {searchBar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-[10000]"
          >
            <motion.div 
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              className="bg-white p-4 w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-primary">ShopEase</span>
                <button onClick={() => setSearchBar(false)}>
                  <RxCross2 className="text-dark text-2xl" />
                </button>
              </div>
              <div className="flex items-center border rounded-md shadow-sm">
                <select className="bg-light px-3 py-2 w-[35%] text-sm border-r outline-none">
                  <option>All</option>
                  <option>Electronics</option>
                  <option>Books</option>
                </select>
                <input
                  type="text"
                  className="flex-1 px-4 py-2 text-dark outline-none"
                  placeholder="Search..."
                />
                <button className="bg-primary px-4 py-2 hover:bg-blue-700">
                  <FiSearch size={18} className="text-white" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Wishlist Modal */}
        {wishlistModal && <Wishlist setWishlistModal={setWishlistModal} />}
      </div>
    </nav>
  );
}