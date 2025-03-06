export const CreateStripeSession = async (cart, session, loadStripe) => {
    try {

        const res = await fetch("/api/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                products: cart.map(item => ({
                    product_name: item.product_name,
                    amount: item.product_price,  // Price in cents
                    quantity: item.quantity || 1,
                })),
                currency: "usd",
                userEmail: session?.user?.email
            }),
        });
        const data = await res.json();
        // Load Stripe using public key from .env.local
        const stripe = await loadStripe("pk_test_51PbO7KDIVPFWPszsl0WywZz2UUN8bZAQnj4JxkUSJ8uaE0dNAZg8FZlc8OW12qE9yt1BbkMw4rmDoNJieZrkDI7c00uhBpEefc");
        stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
        console.log(error)
    }

};

export const handleCardPayment = async (supabase, session, cart, paymentMethod, userDetails, deleteAllCartItem, RemoveAllFromCart, dispatch, setcardLoading, Swal, loadStripe) => {
    try {
        setcardLoading(true)
        const { data: order, error } = await supabase
            .from("orders")
            .insert([
                {
                    user_id: session?.user?.id,
                    user_email: session?.user?.email,
                    total_amount: cart.reduce((sum, item) => sum + item.product_price * item.quantity, 0),
                    payment_method: paymentMethod,
                    status: "pending",
                    address: userDetails?.address
                },
            ], { returning: "representation" }); // 🔥 Yahan return value le rahe hain

        if (error) {
            console.error("Order Insert Error:", error);
            return;
        }
        else {
            await CreateStripeSession(cart, session, loadStripe);
            deleteAllCartItem(supabase, session, RemoveAllFromCart, dispatch)
            Swal.fire({
                icon: 'success',
                title: 'Order Confirmed!',
                text: 'Your order has been confirmed successfully!'
            });
        }


    } catch (error) {
        console.log(error, "::::::::::::::::::::::::::::")
    }
    finally {
        setcardLoading(false)

    }

}


export const handleDelievery = async (supabase, session, cart, paymentMethod, userDetails, deleteAllCartItem, RemoveAllFromCart, dispatch, setdeliveryLoading, router, Swal) => {
    try {
        setdeliveryLoading(true);

        const { data: order, error } = await supabase
            .from("orders")
            .insert([
                {
                    user_id: session?.user?.id,
                    user_email: session?.user?.email,
                    total_amount: cart.reduce((sum, item) => sum + item.product_price * item.quantity, 0),
                    payment_method: paymentMethod,
                    status: "pending",
                    address: userDetails?.address
                },
            ], { returning: "representation" }); // 🔥 Yahan return value le rahe hain

        if (error) {
            console.error("Order Insert Error:", error);
            return;
        }
        const { data: lastOrder, error: fetchError } = await supabase
            .from("orders")
            .select("order_id")
            .eq("user_id", session?.user?.id)
            .order("created_at", { ascending: false }) // ✅ Last order
            .limit(1)
            .single();

        if (fetchError) {
            console.log("Fetch ERROR", fetchError?.message)
        }
        else {
            const orderId = lastOrder?.order_id?.replace("#", ""); // 🔥 "#" hata diya

            Swal.fire({
                icon: 'success',
                title: 'Order Confirmed!',
                text: `Your order has been confirmed successfully! Order ID: ${orderId}`
            });
            deleteAllCartItem(supabase, session, RemoveAllFromCart, dispatch)

            router.push(`/confirm/${orderId}`);
        }


    } catch (error) {
        console.log(error);
    } finally {
        setdeliveryLoading(false);
    }
};


