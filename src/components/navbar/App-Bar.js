// ✅ Convert Tailwind-based Navbar to Material UI
'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
} from '@mui/material';
import {
  FiSearch,
} from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Wishlist from './navbarActions/WishList';
import { useRouter } from 'next/navigation';
import { getCart, getWishList } from '@/utils/reduxGlobalStates/ReduxStates';
import { GlobalDetails } from '@/context/globalprovider/globalProvider';
import UserQuery from '@/DbQuery/UserDetailQuery';
import DesktopNavbar from './DesktopNavbar';
import BottomNavBar from './BottomNavbar';
import { fetchExchangeRates } from '@/helper/CurrenyConver';
import AccountSettings from './navbarActions/ProfileBottomNavbar';

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
  const [anchorEl, setAnchorEl] = useState(false);
  const DropdownMenu = user ? ['home', 'settings'] : ['login'];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          'https://restcountries.com/v3.1/currency/usd?fields=name,currencies,flags,cca3'
        );
        const data = await res.json();
        const filterData = data.find(country => country?.name?.common === 'United States');
        setCountries(filterData);

        let selectedCurrency = 'USD';
        let currencySymbol = '$';

        if (userDetails?.currency_code) {
          const userCurrency = userDetails.currency_code;
          const countryWithCurrency = data.find(
            (country) => country.currencies?.[userCurrency]
          );

          if (countryWithCurrency) {
            selectedCurrency = userCurrency;
            currencySymbol =
              countryWithCurrency.currencies[userCurrency]?.symbol || '$';
          }
        }

        setFrom(selectedCurrency);
        setSymbol(currencySymbol);

        const rates = await fetchExchangeRates(selectedCurrency);
        if (rates) setRates(rates);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userDetails, setFrom, setRates, setSymbol]);

  const handleProfileClick = (event) => {
    setAnchorEl(true);
  };
  const handleClose = () => {
    setAnchorEl(false);
  };
  console.log(wishlistModal, 'wishlistModal');

  return (
     <>
        <DesktopNavbar
        user={user}
        cartItem={cartItem

        }
        DropdownMenu={DropdownMenu}
        isOpen={anchorEl}
        setWishlistModal={setWishlistModal}
        wishListState={wishListState}
        handleClose={handleClose}
        handleProfileClick={handleProfileClick}
        countries={countries}
      />

      <BottomNavBar
        setSearchBar={setSearchBar}
        setWishlistModal={setWishlistModal}
        isOpen={isOpen}

        handleProfileClick={handleProfileClick}
      />
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
                  <Box component="a" sx={{ display: "flex", alignItems: "center" }}>
            <div className="lg:text-3xl text-2xl mb-2 text-black font-bold">ShopEase</div>
          </Box>

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
                <button className="px-3 py-1 bg-gray-100 text-sm rounded-full">
                  Electronics
                </button>
                <button className="px-3 py-1 bg-gray-100 text-sm rounded-full">
                  Clothing
                </button>
                <button className="px-3 py-1 bg-gray-100 text-sm rounded-full">
                  Home
                </button>
                <button className="px-3 py-1 bg-gray-100 text-sm rounded-full">
                  Books
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
       {wishlistModal && <Wishlist  open={wishlistModal} setWishlistModal={setWishlistModal} />}
          {/* <AccountSettings />       */}
     </>
  );
}
