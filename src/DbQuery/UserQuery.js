'use client'
import { supabase } from "@/lib/supabase";
import useSession from "@/utils/UserExist/GetSession";
import { useEffect, useState } from "react";
const UserQuery = () => {
    const session = useSession(); // Session fetch karega
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
                console.log("User updated successfully:", data);
                // Step 3: Update the local state with the updated data
                setspeicifcUser(data[0]); // Update state to trigger re-render
            } else {
                console.error("No user updated or user not found.");
            }
        } catch (error) {
            console.error("Error updating user details:", error);
        }
    };

    return { speicifcUser, updateUserDetails };
};

export default UserQuery;
