import { supabase } from "./supabase";
export const signInWithGoogle = async (role) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
    });

    if (error) {
        console.error('Google Sign-In Error:', error.message);
        return;
    }

    console.warn("Google Sign-In Response:", data); // Debugging ke liye

    // ❌ Google.user.id direct nahi milega, isliye getUser() ka use karein
    setTimeout(async () => {
        const { data: userData, error: userError } = await supabase.auth.getUser();

        if (userError) {
            console.error('Error fetching user data:', userError.message);
            return;
        }

        console.log("User Fetched:", userData); // Debugging

        // User ID and name
        const userId = userData?.user?.id;
        const userName = userData?.user?.user_metadata?.full_name;

        if (!userId) {
            console.error('User ID not found!');
            return;
        }

        // Supabase profiles table me role insert/update karein
        const { error: insertError } = await supabase
            .from('profiles')
            .upsert([
                {
                    id: userId,
                    role,
                    name: userName || "Unknown",
                }
            ], { onConflict: ['id'] });

        if (insertError) {
            console.error("Insert Error!", insertError);
        } else {
            console.log('Role successfully added for:', userId);
        }
    }, 3000); // 3s delay taki auth data aa jaye
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
    console.log("Data", data);


    return data.user;
};