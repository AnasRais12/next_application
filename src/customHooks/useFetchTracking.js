import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
export const useFetchTracking = (ID) => {
    const [shipingAddressLoading, setShipingAddressLoading] = useState(false)
    const [trackingId, settrackingId] = useState([]); //

    useEffect(() => {
        console.log(ID,"milrahi hai ia ")
        if (!ID) return;
        const trackingList = async () => {
            try {
                setShipingAddressLoading(true)
                const { data, error } = await supabase
                    .from("order_tracking")
                    .select("*")
                    .eq("order_id", ID);
                if (error) {
                    console.error("Error fetching wishlist", error);
                } else {
                    if (data.length > 0) {
                        settrackingId(data)
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
        trackingList();
    }, [ID]);

    return { shipingAddressLoading,trackingId };

};