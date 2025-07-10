// ✅ Convert Tailwind-based Navbar to Material UI
'use client';
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  InputBase,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Button,
  Paper,
  Drawer,
  Divider,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  FiShoppingCart,
  FiUser,
  FiSearch,
  FiHeart,
  FiHome,
} from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Wishlist from '../FlowbiteComponent/WishList';
import { useRouter } from 'next/navigation';
import { getCart, getWishList } from '@/utils/reduxGlobalStates/ReduxStates';
import { GlobalDetails } from '@/context/globalprovider/globalProvider';
import UserQuery from '@/DbQuery/UserDetailQuery';
import DesktopNavbar from './DesktopNavbar';
import BottomNavBar from './BottomNavbar';
import { fetchExchangeRates } from '@/helper/CurrenyConver';

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
       {wishlistModal && <Wishlist setWishlistModal={setWishlistModal} />}
      
     </>
  );
}
