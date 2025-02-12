'use client'
import { supabase } from "@/lib/supabase";
import useSession from "@/utils/UserExist/GetSession";
import { useRouter } from "next/navigation";
import { GlobalDetails } from "@/context/globalprovider/globalProvider";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { NineKOutlined } from "@mui/icons-material";
const UserQuery = () => {
    const { setUser} = GlobalDetails()
    const session = useSession(); // Session fetch karega
    console.log("----------------> Sesssion", session)
    const router = useRouter()
    const [speicifcUser, setspeicifcUser] = useState(null);


    // Fetching user details on session change
    useEffect(() => {
        const fetchUser = async () => {
            if (!session?.user?.email) return; // Agar email na ho toh return kar do
            const { data, error } = await supabase
                .from("users")
                .select("*")
                .eq("email", session.user.email)
                .maybeSingle(); // Ek hi row return karega

            if (error) {
                console.error("Error fetching user:", error);
                return;
            }


            setspeicifcUser(data);
        };

        fetchUser();
    }, [session]); // Jab session update ho, tab ye chalega

    // Function to update user details (e.g., name or password)
    const updateUserDetails = async (updatedFields) => {
        if (!speicifcUser?.id) return; // Check if user exists

        try {
            // Step 1: Update the user in the database
            const { data, error } = await supabase
                .from("users")
                .update(updatedFields) // Pass the fields to update (name, phone_number, etc.)
                .eq("id", speicifcUser.id).select(); // Match the user by their unique id

            if (error) {
                console.error("Error updating user:", error.message);
                return;
            }

            // Step 2: If the update is successful, re-fetch the user data
            if (data && data.length > 0) {
                setspeicifcUser(data[0]);
            } else {
                console.error("No user updated or user not found.");
            }
        } catch (error) {
            console.error("Error updating user details:", error);
        }
    };

    // function delete user //
    const deleteUser = async () => {
        console.warn("anasasasasasasasasasasasasas")
        try {
            // Step 1: Delete the user from the database
            // const { data, error } = await supabase
            //     .from("users")
            //     .delete() // Delete the user
            //     .eq("id", speicifcUser.id)

            // if (error) {
            //     console.error("Error deleting user:", error.message);
            //     return;
            // }

            // Auth Delete 
            const { data, error: authError } = await supabase.auth.admin.deleteUser(session?.user?.id); // Delete from Auth
            if (authError) {
                console.warn("Error deleting user from Auth:", authError.message);
                return console.warn("ANASASASASASASAS")


            }
            else {
                console.warn(data, "_________________")
                console.log("User deleted successfully:");
                Cookies.remove('sb-access-token');
                Cookies.remove('sb-refresh-token');
                localStorage.removeItem('sb-user');
                setspeicifcUser(null);
                router.push('/register')
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
                localStorage.removeItem('sb-user');
                setspeicifcUser(null);
                setUser(null)
                router.push('/login')

            }
        }
        catch(error){
            console.error(error)
        }
    }


    return { speicifcUser, updateUserDetails, deleteUser,logoutUser };
    };

    export default UserQuery;
