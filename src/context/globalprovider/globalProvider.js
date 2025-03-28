'use client';
import React, { useContext, createContext, useState, useEffect } from 'react';
const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [settingModal, setSettingModal] = useState(false);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
      const [rates, setRates] = useState({});  // Exchange rates store karne ke liye
      const [from, setFrom] = useState("USD"); // Default currency USD
      const [symbol, setSymbol] = useState(); // Default currency USD
  const [distance, setDistance] = useState(0);
  const [authField, setAuthfield] = useState({ username: '', email: '' });  // jab user login ke bad verified page pe jaata hai to usko dikhane ke liyay 
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const UserInfo = localStorage.getItem('sb-user');
      if (UserInfo) {
        setUser(JSON.parse(UserInfo));
      }
    }
  }, []);
  return (
    <>
      <GlobalContext.Provider
        value={{
          user,
          setUser,
          setAuthfield,
          authField,
          setSettingModal,
          settingModal,
          setDeliveryCharges,
          deliveryCharges,
          setDistance,
          distance,
          rates,
          setFrom,
          from,
          setSymbol,
          symbol,
          setRates
        }}
      >
        {children},
      </GlobalContext.Provider>
    </>
  );
};

export const GlobalDetails = () => {
  return useContext(GlobalContext);
};
