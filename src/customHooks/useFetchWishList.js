import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setWishlist } from "@/app/store/features/wishList/WishList";
import { supabase } from "@/lib/supabase";

export const useFetchWishlist = (userId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userId) return;
        const fetchWishlist = async () => {
            try {
                const { data, error } = await supabase
                    .from("wishlist")
                    .select("*")
                    .eq("user_id", userId);
                if (error) {
                    console.error("Error fetching wishlist", error);
                } else {
                    dispatch(setWishlist(data));
                    console.log("Wishlist data from backend:", data);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };
        fetchWishlist();
    }, [userId, dispatch]);
};