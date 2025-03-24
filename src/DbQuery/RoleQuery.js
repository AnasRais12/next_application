'use client';
import { supabase } from '@/lib/supabase';
import { supabaseRole } from '@/lib/supabase';
import useSession from '@/utils/UserExist/GetSession';
import { useEffect, useState } from 'react';
const UserRoleQuery = () => {
  const session = useSession();
  const [profileData, setprofileData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.user?.email) return; // Agar email na ho toh return kar do
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle(); // Ek hi row return karega

      if (error) {
        console.error('Error fetching user:', error);
        return;
      }

      setprofileData(data);
    };

    fetchUser();
  }, [session]); // Jab session update ho, tab ye chalega

  // Function to update user details (e.g., name or password)
  // const updateUserDetails = async (updatedFields) => {
  //     if (!speicifcUser?.id) return; // Check if user exists

  //     try {
  //         // Step 1: Update the user in the database
  //         const { data, error } = await supabase
  //             .from("profiles")
  //             .update(updatedFields) // Pass the fields to update (name, phone_number, etc.)
  //             .eq("id", speicifcUser.id).select(); // Match the user by their unique id

  //         if (error) {
  //             console.error("Error updating user:", error.message);
  //             return;
  //         }

  //         // Step 2: If the update is successful, re-fetch the user data
  //         if (data && data.length > 0) {
  //             setspeicifcUser(data[0]);
  //         } else {
  //             console.error("No user updated or user not found.");
  //         }
  //     } catch (error) {
  //         console.error("Error updating user details:", error);
  //     }
  // };

  return { profileData };
};

export default UserRoleQuery;
