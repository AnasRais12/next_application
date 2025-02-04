import { supabase } from "./supabase";
export const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        
    });
    if (error) {
        console.error('Google Sign-In Error:', error.message);
    } else {
        console.log('Signed in with Google:', data);
    }
};

export const signInWithFacebook = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
  });

  if (error) {
      console.error('Facebook Sign-In Error:', error.message);
  } else {
      console.log('Signed in with Facebook:', data);
  }
};

export const getUser = async () => {
    // 🔹 Pehle session check karein
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  
    if (sessionError || !sessionData?.session) {
      console.error('Session not found:', sessionError?.message || 'No active session');
      return null;
    }
  
    // 🔹 Ab user fetch karein
    const { data, error } = await supabase.auth.getUser();
  
    if (error) {
      console.error('Error fetching user:', error.message);
      return null;
    }
    console.log("Data",data);
    
  
    return data.user;
  };