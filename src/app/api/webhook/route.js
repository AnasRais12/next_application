import Stripe from "stripe";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

const stripe = new Stripe("sk_test_51PbO7KDIVPFWPszsv2w8ELOstNQxHCAxistnKNGGqq5Kbd0tTgZRDhUD7B6dDYZK10ysgD76oW3X1X049KAPnDjT00ObGcQ5Xe", {
  apiVersion: "2024-06-20",
});

export const config = {
  api: {
    bodyParser: false, // ✅ Stripe ke raw request handle karne ke liye
  },
};

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  let event;

  try {
    const rawBody = await req.text() 
    event = stripe.webhooks.constructEvent(rawBody, sig, "whsec_H6IJW6nLXtYZOir8P00eHmFPShnpMc0P");
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;

    if (!orderId) {
        await logWebhookError("missing_order_id", "Order ID not found in session metadata");
        return NextResponse.json({ error: "Order ID not found" }, { status: 405 });
    }
    const {  error: updateError } = await supabase
        .from("orders")
        .update({ status: "Completed" })
        .eq("order_id", `#${orderId}`)
        .select(); // ✅ Order ID aur Status le raha hai
    console.log("Updated Order:", orderId);
    if(updateError){
    console.log("Updated Error:", orderId);
    }

    return NextResponse.json({ received: true,  });
}
}