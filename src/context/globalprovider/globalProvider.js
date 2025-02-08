'use client';
import React, { useContext, createContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
const GlobalContext = createContext();
export const GlobalProvider = ({ children }) =>  {
  const UserInfo = localStorage.getItem('sb-user');
  const [user, setUser] = useState(UserInfo ? JSON.parse(UserInfo) : null);
  const [authField, setAuthfield] = useState({username:'',email:''});
  useEffect(() => {
   if(UserInfo){
    setUser(JSON.parse(UserInfo));
   }
  }, []);
  return (
    <>
      <GlobalContext.Provider value={{user,setUser,setAuthfield,authField }}>
        {children}
      </GlobalContext.Provider>
    </>
  );
}


export const GlobalDetails = () => {
  return useContext(GlobalContext);
};
