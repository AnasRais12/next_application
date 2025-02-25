import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCartlist } from "@/app/store/features/CartReducer/CartSlice";
import { supabase } from "@/lib/supabase";

export const useFetchCartlist = (userId) => {
    const dispatch = useDispatch();
    const [cartListLoading, setcartListLoading] = useState(false)
    useEffect(() => {
        if (!userId) return;
        const fetchWishlist = async () => {
            try {
                setcartListLoading(true)
                const { data, error } = await supabase
                    .from("cart")
                    .select("*")
                    .eq("user_id", userId);
                if (error) {
                    console.error("Error fetching wishlist", error);
                } else {
                    dispatch(setCartlist(data));
                    console.log("CArt data from backend:", data);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            }
            finally {
                setcartListLoading(false)
            }
        };
        fetchWishlist();
    }, [userId, dispatch]);
    return { cartListLoading };

};