import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Cookies from 'js-cookie';
import { GlobalDetails } from '@/context/globalprovider/globalProvider';

const useSession = () => {
  const [session, setSession] = useState(null);
  const { setUser } = GlobalDetails();

  useEffect(() => {
    // Listen for session changes (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);

        if (session?.user) {
          const user = session.user;
          Cookies.set('sb-access-token', session.access_token, {
            expires: 7,
            secure: true,
          });
          Cookies.set('sb-refresh-token', session.refresh_token, {
            expires: 7,
            secure: true,
          });
          Cookies.set('sb-user-role', 'buyer', {
            expires: 7,
            secure: true,
            path: '/',
          });

          setUser(user);
          localStorage.setItem('sb-user', JSON.stringify(user));

          // 🔹 Check if profile exists and role is empty
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session?.user.id)
            .maybeSingle();

          if (profileError) {
            console.error('Profile Fetch Error:', profileError.message);
          }

          // 🔹 If profile exists but role is empty, update it
          // if (profile && !profile.role) {
          //   const { error: updateError } = await supabase
          //     .from("profiles")
          //     .update({ role: "buyer" })
          //     .eq("id", user.id);

          //   if (updateError) {
          //     console.error("Profile Update Error:", updateError.message);
          //   } else {
          //   }
          // }

          // 🔹 If profile doesn't exist, create it
          if (!profile) {
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([
                {
                  id: session?.user.id,
                  email: user?.email,
                  role: 'buyer',
                  name: user?.user_metadata?.full_name,
                },
              ]);

            if (insertError) {
              console.error('Profile Insert Error:', insertError.message);
            } else {
              console.log("New Profile Created with Role = 'buyer'");
              Cookies.set('sb-user-role', 'buyer', {
                expires: 7,
                secure: true,
                path: '/',
              });
            }
          }
        } else {
          Cookies.remove('sb-access-token');
          Cookies.remove('sb-refresh-token');
          localStorage.removeItem('sb-user');
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return session;
};

export default useSession;
