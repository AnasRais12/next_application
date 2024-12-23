'use client';
import React, { useContext, createContext, useState, useEffect } from 'react';
const userContext = createContext();
export const UseAuth = () => useContext(userContext);
function UserProvider({ children }) {
  const [UserToken, setUserToken] = useState(null);
  const [User, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('User-Token');
    const user = localStorage.getItem('User');

    setTimeout(() => {
      setUserToken(token);
      setUser(user ? JSON.parse(user) : null);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <userContext.Provider value={{ UserToken, User, setUser, setUserToken }}>
        {children}
      </userContext.Provider>
    </>
  );
}

export default UserProvider;
