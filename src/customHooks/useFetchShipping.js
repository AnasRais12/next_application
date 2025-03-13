import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
export const useFetchAddress = (userId) => {
    const [shipingAddressLoading, setShipingAddressLoading] = useState(false)
    useEffect(() => {
        if (!userId) return;
        const fetchWishlist = async () => {
            try {
                setShipingAddressLoading(true)
                const { data, error } = await supabase
                    .from("shiping_address")
                    .select("*")
                    .eq("addresses_id", userId);
                if (error) {
                    console.error("Error fetching wishlist", error);
                } else {
                    if (data.length > 0) {
                        console.log("CArt data from backend:", data);

                    }


                }
            } catch (err) {
                console.error("Fetch error:", err);
            }
            finally {
                setShipingAddressLoading(false)
            }
        };
        fetchWishlist();
    }, [userId]);

    return { shipingAddressLoading, };

};