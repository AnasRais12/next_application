'use client';
import { useEffect, useState } from 'react';
import { FiShoppingCart, FiUser, FiSearch, FiHeart, FiChevronDown, FiCheck } from 'react-icons/fi';
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
    <nav className="bg-[red] border bg border-gray-100 w-full fixed top-0 left-0 z-[9999]">
     
      
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              className="h-10 w-auto transition-transform duration-200 hover:scale-105"
              src="/images/logo.jpg"
              alt="Logo"
            />
            <span className="ml-2 text-xl font-bold text-primary hidden sm:block">ShopEase</span>
          </Link>

          {/* Desktop Search Bar - Center Positioned */}
          <div className="hidden lg:flex mx-8 flex-1 max-w-2xl">
            <div className="relative w-full">
              <input
                type="text"
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pl-10"
                placeholder="Search for products..."
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <button className="absolute right-0 top-0 h-full px-4 bg-primary text-white rounded-r-full hover:bg-blue-700 transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Right Navigation Icons */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Mobile Search Button */}
            <button 
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setSearchBar(true)}
            >
              <FiSearch className="text-xl text-gray-600" />
            </button>

            {/* Currency Selector */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {countries.length > 0 && countries?.find(c => c.currencies && Object.keys(c.currencies)[0] === from)?.flags?.png ? (
                  <img
                    src={countries.find(c => c.currencies && Object.keys(c.currencies)[0] === from).flags.png}
                    className="w-5 h-4 object-cover rounded-sm"
                    alt="Country flag"
                  />
                ) : null}
                <span className="text-sm font-medium">{from}</span>
                <FiChevronDown className={`text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-80 overflow-y-auto">
                  <div className="py-1">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <p className="text-xs font-semibold text-gray-500">SELECT CURRENCY</p>
                    </div>
                    {countries.map((country) => {
                      const code = Object.keys(country.currencies || {})[0] || "USD";
                      const currencySymbol = country.currencies?.[code]?.symbol || "$";
                      return (
                        <button
                          key={country.cca3}
                          className={`flex items-center w-full px-3 py-2 hover:bg-blue-50 ${from === code ? 'bg-blue-50' : ''}`}
                          onClick={() => {
                            setFrom(code);
                            setSymbol(currencySymbol);
                            setIsOpen(false);
                          }}
                        >
                          <img 
                            src={country.flags.png} 
                            className="w-5 h-4 mr-3 object-cover rounded-sm" 
                            alt={country.name.common}
                          />
                          <div className="text-left">
                            <p className="text-sm font-medium text-gray-800">{country.name.common}</p>
                            <p className="text-xs text-gray-500">{code} • {currencySymbol}</p>
                          </div>
                          {from === code && <FiCheck className="ml-auto text-primary" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowModal(!showModal)}
                className={`p-2 rounded-full transition ${
                  user ? 'bg-primary text-white hover:bg-blue-700' : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
              >
                {user ? (
                  <span className="text-sm font-semibold">{user.email[0].toUpperCase()}</span>
                ) : (
                  <FiUser className="text-xl" />
                )}
              </button>

              {showModal && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-md border border-gray-100 z-50 overflow-hidden"
                >
                  <ul className="py-1">
                    {DropdownMenu.map((item, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 hover:text-primary transition-colors"
                        onClick={async () => {
                          await router.push(`/${item}`);
                          setShowModal(false);
                        }}
                      >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Wishlist */}
            <button 
              onClick={() => setWishlistModal(true)} 
              className="p-2 relative rounded-full hover:bg-gray-50 transition-colors"
            >
              <FiHeart className="text-xl text-gray-600 hover:text-primary" />
              {wishListState?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs size-5 flex items-center justify-center rounded-full">
                  {wishListState.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <Link 
              href="/shoppingcart" 
              className="p-2 relative rounded-full hover:bg-gray-50 transition-colors"
            >
              <FiShoppingCart className="text-xl text-gray-600 hover:text-primary" />
              {cartItem?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs size-5 flex items-center justify-center rounded-full">
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
            className="fixed inset-0 bg-black bg-opacity-50 z-[10000]"
          >
            <motion.div 
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="bg-white p-4 shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pl-10"
                    placeholder="Search for products..."
                    autoFocus
                  />
                  <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
                </div>
                <button 
                  onClick={() => setSearchBar(false)}
                  className="ml-4 p-2 rounded-full hover:bg-gray-100"
                >
                  <RxCross2 className="text-xl text-gray-600" />
                </button>
              </div>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                <button className="px-3 py-1 bg-gray-100 text-sm rounded-full">Electronics</button>
                <button className="px-3 py-1 bg-gray-100 text-sm rounded-full">Clothing</button>
                <button className="px-3 py-1 bg-gray-100 text-sm rounded-full">Home</button>
                <button className="px-3 py-1 bg-gray-100 text-sm rounded-full">Books</button>
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