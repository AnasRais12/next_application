import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { supabase } from '@/lib/supabase'
function useSession() {
const [session, setSession] = useState(null);
useEffect(() => {
    // Listen for session changes (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      console.log("Utils Session",session);
      

      // Store the updated session in cookies when state changes
      if (session) {
        Cookies.set('session', JSON.stringify(session), { expires: 1 });  // Set session cookie
      } else {
        // Remove the session cookie if logged out
        Cookies.remove('session');
      }
    });

  }, []);

  return session;
  return (
    <div>GetSession</div>
  )
}

export default useSession