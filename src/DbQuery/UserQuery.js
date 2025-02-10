'use client'
import { supabase } from "@/lib/supabase";
import useSession from "@/utils/UserExist/GetSession";
import { useEffect, useState } from "react";

const UserQuery = () => {
    const session = useSession(); // Session fetch karega
    const [speicifcUser, setspeicifcUser] = useState(null)
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

    return { speicifcUser }

};

export default UserQuery;