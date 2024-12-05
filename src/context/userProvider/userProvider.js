'use client';
import React, { useContext,  createContext, useState, useEffect, } from 'react'
const userContext = createContext()
export const UseAuth = () => useContext(userContext)
function UserProvider({ children }) {
 
  const [UserToken, setUserToken] = useState(null);
  const [User, setUser] = useState(null);
useEffect(() => {
  if(typeof window !== 'undefined'){
    const token = localStorage.getItem('User-Token');
     const user = localStorage.getItem('User');
     setUserToken(token);
     setUser(user)
  }
}, [])
const LogoutUser = () => {
  localStorage.removeItem('User-Token');
  setUserToken(null); 
  setUser(null); 
};


  


 
  return (
    <>
      <userContext.Provider value={{ UserToken,LogoutUser,User}}>
        {children}
      </userContext.Provider>
    </>

  )
}

export default UserProvider
