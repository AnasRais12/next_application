import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
export const useFetchOrderlist = (userId) => {
    const [orderHistoryLoading, setOrderHistoryLoading] = useState(true); //
    const [orderHistoryDetail, setOrderHistoryDetail] = useState([]); //


    useEffect(() => {
        console.log()
        if (!userId) return;
        const Orderlist = async () => {
            setOrderHistoryLoading(true)
            try {
                const { data, error } = await supabase
                    .from("orders")
                    .select("*")
                    .eq("user_id", userId);
                if (error) {
                    console.error("Error fetching wishlist", error);
                } else {
                    setOrderHistoryDetail(data)
                    console.log("OrderHisotry", data);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            }
            finally{
                setOrderHistoryLoading(false)
            }
        };
        Orderlist();
    }, [userId]);
    return { orderHistoryLoading,orderHistoryDetail }; 
};