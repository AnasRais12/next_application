'use client';
import React, { useContext, createContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [settingModal, setSettingModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deliveryCharges, setDeliveryCharges] = useState(0);

  const [authField, setAuthfield] = useState({ username: '', email: '' });
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
