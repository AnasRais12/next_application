'use client';
import React, { useContext, createContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
const GlobalContext = createContext();
export const GlobalDetail = ({ children }) =>  {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        console.log(data);
        setUser(data.user);
      }
    };
    fetchUser();
  }, []);


  return (
    <>
      <GlobalContext.Provider value={{user,setUser }}>
        {children}
      </GlobalContext.Provider>
    </>
  );
}


export const UserDetail = () => {
  return useContext(GlobalContext);
};
