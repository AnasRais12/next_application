'use client'
import { supabase } from "@/lib/supabase";
import { supabaseRole } from "@/lib/supabase";
import useSession from "@/utils/UserExist/GetSession";
import { useRouter } from "next/navigation";
import { GlobalDetails } from "@/context/globalprovider/globalProvider";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
const UserQuery = () => {
    const { setUser } = GlobalDetails()
    const session = useSession(); 
    const router = useRouter()
    const [userDetails, setuserDetails] = useState(null);

    // Fetching user details on session change
    useEffect(() => {
        const fetchUser = async () => {
            console.log('________________________________________-!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!>>>>>>>>>>>>>>>>>>')
            if (!session?.user?.email) return; // Agar email na ho toh return kar do
            const { data, error } = await supabase
                .from("addresses")
                .select("*")
                .eq("user_id", session?.user?.id)
                .maybeSingle(); // Ek hi row return karega

            if (error) {
                console.error("Error fetching user:", error);
                return;
            }


            setuserDetails(data);
        };

        fetchUser();
    }, [session]); // Jab session update ho, tab ye chalega

    // Function to update user details (e.g., name or password)
    const updateUserDetails = async (updatedFields) => {
        console.log('yahan takk ki agaya hu ')
        console.log('updatedFields',updatedFields)

        if (!session?.user?.id) return; // Check if user exists
        console.log('yahan takk ki agaya hu ')

        try {
            console.log('hello worldddddddd')
            // Step 1: Update the user in the database
            const { data, error } = await supabase
                .from("addresses")
                .update(updatedFields) // Pass the fields to update (name, phone_number, etc.)
                .eq("user_id", session?.user?.id).select(); // Match the user by their unique id

        console.log('neeche agaya hu  ',data)


            if (error) {
                console.error("Error updating user:", error.message);
                return;
            }

            // Step 2: If the update is successful, re-fetch the user data
            if (data) {
                setuserDetails(data[0]);
            } else {
                console.error("No user updated or user not found.");
            }
        } catch (error) {
            console.error("Error updating user details:", error);
        }
    };

    // function delete user //
    const deleteUser = async () => {
        console.log("sessionidssss", session?.user?.id)
        try {
            // Step 1: Always delete from Supabase Auth using session.user.id
            const { data: deleteData, error: authError } = await supabaseRole.auth.admin.deleteUser(session?.user?.id);

            if (authError) {
                console.warn("Error deleting user from Supabase Auth:", authError.message);
                return; // Stop if there was an issue deleting from Auth
            } else {
                console.log("User deleted from Supabase Auth successfully.");

                // Step 3: Clear cookies, local storage, and reset user state
                Cookies.remove('sb-access-token');
                Cookies.remove('sb-refresh-token');
                localStorage.removeItem('sb-user');
                setUser(null);

                // Step 4: Redirect the user after deletion
                router.push('/signup'); // Or '/login' depending on your flow
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const logoutUser = async () => {
        try {
            // Step 1: Sign out from Supabase Auth
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error("Error logging out:", error.message);
                return;
            }
            else {

                Cookies.remove('sb-access-token');
                Cookies.remove('sb-refresh-token');
                Cookies.remove('sb-user-role');

                localStorage.removeItem('sb-user');
                setuserDetails(null);
                setUser(null)
                router.push('/login')

            }
        }
        catch (error) {
            console.error(error)
        }
    }


    return { userDetails, updateUserDetails, deleteUser, logoutUser };
};

export default UserQuery;
