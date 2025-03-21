export const CreateStripeSession = async (cart, session, loadStripe, orderId) => {
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
                userEmail: session?.user?.email,
                orderId: orderId
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
                    status: "Pending",
                    address: userDetails?.address,
                    items: cart.map(item => ({
                        product_id: item.product_id,
                        product_name: item.product_name,
                        product_price: item.product_price,
                        quantity: item.quantity
                    }))
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
            const orderId = lastOrder?.order_id?.replace("#", "");
            const generatetrackingNumber = 'TRK-' + Math.random().toString(36).substring(2, 9).toUpperCase();
            if (orderId) {
                const { error: trackingError } = await supabase
                    .from("order_tracking")
                    .insert([
                        {
                            order_id: `#${orderId}`,
                            tracking_number: generatetrackingNumber,
                            latitude: userDetails?.lat,
                            longitude: userDetails?.long,
                            tracking_status: "Pending",
                            tracking_time: Math.floor(Math.random() * 20) + 1 // 1 se 20 tak ka random number
                        },
                    ], { returning: "representation" });

                if (trackingError) {
                    console.log("trackingError ERROR", trackingError?.message)
                }
                else {

                    await CreateStripeSession(cart, session, loadStripe, orderId);
                    Swal.fire({
                        icon: 'success',
                        title: 'Order Confirmed!',
                        text: `Your order has been confirmed successfully! Order ID: ${orderId}`
                    });
                    deleteAllCartItem(supabase, session, RemoveAllFromCart, dispatch)

                }
            }
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
                    status: "Pending",
                    address: userDetails?.address,
                    items: cart.map(item => ({
                        product_id: item.product_id,
                        product_name: item.product_name,
                        product_price: item.product_price,
                        quantity: item.quantity
                    }))
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
            const orderId = lastOrder?.order_id?.replace("#", "");
            const generatetrackingNumber = 'TRK-' + Math.random().toString(36).substring(2, 9).toUpperCase();
            if (orderId) {
                const { error: trackingError } = await supabase
                    .from("order_tracking")
                    .insert([
                        {
                            order_id: `#${orderId}`,
                            tracking_number: generatetrackingNumber,
                            latitude: userDetails?.lat,
                            longitude: userDetails?.long,
                            tracking_status: "Pending",
                            tracking_time: Math.floor(Math.random() * 20) + 1 // 1 se 20 tak ka random number
                        },
                    ], { returning: "representation" });

                if (trackingError) {
                    console.log("trackingError ERROR", trackingError?.message)
                }
                else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Order Confirmed!',
                        text: `Your order has been confirmed successfully! Order ID: ${orderId}`
                    });
                    deleteAllCartItem(supabase, session, RemoveAllFromCart, dispatch)

                    router.push(`/confirm/${orderId}`);
                }
            }
        }






    } catch (error) {
        console.log(error);
    } finally {
        setdeliveryLoading(false);
    }
};



// Checking Payment SUCESSFULLY?? //


// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export default async function handler(req, res) {
//     const sig = req.headers['stripe-signature'];

//     let event;

//     try {
//         event = stripe.webhooks.constructEvent(
//             req.body,
//             sig,
//             process.env.STRIPE_WEBHOOK_SECRET // Webhook Secret Key
//         );
//     } catch (err) {
//         console.error("Webhook Error:", err);
//         return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     if (event.type === 'checkout.session.completed') {
//         const session = event.data.object;

//         // ✅ Order ko stripe session se dhoondh ke update karna
//         const { data, error } = await supabase
//             .from("orders")
//             .update({ status: "Completed" }) // ✅ Status update
//             .eq("user_email", session.customer_details.email); // ✅ User ki email match karo

//         if (error) {
//             console.error("Error updating order:", error);
//             return res.status(500).json({ error: "Order update failed!" });
//         }

//         console.log("Order status updated successfully!");
//     }

//     res.json({ received: true });
// }



