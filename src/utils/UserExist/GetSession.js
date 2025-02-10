import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { GlobalDetails } from '@/context/globalprovider/globalProvider';
import { supabase } from '@/lib/supabase'
function useSession() {
const [session, setSession] = useState(null);
  const { setUser } = GlobalDetails()

useEffect(() => {
    // Listen for session changes (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      console.log("Utils Session",session);
         if (session) {
                  Cookies.set('sb-access-token', session.access_token, { expires: 7, secure: true });
                  Cookies.set('sb-refresh-token', session.refresh_token, { expires: 7, secure: true });
                  setUser(session?.user)
                  localStorage.setItem('sb-user', JSON.stringify(session.user));
                }
                else {
                  // Remove the session cookie if logged out
                  Cookies.remove('session');
                }

      
    });

  }, []);

  return session;
 
}

export default useSession