import { supabase } from './supabase';

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
export const signInWithGoogle = async (setgoogleLoading) => {
  try {
    setgoogleLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://next-application-pi.vercel.app/home',
      },
    });

    if (error) {
      console.error('Google Sign-In Error:', error.message);
    } else {
      console.log('Signed in with Google:', data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setgoogleLoading(false);
  }
};
